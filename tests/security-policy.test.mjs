import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

const policyMatch = html.match(
  /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"\s*>/i,
);
assert.ok(policyMatch, "index.html must define a Content-Security-Policy meta tag");

const policy = policyMatch[1];
for (const directive of [
  "default-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "style-src 'self'",
  "script-src 'self' https://static.cloudflareinsights.com",
  "connect-src https://cloudflareinsights.com",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
]) {
  assert.ok(policy.includes(directive), `missing CSP directive: ${directive}`);
}

const referrerMatch = html.match(/<meta\s+name="referrer"\s+content="([^"]+)"\s*>/i);
assert.equal(referrerMatch?.[1], "no-referrer", "referrer policy must prevent outbound referrer data");

console.log("Static page security policy contract passed.");
