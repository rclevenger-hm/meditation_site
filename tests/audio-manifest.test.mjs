import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routines = ["bodyScan", "light", "lovingKindness", "mantra", "mindfulness", "zenCounting"];
const expectedStages = Array.from({ length: 5 }, (_, index) => `stage-${index + 1}.mp3`);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const routine of routines) {
  const directory = join(root, "assets", "audio", routine);
  const files = readdirSync(directory)
    .filter((name) => !name.startsWith("."))
    .sort();

  assert(
    JSON.stringify(files) === JSON.stringify(expectedStages),
    `${routine} release media must contain exactly ${expectedStages.join(", ")}; found ${files.join(", ")}`,
  );

  for (const file of files) {
    assert(statSync(join(directory, file)).size > 0, `${routine}/${file} must not be empty`);
  }
}

console.log("Audio release manifest checks passed.");
