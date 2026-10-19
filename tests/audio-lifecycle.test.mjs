import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../script.js", import.meta.url), "utf8");
function app({ webAudio = false } = {}) {
  const nodes = new Map();
  function node() {
    const children = new Map();
    return {
      style: {}, dataset: {}, classList: { toggle() {} }, value: "", innerHTML: "",
      setAttribute() {}, addEventListener() {}, append() {},
      querySelector(selector) {
        if (!children.has(selector)) children.set(selector, node());
        return children.get(selector);
      },
    };
  }
  const tracks = [], pending = [], spoken = [], oscillators = [];
  const timeouts = new Map(), frames = new Map();
  let nextId = 1, cancels = 0;
  const context = vm.createContext({
    console, btoa: input => Buffer.from(input, "binary").toString("base64"),
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    document: {
      querySelector(selector) { if (!nodes.has(selector)) nodes.set(selector, node()); return nodes.get(selector); },
      querySelectorAll: selector => selector === ".step" ? Array.from({ length: 5 }, node) : [],
      createElement(tag) {
        if (tag !== "audio") return node();
        const track = { src: "", currentTime: 0, pauseCount: 0, playCount: 0, addEventListener() {},
          pause() { this.pauseCount += 1; },
          play() {
            this.playCount += 1;
            return this.src.includes("assets/audio/")
              ? new Promise((resolve, reject) => pending.push({ track: this, resolve, reject }))
              : Promise.resolve();
          },
        };
        tracks.push(track);
        return track;
      },
    },
    requestAnimationFrame(callback) { const id = nextId++; frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  const gain = () => ({ connect() {}, gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} } });
  context.window = {
    speechSynthesis: { getVoices: () => [], addEventListener() {}, cancel() { cancels += 1; }, speak(utterance) { spoken.push(utterance.text); } },
    setTimeout(callback) { const id = nextId++; timeouts.set(id, callback); return id; },
    clearTimeout(id) { timeouts.delete(id); },
    setInterval: () => nextId++, clearInterval() {},
    ...(webAudio ? { AudioContext: class {
      state = "running"; currentTime = 0; resumes = 0; suspends = 0;
      resume() { this.resumes += 1; this.state = "running"; return Promise.resolve(); }
      suspend() { this.suspends += 1; this.state = "suspended"; return Promise.resolve(); }
      createGain = gain;
      createOscillator() {
        const oscillator = { stops: [], frequency: { setValueAtTime() {} }, connect() {}, start() {}, addEventListener() {},
          stop(time) { this.stops.push(time); },
        };
        oscillators.push(oscillator);
        return oscillator;
      }
    } } : {}),
  };
  vm.runInContext(source, context);
  return { context, tracks, pending, spoken, oscillators, timeouts, frames,
    read: expression => vm.runInContext(expression, context),
    get cancels() { return cancels; },
    async fail(index) { pending[index].reject(new Error("Unsupported audio")); await Promise.resolve(); },
    flushTimeouts() { for (const [id, callback] of [...timeouts]) { timeouts.delete(id); callback(); } },
  };
}

for (const [name, interrupt] of [
  ["pause", app => app.context.pause()],
  ["routine change", app => app.context.selectRoutine("mindfulness")],
  ["duration change", app => app.context.selectDuration(300)],
  ["restart", app => app.context.restart()],
]) {
  test(`stale play rejection cannot speak after ${name}`, async () => {
    const a = app(); a.context.start(); interrupt(a); await a.fail(0);
    assert.deepEqual(a.spoken, []);
    assert.ok(a.pending[0].track.pauseCount > 0);
  });
}

test("current failed narration uses the speech fallback", async () => {
  const a = app(); a.context.start(); await a.fail(0);
  assert.equal(a.spoken.length, 1);
});

test("a newer stage cancels speech and ignores stale playback rejections", async () => {
  const a = app(); a.context.start(); await a.fail(0);
  const cancels = a.cancels;
  a.context.speakStage(1);
  assert.ok(a.cancels > cancels);
  a.context.speakStage(2);
  await a.fail(1);
  assert.equal(a.spoken.length, 1);
  await a.fail(2);
  assert.equal(a.spoken.length, 2);
});

test("pause cancels delayed tone starts and current fallback cues", () => {
  const a = app(); a.context.start();
  assert.ok(a.timeouts.size > 0);
  a.context.pause(); a.flushTimeouts();
  assert.equal(a.tracks.filter(track => track.src.startsWith("data:")).length, 0);
  a.context.start(); a.flushTimeouts();
  const cues = a.tracks.filter(track => track.src.startsWith("data:"));
  assert.ok(cues.length > 0);
  a.context.pause();
  assert.ok(cues.every(cue => cue.pauseCount === 1));
});

test("restart while paused stays silent and idle", () => {
  const a = app(); a.context.start(); a.context.pause();
  const count = a.tracks.length;
  a.context.restart(); a.flushTimeouts();
  assert.equal(a.tracks.length, count);
  assert.equal(a.read("state.isRunning"), false);
  assert.equal(a.read("state.elapsed"), 0);
});

test("Web Audio restart resumes context and cancels queued oscillators", () => {
  const a = app({ webAudio: true }); a.context.start();
  const original = [...a.oscillators];
  a.context.restart();
  assert.ok(original.every(oscillator => oscillator.stops.includes(undefined)), "cancel old scheduled tones");
  assert.equal(a.read("audio.context.state"), "running");
  assert.equal(a.read("audio.context.resumes"), 1);
});

test("completion stops narration, becomes idle, and restarts exactly once", async () => {
  const a = app({ webAudio: true }); a.context.start();
  a.context.tick(1000); a.context.tick(62000);
  assert.equal(a.read("state.isRunning"), false);
  assert.equal(a.read("state.frameId"), null);
  assert.equal(a.read("audio.context.state"), "running", "completion cue needs an active context");
  await a.fail(0);
  assert.deepEqual(a.spoken, []);
  assert.ok(a.pending[0].track.pauseCount > 0);
  const count = a.pending.length;
  a.context.start();
  assert.equal(a.read("state.isRunning"), true);
  assert.equal(a.read("state.elapsed"), 0);
  assert.equal(a.pending.length, count + 1, "render must not start duplicate first-stage narration");
  a.context.tick(63000); a.context.tick(64000);
  assert.equal(a.read("state.elapsed"), 1);
});

for (const webAudio of [false, true]) {
  test(`immediate new session cancels completion cues (${webAudio ? "Web Audio" : "fallback"})`, () => {
    const a = app({ webAudio }); a.context.start();
    a.context.tick(1000); a.context.tick(62000);
    const completionOscillators = a.oscillators.slice(-3);
    const completionTimers = [...a.timeouts.keys()];
    a.context.start();
    if (webAudio) {
      assert.ok(completionOscillators.every(oscillator => oscillator.stops.includes(undefined)));
    } else {
      assert.ok(completionTimers.every(id => !a.timeouts.has(id)));
      assert.equal(a.timeouts.size, 2, "only the new session's start tones should remain");
    }
  });
}
