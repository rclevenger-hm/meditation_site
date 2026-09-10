import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const script = readFileSync("selection-accessibility.js", "utf8");

assert.match(html, /selection-accessibility\.js\?v=1/, "selected-state accessibility script must be loaded");
assert.match(script, /setAttribute\("aria-pressed"/, "selected controls must expose aria-pressed");
assert.match(script, /\.mode-button, \.duration-button/, "routine and duration controls must both stay synchronized");

new Function(script);
console.log("Selection accessibility contract passed.");
