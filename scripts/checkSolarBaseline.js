/* global document, localStorage, sessionStorage, Image */
/**
 * Local-only before/after check for the Solar System while it moves onto
 * system definitions (galaxy map / TRAPPIST-1 plan, Tasks 0 and 9).
 *
 *   node scripts/checkSolarBaseline.js --capture <dir>
 *   node scripts/checkSolarBaseline.js --compare <beforeDir> <afterDir>
 *
 * Capture needs `npm run build` first. Reduced motion keeps the views steady;
 * the star field and asteroid belt are random per load, so compare flags a
 * pair only when more than 2% of its pixels differ by more than 10%.
 */
import assert from 'node:assert/strict';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const VIEWPORTS = [[1280, 900], [390, 844], [844, 390]];
const THEMES = ['light', 'dark'];
const PIXEL_TOLERANCE = 0.1;
const FLAG_SHARE = 0.02;

const launch = () => chromium.launch({
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  chromiumSandbox: true, args: ['--mute-audio'],
});

async function capture(dir) {
  await mkdir(dir, { recursive: true });
  const server = await preview({ logLevel: 'error', preview: { host: '127.0.0.1', port: 0, open: false } });
  const base = `http://127.0.0.1:${server.httpServer.address().port}`;
  const browser = await launch();
  const errors = [];
  let shots = 0;
  try {
    for (const [width, height] of VIEWPORTS) for (const theme of THEMES) {
      const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 1000, reducedMotion: 'reduce' });
      await context.addInitScript(t => { localStorage.setItem('theme', t); sessionStorage.setItem('dl.solarWarpSeen', '1'); }, theme);
      await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(`${width}x${height}-${theme}: ${error.message}`));
      page.on('console', message => { if (message.type() === 'error' && message.text().includes('Solar module')) errors.push(message.text()); });
      page.setDefaultTimeout(15000);
      const shot = async name => { await page.waitForTimeout(1500); await page.screenshot({ path: join(dir, `${width}x${height}-${theme}-${name}.png`) }); shots++; };

      await page.goto(`${base}/skills/solar-system`);
      await page.waitForFunction(() => document.querySelector('[aria-label="Fly the rocket"]')?.disabled === false);
      await shot('overview');

      const input = page.locator('.solar-search__input');
      if (!(await input.isVisible())) await page.getByRole('button', { name: 'Search the Solar System' }).click();
      await input.fill('Earth');
      await page.keyboard.press('Enter');
      await page.locator('aside[aria-label="Earth information"]').waitFor();
      await shot('earth-card');
      await page.getByRole('button', { name: 'Hide Earth information' }).click();
      await page.getByRole('button', { name: /Overview/ }).click();

      await page.getByRole('button', { name: 'Tour the Solar System' }).click();
      await page.locator('aside[aria-label="Mercury information"]').waitFor();
      await shot('tour-stop-1');
      await page.getByRole('button', { name: 'Hide Mercury information' }).click();
      await page.getByRole('button', { name: /Overview/ }).click();

      await page.getByRole('button', { name: 'Fly the rocket', exact: true }).click();
      await page.locator('section[aria-label="Fly through the Solar System"]').waitFor();
      await shot('flight-hud');
      await page.getByRole('button', { name: 'Back to Solar System' }).click();

      await page.getByRole('button', { name: 'My view settings' }).click();
      await shot('my-view');
      await page.getByRole('button', { name: 'Close my view settings' }).click();

      await page.getByRole('button', { name: 'More things to do' }).click();

      await page.getByRole('button', { name: 'Warp to Beyond' }).click();
      await page.getByRole('dialog', { name: 'Where to?' }).waitFor();
      await shot('beyond-picker');
      await context.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
  console.log(`captured ${shots} screenshots in ${dir}`);
  if (errors.length) console.log(`page errors:\n${errors.join('\n')}`);
  assert.equal(errors.length, 0, 'page or module errors');
}

async function compare(beforeDir, afterDir) {
  const names = (await readdir(beforeDir)).filter(name => name.endsWith('.png')).sort();
  assert.ok(names.length > 0, `no screenshots in ${beforeDir}`);
  const browser = await launch();
  const flagged = [];
  try {
    const page = await browser.newPage();
    for (const name of names) {
      const [a, b] = await Promise.all([readFile(join(beforeDir, name)), readFile(join(afterDir, name))
        .catch(() => null)]);
      if (!b) { flagged.push(`${name}: missing after`); continue; }
      const share = await page.evaluate(async ([left, right, tolerance]) => {
        const load = src => new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src; });
        const [one, two] = await Promise.all([load(left), load(right)]);
        if (one.width !== two.width || one.height !== two.height) return 1;
        const pixels = image => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width; canvas.height = image.height;
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0);
          return context.getImageData(0, 0, image.width, image.height).data;
        };
        const p = pixels(one), q = pixels(two);
        let different = 0;
        for (let i = 0; i < p.length; i += 4) {
          const delta = Math.max(Math.abs(p[i] - q[i]), Math.abs(p[i + 1] - q[i + 1]), Math.abs(p[i + 2] - q[i + 2])) / 255;
          if (delta > tolerance) different++;
        }
        return different / (p.length / 4);
      }, [`data:image/png;base64,${a.toString('base64')}`, `data:image/png;base64,${b.toString('base64')}`, PIXEL_TOLERANCE]);
      if (share > FLAG_SHARE) flagged.push(`${name}: ${(share * 100).toFixed(1)}% of pixels differ`);
    }
  } finally {
    await browser.close();
  }
  console.log(`compared ${names.length} pairs; flagged ${flagged.length}`);
  for (const line of flagged) console.log(`  ${line}`);
}

const [mode, first, second] = process.argv.slice(2);
if (mode === '--capture' && first) await capture(first);
else if (mode === '--compare' && first && second) await compare(first, second);
else {
  console.error('usage: --capture <dir> | --compare <beforeDir> <afterDir>');
  process.exit(2);
}
