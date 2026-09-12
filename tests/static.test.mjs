import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

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

function localReference(value) {
  const reference = value.trim();
  if (!reference || reference.startsWith("#") || /^(?:https?:|mailto:|tel:|data:|javascript:|blob:)/i.test(reference)) return null;
  const withoutQuery = reference.split(/[?#]/, 1)[0];
  return withoutQuery ? decodeURIComponent(withoutQuery) : null;
}

function assertLocalReferences(sourcePath, source, pattern) {
  const sourceDirectory = dirname(sourcePath);
  for (const match of source.matchAll(pattern)) {
    const reference = localReference(match[1]);
    if (!reference) continue;
    assert(!reference.startsWith("/"), `${sourcePath} should use repository-relative asset paths: ${reference}`);
    const resolved = normalize(join(sourceDirectory, reference));
    assert(!resolved.startsWith(".."), `${sourcePath} reference escapes the published site: ${reference}`);
    assertFile(resolved);
  }
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

assertLocalReferences("index.html", html, /(?:href|src)=["']([^"']+)["']/g);
assertLocalReferences("styles.css", css, /url\(["']?([^"')]+)["']?\)/g);
assertLocalReferences("accessibility.css", accessibility, /url\(["']?([^"')]+)["']?\)/g);

assertFile("accessibility.css");
assertPng("assets/timer-ocean-clean.png");
assertMp3("assets/music/breath-tide.mp3");

const audioRoot = join(root, "assets", "audio");
const audioRoutineDirectories = readdirSync(audioRoot)
  .filter((name) => statSync(join(audioRoot, name)).isDirectory())
  .sort();
assert(
  JSON.stringify(audioRoutineDirectories) === JSON.stringify([...routines].sort()),
  `Routine/audio catalog drift detected: expected ${routines.join(", ")}; found ${audioRoutineDirectories.join(", ")}`,
);

for (const routine of routines) {
  assert(js.includes(`  ${routine}: {`), `script.js is missing routine configuration for ${routine}`);
  const files = readdirSync(join(root, "assets", "audio", routine)).filter((file) => /^stage-[1-5]\.mp3$/.test(file));
  assert(files.length === 5, `Expected 5 stage clips for ${routine}, found ${files.length}`);
  for (let index = 1; index <= 5; index += 1) assertMp3(`assets/audio/${routine}/stage-${index}.mp3`);
}

assert(workflow.includes("actions/configure-pages@v5"), "Pages workflow should configure GitHub Pages");
assert(workflow.includes("actions/upload-pages-artifact@v3"), "Pages workflow should upload the static site");
assert(workflow.includes("actions/deploy-pages@v4"), "Pages workflow should deploy to GitHub Pages");

console.log("Static site checks passed.");
