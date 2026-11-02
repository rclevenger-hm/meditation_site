# Guided Meditation Library

A static guided meditation app with multiple practice styles, duration presets from 1 minute to 60 minutes, narrated stage cues, and a looping background music bed.

## Features

- Six meditation styles: Regenerating Light, Mindfulness, Mantra-Style, Loving-Kindness, Body Scan, and Zen Counting.
- Duration presets: 1m, 5m, 10m, 20m, and 60m.
- ElevenLabs narration clips split by routine stage.
- Low-volume looping background music.
- Responsive single-page design that runs directly in the browser.

## Run Locally

This is a static site. From the project folder:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

## Test

```bash
npm test
```

The dependency-free tests validate the static release and exercise interrupted narration, speech fallback, tone cancellation, restart, and timer completion.

Run the Chromium media regression suite as well:

```bash
npm ci
npx playwright install chromium --with-deps
npm run test:browser
```

The browser suite covers failed/pending playback, routine and duration changes, pause/restart, stage transitions, completion, and real playback of the packaged narration and music. Chromium runs headless; the playback assertions check media state, not speaker output. CI runs both suites before deployment. To use an existing Chromium installation locally, set `CHROMIUM_PATH` to its executable path.

## Navigating away from a session

Leaving the page pauses the timer and all session audio, including completion
cues. If the browser restores the page from its back/forward cache, the session
stays paused at its existing progress; press Start to continue. A full reload
still starts a new session. Switching tabs alone does not pause a practice.

## Deploy

The included GitHub Actions workflow deploys to GitHub Pages whenever changes are pushed to `main`.

In the GitHub repository, enable Pages with:

1. Go to `Settings` -> `Pages`.
2. Under `Build and deployment`, choose `GitHub Actions`.
3. Push to `main`.

