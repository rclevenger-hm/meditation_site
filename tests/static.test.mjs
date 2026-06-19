import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routines = ["bodyScan", "light", "lovingKindness", "mantra", "mindfulness", "zenCounting"];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assertFile(relativePath) {
  const path = join(root, relativePath);
  assert(existsSync(path), `Missing required file: ${relativePath}`);
  assert(statSync(path).size > 0, `Required file is empty: ${relativePath}`);
}

const html = read("index.html");
const css = read("styles.css");
const js = read("script.js");
const workflow = read(".github/workflows/pages.yml");

try {
  new Function(js);
} catch (error) {
  throw new Error(`script.js failed syntax validation: ${error.message}`);
}

assert(html.includes("<title>Guided Meditation Library</title>"), "Document title should match the app name");
assert(html.includes('href="styles.css?v=11"'), "HTML should load the cache-busted stylesheet");
assert(html.includes('src="script.js?v=13"'), "HTML should load the cache-busted script");
assert(css.includes('url("assets/timer-ocean-clean.png")'), "Timer should use the cleaned ocean artwork");
assert(!css.includes('url("assets/timer-ocean.png")'), "Timer should not use the artwork with baked-in numbers");
assert(js.includes("const durationOptions = [60, 300, 600, 1200, 3600];"), "Expected meditation durations are missing");
assert(js.includes('audio.background.src = "assets/music/breath-tide.mp3";'), "Background music source is not configured");
assert(js.includes("assets/audio/${state.routineKey}/stage-${stageIndex + 1}.mp3"), "Narration clip path is not configured");

assertFile("assets/timer-ocean-clean.png");
assertFile("assets/music/breath-tide.mp3");

for (const routine of routines) {
  const files = readdirSync(join(root, "assets", "audio", routine)).filter((file) => /^stage-[1-5]\.mp3$/.test(file));
  assert(files.length === 5, `Expected 5 stage clips for ${routine}, found ${files.length}`);
  for (let index = 1; index <= 5; index += 1) {
    assertFile(`assets/audio/${routine}/stage-${index}.mp3`);
  }
}

assert(workflow.includes("actions/configure-pages@v5"), "Pages workflow should configure GitHub Pages");
assert(workflow.includes("actions/upload-pages-artifact@v3"), "Pages workflow should upload the static site");
assert(workflow.includes("actions/deploy-pages@v4"), "Pages workflow should deploy to GitHub Pages");

console.log("Static site checks passed.");
