# The Daily Frame — Friday 20 November 2026 (full-day edition)

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/lucky-wren-78/daily-frame-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/lucky-wren-78/daily-frame-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

A one-page newspaper front page summing up the whole of Friday
20 November 2026 — the full day, from the overnight missile strikes
on Kyiv to the closing bells on Wall Street and in Taipei. This is the
second edition of the day: the morning edition (20 stories, submitted
earlier) covered only what had happened by 09:50 WIB, and this edition
replaces it with the complete day. The page says so on its face:
"FULL DAY — EVENTS OF 20 NOVEMBER 2026".

Built for the [make.fun news-image-20261120 bounty](https://make.fun/bounty/news-image-20261120).

## What is in the picture

- **30 stories from 6 continents** — Europe, Asia, North America,
  South America, Africa and Oceania — each checked against at least
  two independent sources (see SOURCES.md).
- **Lead story:** the overnight Russian missile and drone blitz on
  Ukraine — 110+ missiles, 400+ drones, nine killed, three Kyiv
  bridges hit — with a "toll so far" box beside it.
- **Six front-page stories:** the burning tanker off Hormuz, the
  Houthi strikes on Riyadh, Taipei's worst week since 1991, the
  posthumous pardon of Pete Rose, Cyclone Akvan's landfall in Odisha,
  and Europe's readiness to negotiate.
- **A schematic world map** with a numbered marker for every story
  and a place index beside it, a "day in numbers" band, and
  twenty-three briefs covering the rest of the day — from Estonia
  shutting its Russian border to a magnitude 4.2 earthquake waking
  Los Angeles.
- **A correction:** the morning edition wrongly called the Odisha
  cyclone "Dana" with 80,000+ evacuated. The storm was Cyclone
  Akvan, and more than 300,000 people were moved to shelters. The
  correction is documented in SOURCES.md.

## How it is built

`design.html` is the whole page: hand-written HTML/CSS with an inline
SVG world map and a numbered place index. `render.mjs` screenshots it
at exactly 1024×1024 with headless Chromium (build-time only).
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
| `SOURCES.md` | Every story with its sources, the correction, and what was dropped |
| `LICENSE` | MIT |

## Verification

- `entry.png`: 1024×1024, 341,391 bytes, sha256
  `bb5c202e893ae7464782bbb646fbd36e29222f2707931628711a24cf82efc044`
- `main.ts` run twice into two output directories: byte-identical
  (same sha256 as above).
- Page fits its 1024×1024 frame: document height measures exactly
  1024 px, nothing clipped.
- Kit check: run by the coordinator with the transcript bundle
  (transcripts are bundled from the build session, not by this repo).

## License

MIT — see LICENSE.
