// The Daily Frame — entry program for the make.fun news-image-20261120 bounty.
//
// Full-day edition for Friday 20 November 2026: thirty stories from six
// continents on a single newspaper front page. The page itself lives in
// design.html; render.mjs (a build-time helper the grader never runs)
// screenshots it into the entry.png committed next to this file.
//
// This program does one deliberately unexciting thing: it reads that
// committed picture, checks it against the competition's image gate (a
// single PNG or JPEG, at most 1 MiB, no side longer than 1024 px), and
// copies it byte-for-byte into the output directory. There is no clock,
// no network and no randomness anywhere in the path, so two runs always
// deliver identical bytes. The gate runs before any write, so a bad
// picture fails loudly instead of producing a bad output.
//
// Try it outside the grader container with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = new URL('./entry.png', import.meta.url);
const OUT_NAME = 'entry.png';

// Image gate, as stated in the kit's RULES.txt.
const MAX_BYTES = 1_048_576;
const MAX_SIDE = 1024;

function gateError(detail) {
  throw new Error(`entry.png failed the image gate: ${detail}`);
}

function kindOf(buf) {
  const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (pngMagic.every((byte, i) => buf[i] === byte)) return 'png';
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  return null;
}

function pngSize(buf) {
  // Width and height sit at byte offsets 16 and 20 as big-endian 32-bit
  // integers, after the 8-byte signature and the IHDR length/type.
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function tailIntact(buf, kind) {
  if (kind === 'png') {
    // A well-formed PNG ends with the empty IEND chunk and its fixed CRC.
    const iend = Buffer.from('0000000049454e44ae426082', 'hex');
    return buf.subarray(buf.length - iend.length).equals(iend);
  }
  // A JPEG ends with the end-of-image marker 0xFF 0xD9.
  return buf[buf.length - 2] === 0xff && buf[buf.length - 1] === 0xd9;
}

function validate(buf) {
  const problems = [];
  if (buf.length > MAX_BYTES) {
    problems.push(`it is ${buf.length} bytes, over the ${MAX_BYTES}-byte cap`);
  }
  const kind = kindOf(buf);
  if (kind === null) {
    problems.push('it is neither a PNG nor a JPEG');
    return problems;
  }
  if (kind === 'png') {
    const { width, height } = pngSize(buf);
    if (width > MAX_SIDE || height > MAX_SIDE) {
      problems.push(`it is ${width}x${height}, over the ${MAX_SIDE}x${MAX_SIDE} cap`);
    }
  }
  if (!tailIntact(buf, kind)) {
    problems.push('its tail marker is missing; the file looks truncated');
  }
  return problems;
}

const image = readFileSync(ENTRY);
const problems = validate(image);
if (problems.length > 0) gateError(problems.join('; '));

const destination = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(destination, { recursive: true });
copyFileSync(ENTRY, join(destination, OUT_NAME));
// A plain copy, never a re-encode: the bytes in /output are the bytes
// committed in the repository, so the two graded runs must agree.
console.log(`delivered ${OUT_NAME} (${image.length} bytes) to ${destination}`);
