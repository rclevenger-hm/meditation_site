import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routines = ["bodyScan", "light", "lovingKindness", "mantra", "mindfulness", "zenCounting"];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assertFile(relativePath) {
  const path = join(root, relativePath);
  assert(existsSync(path), `Missing required file: ${relativePath}`);
  assert(statSync(path).size > 0, `Required file is empty: ${relativePath}`);
}

function assertMp3(relativePath) {
  assertFile(relativePath);
  const bytes = readFileSync(join(root, relativePath));
  const hasId3 = bytes.length >= 3 && bytes.subarray(0, 3).toString("ascii") === "ID3";
  let hasFrameSync = false;
  for (let index = 0; index < Math.min(bytes.length - 1, 4096); index += 1) {
    if (bytes[index] === 0xff && (bytes[index + 1] & 0xe0) === 0xe0) {
      hasFrameSync = true;
      break;
    }
  }
  assert(hasId3 || hasFrameSync, `Expected MP3 header/frame sync in ${relativePath}`);
}

function assertPng(relativePath) {
  assertFile(relativePath);
  const bytes = readFileSync(join(root, relativePath));
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  assert(signature.every((byte, index) => bytes[index] === byte), `Expected PNG signature in ${relativePath}`);
}

const html = read("index.html");
const css = read("styles.css");
const accessibility = read("accessibility.css");
const js = read("script.js");
const workflow = read(".github/workflows/pages.yml");

try {
  new Function(js);
} catch (error) {
  throw new Error(`script.js failed syntax validation: ${error.message}`);
}

assert(html.includes("<title>Guided Meditation Library</title>"), "Document title should match the app name");
assert(html.includes('href="styles.css?v=11"'), "HTML should load the cache-busted stylesheet");
assert(html.includes('href="accessibility.css?v=1"'), "HTML should load accessibility overrides");
assert(html.includes('src="script.js?v=13"'), "HTML should load the cache-busted script");
assert(html.includes('class="skip-link"'), "Page should expose keyboard skip navigation");
assert(html.includes('id="meditation-practice"'), "Skip navigation target is missing");
assert(css.includes('url("assets/timer-ocean-clean.png")'), "Timer should use the cleaned ocean artwork");
assert(!css.includes('url("assets/timer-ocean.png")'), "Timer should not use the artwork with baked-in numbers");
assert(accessibility.includes("prefers-reduced-motion: reduce"), "Reduced-motion preference must be honored");
assert(accessibility.includes("forced-colors: active"), "Forced-colors mode should retain control boundaries");
assert(accessibility.includes("animation-duration: 0.001ms"), "Reduced-motion rules must suppress looping animation");
assert(js.includes("const durationOptions = [60, 300, 600, 1200, 3600];"), "Expected meditation durations are missing");
assert(js.includes('audio.background.src = "assets/music/breath-tide.mp3";'), "Background music source is not configured");
assert(js.includes("assets/audio/${state.routineKey}/stage-${stageIndex + 1}.mp3"), "Narration clip path is not configured");

assertFile("accessibility.css");
assertPng("assets/timer-ocean-clean.png");
assertMp3("assets/music/breath-tide.mp3");

for (const routine of routines) {
  const files = readdirSync(join(root, "assets", "audio", routine)).filter((file) => /^stage-[1-5]\.mp3$/.test(file));
  assert(files.length === 5, `Expected 5 stage clips for ${routine}, found ${files.length}`);
  for (let index = 1; index <= 5; index += 1) assertMp3(`assets/audio/${routine}/stage-${index}.mp3`);
}

assert(workflow.includes("actions/configure-pages@v5"), "Pages workflow should configure GitHub Pages");
assert(workflow.includes("actions/upload-pages-artifact@v3"), "Pages workflow should upload the static site");
assert(workflow.includes("actions/deploy-pages@v4"), "Pages workflow should deploy to GitHub Pages");

console.log("Static site checks passed.");
