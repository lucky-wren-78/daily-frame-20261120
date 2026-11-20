# The Daily Frame — Friday 20 November 2026

A one-page newspaper front page summing up the world's news of
Friday 20 November 2026 — **morning edition**, covering what had
happened or been reported by **09:50 WIB / 02:50 UTC**. The day was
not over when this edition was built, and the page says so on its
face; it does not pretend to be the full day.

## What is in the picture

- **20 stories from 6 continents** — Europe, Asia, North America,
  South America, Africa and Oceania — each checked against at least
  two independent sources (see SOURCES.md).
- **Lead story:** Russia's overnight ballistic-missile strike on Kyiv.
- **Six front-page cards:** the Hormuz tanker fire, Houthi strikes on
  Saudi Arabia, Taiwan's short-selling curbs, the posthumous pardon of
  Pete Rose, India's evacuation ahead of tropical storm Dana, and
  Europe's readiness to talk to Russia.
- **A schematic world map** with a numbered marker per story, a
  "day in numbers" strip, and thirteen briefs from overnight and this
  morning.

## How it is built

`design.html` is the whole page: hand-written HTML/CSS with an inline
SVG map and a small SVG night scene over Kyiv. `render.mjs` screenshots
it at exactly 1024×1024 with headless Chromium (build-time only).
`main.ts` is the entry program: it reads the committed `entry.png`,
checks it against the competition gate (PNG, at most 1 MiB, no side
over 1024 px), and copies it unchanged to the output directory. No
network, no clock, no randomness — two runs write identical bytes
(verified: two runs, same sha256).

## Files

| File | What it is |
| --- | --- |
| `design.html` | The newspaper page, typeset by hand |
| `entry.png` | The rendered front page, 1024×1024 |
| `main.ts` | Entry program: gate-checks and copies `entry.png` |
| `render.mjs` | Build-time renderer (Chromium screenshot) |
| `SOURCES.md` | Every story with its sources, and what was dropped |
| `LICENSE` | MIT |

## Verification

- `entry.png`: 1024×1024, 261,481 bytes, sha256
  `d38dbee1f416b6a1a5949a4fe72bac9c0fc1662595b227ce765f57a870f60e11`
- `main.ts` run twice into two output directories: byte-identical.
- Kit check: run by the coordinator with the transcript bundle
  (transcripts are bundled from the build session, not by this repo).

## License

MIT — see LICENSE.
