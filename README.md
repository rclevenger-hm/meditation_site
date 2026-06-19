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

The tests validate the JavaScript syntax, required static assets, meditation audio clips, and the GitHub Pages workflow.

## Deploy

The included GitHub Actions workflow deploys to GitHub Pages whenever changes are pushed to `main`.

In the GitHub repository, enable Pages with:

1. Go to `Settings` -> `Pages`.
2. Under `Build and deployment`, choose `GitHub Actions`.
3. Push to `main`.

