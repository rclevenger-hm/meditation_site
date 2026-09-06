# Operations and rollback runbook

This site is intentionally static, but it still has runtime dependencies: HTML/CSS/JavaScript must load together, meditation audio assets must remain addressable, and GitHub Pages must publish a coherent revision. This runbook defines the checks to make before and after a release and the safest recovery path when a deployment is bad.

## Release gate

Before merging a change:

1. Run `npm test` from the repository root.
2. Run `node --check script.js` if JavaScript changed.
3. Serve the repository locally with `python -m http.server 4173 --bind 127.0.0.1`.
4. Exercise at least one short and one long meditation preset.
5. Verify narration advances between stages and background audio can start, pause, and resume.
6. Verify keyboard navigation reaches the primary controls and the skip link.
7. Check the page with reduced motion enabled at the OS/browser level.
8. Confirm the browser console has no uncaught errors or missing-asset 404s.

## Post-deploy smoke test

After GitHub Pages reports a successful deployment:

- load the public page in a fresh/private browser session;
- start a one-minute meditation and confirm the timer advances;
- switch meditation style and duration before starting a second session;
- verify narration and background audio resolve from the deployed asset paths;
- resize to a narrow mobile viewport and confirm primary controls remain usable;
- refresh the page to confirm the static shell reloads without stale partial state.

A successful Actions deployment is not, by itself, proof that every referenced media asset works in the published site.

## Failure modes

### Page loads but audio fails

Check the browser Network panel for 404/403 responses and confirm the referenced path exists in the deployed revision. Treat missing narration as a release regression even when the timer still works.

### JavaScript fails after deploy

Check the browser console first. If the failure blocks starting or stopping a session, prefer rollback over a speculative hot fix.

### Pages deployment fails

Keep the last known-good site in service. Inspect the workflow failure before re-running it; do not bypass the test job simply to publish.

### Browser autoplay restrictions

Browsers may block audio until the user has interacted with the page. The application should degrade by waiting for an explicit user action rather than repeatedly attempting autoplay.

## Rollback

For a regression on `main`:

1. Identify the last known-good merge commit.
2. Revert the offending merge/change with a normal reviewable pull request when practical.
3. Run the same release gate against the revert branch.
4. Merge the revert and allow the normal Pages workflow to deploy it.
5. Repeat the public smoke test.

Avoid force-pushing `main` or manually replacing Pages artifacts. Keeping rollback in normal version-control history preserves an auditable release path.

## Operational ownership

When adding a new meditation style or asset set, update tests or validation so missing files fail before deploy. When adding any network-backed feature later, document its timeout, offline behavior, privacy boundary, and failure mode here before treating it as production-ready.
