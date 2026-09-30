# Media reliability runbook

The meditation experience depends on narration and ambient audio continuing to behave predictably across browser autoplay policy, interrupted playback, missing assets, and session transitions. This runbook defines the acceptance checks for changes that touch audio or session timing.

## Failure matrix

| Condition | Expected behavior |
| --- | --- |
| Browser rejects autoplay | Session UI remains usable and gives the user an explicit control to start playback. |
| Narration asset fails to load | The timer and session controls remain functional; the page does not enter a reload loop. |
| Ambient track fails to load | Narration and timer behavior continue independently. |
| User pauses and resumes | Playback resumes from the current session state without duplicating timers or listeners. |
| Tab is backgrounded and restored | Remaining time is derived from elapsed time rather than accumulated interval drift. |
| Session ends while media is loading | Pending playback must not restart after the session is complete. |
| Reduced-motion preference is enabled | Visual transitions remain optional and do not affect audio or timer state. |

## Browser validation

For a release candidate, run the existing automated tests and then verify the primary session flow in current Chromium and Firefox. Use developer tools to block one narration request and one ambient-audio request. Confirm that the page remains interactive, the timer can be stopped, and no repeated network retry loop is created.

Also test a fresh private window so the first playback attempt is subject to the browser's normal media-engagement rules rather than previously granted permissions.

## Observability during debugging

When reproducing a media failure, record the asset URL, browser/version, whether the page was foregrounded, the session state, and the first media error reported by the browser. Avoid treating a single browser-specific media exception as proof of a corrupt asset until the same file has been checked directly.

## Release gate

A media-related change is ready only when:

- the existing test suite passes;
- a missing or blocked audio asset does not break the timer or navigation;
- user-initiated playback still works when autoplay is denied;
- stopping or completing a session prevents late playback from restarting;
- no new third-party media or analytics dependency is introduced without review.
