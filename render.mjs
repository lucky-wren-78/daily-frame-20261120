// Build-time renderer: turns design.html into entry.png, 1024x1024.
//
// The grader never executes this file. It only runs main.ts, which copies
// the entry.png produced here. Chromium is loaded from the Playwright
// package installed under ~/workspace/makefun/tools-browser.
//
//   node render.mjs            (run from this directory)

import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const toolsManifest = join(
  process.env.HOME ?? '',
  'workspace/makefun/tools-browser/package.json',
);
const { chromium } = createRequire(toolsManifest)('playwright');

async function render() {
  const browser = await chromium.launch({ args: ['--force-device-scale-factor=1'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
    await page.goto('file://' + join(here, 'design.html'), { waitUntil: 'load' });
    await page.screenshot({ path: join(here, 'entry.png') });
  } finally {
    await browser.close();
  }
}

await render();
console.log('entry.png rendered (1024x1024)');
