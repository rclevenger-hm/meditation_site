import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { chromium } from "playwright";

const root = new URL("../", import.meta.url);
const types = { html: "text/html", js: "text/javascript", css: "text/css", mp3: "audio/mpeg", png: "image/png" };
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const name = pathname === "/" ? "index.html" : pathname.slice(1);
  if (!/^(?:index\.html|script\.js|selection-accessibility\.js|styles\.css|accessibility\.css|assets\/[\w/.-]+)$/.test(name)
      || name.split("/").includes("..")) {
    response.writeHead(404).end();
    return;
  }
  try {
    const body = await readFile(new URL(name, root));
    response.writeHead(200, { "Content-Type": types[name.split(".").at(-1)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end();
  }
});
let browser;
let origin;
before(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
});
after(async () => {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
});

async function openApp(t, { mockMedia = true } = {}) {
  const page = await browser.newPage();
  t.after(() => page.close());
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  t.after(() => assert.deepEqual(errors, [], "the session should not raise uncaught browser errors"));
  await page.route("https://**/*", route => route.fulfill({ status: 204 }));
  await page.clock.install();
  if (mockMedia) {
    await page.addInitScript(() => {
      const media = window.testMedia = { plays: [], pauses: [], spoken: [], pending: [], cancels: 0 };
      Object.defineProperty(window, "AudioContext", { value: undefined, configurable: true });
      Object.defineProperty(window, "webkitAudioContext", { value: undefined, configurable: true });
      Object.defineProperty(window, "speechSynthesis", { value: {
        getVoices: () => [], addEventListener() {},
        cancel() { media.cancels += 1; },
        speak(utterance) { media.spoken.push(utterance.text); },
      }, configurable: true });
      HTMLMediaElement.prototype.play = function () {
        media.plays.push(this.src);
        if (this.src.includes("/assets/audio/")) {
          return new Promise((resolve, reject) => media.pending.push({ element: this, resolve, reject }));
        }
        return Promise.resolve();
      };
      HTMLMediaElement.prototype.pause = function () { media.pauses.push(this.src); };
      media.fail = index => media.pending[index].reject(new DOMException("Playback failed", "NotSupportedError"));
    });
  }
  await page.goto(origin);
  return page;
}
const start = page => page.getByRole("button", { name: "Start routine", exact: true }).click();
const pause = page => page.getByRole("button", { name: "Pause routine", exact: true }).click();
const spoken = page => page.evaluate(() => window.testMedia.spoken);

for (const [name, interrupt] of [
  ["pause", page => pause(page)],
  ["routine change", page => page.locator('[data-routine="mindfulness"]').click()],
  ["duration change", page => page.locator('[data-duration="300"]').click()],
]) {
  test(`late narration failure stays silent after ${name}`, async t => {
    const page = await openApp(t);
    await start(page);
    await interrupt(page);
    await page.evaluate(() => window.testMedia.fail(0));
    assert.deepEqual(await spoken(page), []);
    assert.equal(await page.locator("#start-pause").getAttribute("aria-label"), "Start routine");
  });
}

test("older narration cannot interrupt a restarted session", async t => {
  const page = await openApp(t);
  await start(page);
  await page.locator("#restart").click();
  await page.evaluate(() => window.testMedia.fail(0));
  assert.deepEqual(await spoken(page), []);
  await page.evaluate(() => window.testMedia.fail(1));
  assert.equal((await spoken(page)).length, 1, "current failed clip should still fall back to speech");
});

test("current narration failure falls back once and the next stage cancels old speech", async t => {
  const page = await openApp(t);
  await start(page);
  await page.evaluate(() => window.testMedia.fail(0));
  assert.equal((await spoken(page)).length, 1);
  const cancels = await page.evaluate(() => window.testMedia.cancels);
  await page.clock.runFor(16000);
  assert.ok(await page.evaluate(() => window.testMedia.pending.length) > 1, "timer must advance to another narration clip");
  assert.ok(await page.evaluate(() => window.testMedia.cancels) > cancels, "a new clip must cancel the previous speech fallback");
});

test("paused sessions cancel delayed fallback tones", async t => {
  const page = await openApp(t);
  await start(page);
  await pause(page);
  const count = await page.evaluate(() => window.testMedia.plays.length);
  await page.clock.runFor(1000);
  assert.equal(await page.evaluate(() => window.testMedia.plays.length), count);
});

test("completion becomes idle, stops stale narration, and restarts with one click", async t => {
  const page = await openApp(t);
  await start(page);
  await page.clock.runFor(61000);
  assert.equal(await page.locator("#remaining").textContent(), "00:00");
  assert.equal(await page.locator("#start-pause").getAttribute("aria-label"), "Start routine");
  assert.equal(await page.locator("#start-pause").evaluate(button => button.classList.contains("is-running")), false);
  await page.evaluate(() => window.testMedia.fail(window.testMedia.pending.length - 1));
  assert.deepEqual(await spoken(page), []);
  await start(page);
  assert.equal(await page.locator("#start-pause").getAttribute("aria-label"), "Pause routine");
  await page.clock.runFor(2000);
  assert.notEqual(await page.locator("#remaining").textContent(), "01:00");
});

test("stage changes ignore rejected narration from the previous stage", async t => {
  const page = await openApp(t);
  await start(page);
  await page.clock.runFor(16000);
  await page.evaluate(() => window.testMedia.fail(0));
  assert.deepEqual(await spoken(page), []);
  await page.evaluate(() => window.testMedia.fail(1));
  assert.equal((await spoken(page)).length, 1);
});

test("background playback failure leaves the timer and controls usable", async t => {
  const page = await openApp(t);
  await page.evaluate(() => {
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      return this.src.includes("/assets/music/") ? Promise.reject(new DOMException("Blocked", "NotAllowedError")) : play.call(this);
    };
  });
  await start(page);
  await page.clock.runFor(2000);
  assert.notEqual(await page.locator("#remaining").textContent(), "01:00");
  await pause(page);
  await start(page);
  assert.equal(await page.locator("#start-pause").getAttribute("aria-label"), "Pause routine");
});

test("packaged narration and background music load and play in Chromium", async t => {
  const page = await openApp(t, { mockMedia: false });
  await start(page);
  await page.waitForFunction(() => audio.narration?.readyState >= 2 && audio.background?.readyState >= 2);
  assert.deepEqual(await page.evaluate(() => ({
    narrationPaused: audio.narration.paused, musicPaused: audio.background.paused,
  })), { narrationPaused: false, musicPaused: false });
  await pause(page);
  assert.equal(await page.evaluate(() => audio.background.paused), true);
});
