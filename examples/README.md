# Subtitle cue engine example

This is the standalone cue core from the browser implementation, published as a CommonJS file so it can also be inspected and exercised in Node.js. Its parsing and selection logic is unchanged. The demo and tests use synthetic dialogue.

## Run

With Node.js 22 or newer, from this directory:

```sh
node --test subtitle-core.test.cjs
node demo.cjs
```

No package installation, API key, streaming account, or video download is needed.

## What to inspect

- SRT timestamps remain numeric cue boundaries independent of translated dialogue.
- Active cues use a start-inclusive/end-exclusive interval and a user offset.
- Overlapping cues can remain visible together.
- Playback bounds are clamped to avoid a negative seek target.

The tests exercise malformed input, line-ending normalization, overlap, timing boundaries, offsets, and supported video identities. They validate this exported core, not browser integration or Android playback. The URL helper is a player-identity convenience, not a host-authorization or security boundary.

The full application, translation pipeline, user data, and deployment configuration remain private. This folder is an implementation example, not a full-product demo.

## Automated checks

The [public sample workflow](../.github/workflows/sample-checks.yml) runs the focused tests and synthetic demo on pushes and pull requests. It uses no application credentials or private repositories. Passing these checks does not certify the complete private application or its deployment.
