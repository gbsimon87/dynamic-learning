/* global document, localStorage, sessionStorage */
/**
 * One batched, local-only browser check for star systems, trips and the galaxy
 * map (#108/#109). Run through `node scripts/checkSolarUi.js --systems` after
 * `npm run build`. Screenshots go to /tmp/bix-solar-systems for review.
 * Light themes run with motion (streaks), dark themes with reduced motion.
 */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const DIR = '/tmp/bix-solar-systems';
await mkdir(DIR, { recursive: true });
const server = await preview({ logLevel: 'error', preview: { host: '127.0.0.1', port: 0, open: false } });
const base = `http://127.0.0.1:${server.httpServer.address().port}`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', chromiumSandbox: true, args: ['--mute-audio'] });
const errors = [], failures = [];
const overlap = (a, b) => a && b && a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
try {
  for (const [width, height] of [[1280, 900], [1024, 768], [390, 844], [844, 390]]) for (const theme of ['light', 'dark']) {
    const tag = `${width}x${height}-${theme}`;
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 1000, reducedMotion: theme === 'dark' ? 'reduce' : 'no-preference' });
    await context.addInitScript(t => { localStorage.setItem('theme', t); sessionStorage.setItem('dl.solarWarpSeen', '1'); }, theme);
    await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(`${tag}: ${e.message}`));
    page.on('console', m => { if (m.type() === 'error') errors.push(`${tag} console: ${m.text().slice(0, 200)}`); });
    page.setDefaultTimeout(20000);
    const shot = async (name, wait = 1200) => { await page.waitForTimeout(wait); await page.screenshot({ path: join(DIR, `${tag}-${name}.png`) }); };
    const step = async (name, fn) => { try { await fn(); } catch (e) { failures.push(`${tag} ${name}: ${e.message.split('\n')[0]}`); await shot(`fail-${name.replace(/\W+/g, '-')}`, 0).catch(() => {}); } };
    // Turn the rocket round and hold Turbo + Space until the leaving warning shows.
    const flyOut = async () => {
      await page.locator('.solar-flight').focus();
      await page.keyboard.down('ArrowLeft'); await page.waitForTimeout(1850); await page.keyboard.up('ArrowLeft');
      await page.keyboard.down('Shift'); await page.keyboard.down(' ');
      await page.locator('.solar-trip').waitFor({ timeout: 30000 });
    };
    const release = async () => { await page.keyboard.up(' '); await page.keyboard.up('Shift'); };

    await page.goto(`${base}/skills/solar-system`);
    await page.waitForFunction(() => document.querySelector('[aria-label="More things to do"]')?.disabled === false);
    await step('toolbar fits', async () => {
      const buttons = await page.locator('.solar-launch-buttons button').evaluateAll(list => list.map(b => b.getBoundingClientRect().toJSON()));
      assert.equal(buttons.length, 3, 'Tour, Fly and More at home');
      const search = await page.locator('.solar-toolbar').boundingBox();
      for (const box of buttons) {
        assert.ok(box.x >= 0 && box.x + box.width <= width && box.y >= 0, 'on screen');
        assert.ok(!overlap(box, search), 'clear of search');
      }
      // The More list opens on screen, above the search row, with 48px choices.
      await page.getByRole('button', { name: 'More things to do' }).click();
      const list = await page.locator('.solar-toolbar-menu__list').boundingBox();
      assert.ok(list.x >= 0 && list.x + list.width <= width && list.y + list.height <= height, `More list on screen: ${JSON.stringify(list)}`);
      const heights = await page.locator('.solar-toolbar-menu__item').evaluateAll(items => items.map(i => i.getBoundingClientRect().height));
      assert.equal(heights.length, 4, 'constellations, meteor, Beyond, galaxy map');
      assert.ok(heights.every(h => h >= 48), `48px choices: ${heights}`);
      const top = await page.evaluate(() => { const r = document.querySelector('.solar-toolbar-menu__item:last-child').getBoundingClientRect(); return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.closest('.solar-toolbar-menu__item') !== null; });
      assert.ok(top, 'the list is not covered');
      await shot('01b-more-open');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.solar-toolbar-menu__list').count(), 0, 'Escape closes More');
    });
    await shot('01-home');
    await step('map to TRAPPIST-1', async () => {
      await page.getByRole('button', { name: 'More things to do' }).click();
      await page.getByRole('button', { name: 'Galaxy map' }).click();
      await shot('02-map-galaxies', 2500);
      await page.getByRole('button', { name: 'Andromeda' }).click();
      await page.getByRole('region', { name: 'Andromeda' }).waitFor();
      await shot('03-andromeda');
      await page.getByRole('button', { name: 'Milky Way' }).click();
      await shot('04-milky-way', 2500);
      await page.getByRole('button', { name: 'You are here' }).click();
      await shot('05-neighbourhood', 2500);
      await page.getByRole('button', { name: 'TRAPPIST-1', exact: true }).click();
      await shot('06-trappist-card');
      await page.getByRole('button', { name: 'Jump there' }).click();
      await page.locator('.solar-trip').waitFor();
      await shot('07-jump-trip', 1500);
      await page.locator('[aria-label="Tour TRAPPIST-1"]').waitFor();
      await shot('08-arrived', 800);
    });
    await step('TRAPPIST-1 card and tour', async () => {
      await page.getByRole('button', { name: 'Tour TRAPPIST-1' }).click();
      await page.locator('aside[aria-label="TRAPPIST-1 information"]').waitFor();
      await shot('09-tour-stop-1');
      await page.getByRole('button', { name: 'Hide TRAPPIST-1 information' }).click();
      await page.getByRole('button', { name: /Overview/ }).click();
      await page.locator('[aria-label="Fly the rocket"]').waitFor();
    });
    await step('flight, turn back, fly home', async () => {
      await page.getByRole('button', { name: 'Fly the rocket' }).click();
      await shot('10-flight');
      await flyOut();
      await shot('11-warning', 600);
      await page.getByRole('button', { name: 'Turn back' }).click();
      await release();
      await page.waitForFunction(() => !document.querySelector('.solar-trip'), null, { timeout: 5000 });
      await shot('12-turned-back', 1500);
      await flyOut();
      await page.waitForTimeout(4000);
      await shot('13-dash', 0);
      await release();
      await page.locator('[aria-label="Fly through the Solar System"]').waitFor({ timeout: 20000 });
      await page.waitForFunction(() => !document.querySelector('.solar-trip'), null, { timeout: 15000 });
      await shot('14-arrived-home', 800);
    });
    await step('Home button from TRAPPIST-1', async () => {
      await page.goto(`${base}/skills/solar-system?debug&system=trappist-1`);
      await page.locator('[aria-label="Tour TRAPPIST-1"]').waitFor();
      await page.getByRole('button', { name: 'Fly home to the Solar System' }).click();
      await shot('15-home-trip', 1500);
      await page.locator('[aria-label="Tour the Solar System"]').waitFor({ timeout: 20000 });
      await shot('16-home', 1500);
    });
    await step('Space explorer chapters and the belt run', async () => {
      await page.goto(`${base}/skills/solar-system`);
      await page.waitForFunction(() => document.querySelector('[aria-label="Fly the rocket"]')?.disabled === false);
      await page.getByRole('button', { name: 'Fly the rocket' }).click();
      const panel = page.locator('.solar-flight__top');
      if (await page.getByRole('button', { name: 'Expand flight panel' }).count()) await page.getByRole('button', { name: 'Expand flight panel' }).click();
      await page.getByText('Choose an adventure').first().waitFor();
      const box = await panel.boundingBox();
      assert.ok(box.x >= 0 && box.x + box.width <= width, `panel on screen: ${JSON.stringify(box)}`);
      const sizes = await page.locator('.solar-flight__chapter-list button').evaluateAll(list => list.map(b => b.getBoundingClientRect().height));
      assert.equal(sizes.length, 5, 'five chapters'); assert.ok(sizes.every(h => h >= 48), `48px chapters: ${sizes}`);
      await shot('17-chapter-picker');
      await page.getByRole('button', { name: /Asteroid-belt run/ }).click();
      await page.getByText(/mostly empty space/).waitFor();
      await page.getByRole('button', { name: /Where to/ }).click();
      await page.getByText(/Read the clue and try first/).waitFor();
      await shot('18-belt-chapter-locked');
      if (!(width === 1280 && theme === 'light') && !(width === 390 && theme === 'dark')) return;
      // Fly for 24 s to earn the 20 s help, then aim at Ceres and boost into the belt.
      await page.locator('.solar-flight').focus();
      await page.keyboard.down(' '); await page.waitForTimeout(24000); await page.keyboard.up(' ');
      await page.getByRole('combobox').selectOption('Ceres');
      const point = page.getByRole('button', { name: 'Point rocket here' });
      assert.equal(await point.isDisabled(), false, 'help unlocked after flying');
      await point.click();
      await page.keyboard.down('Shift'); await page.keyboard.down(' ');
      await page.waitForTimeout(9000);
      await shot('19-belt-rocks', 0);
      await page.keyboard.up(' '); await page.keyboard.up('Shift');
      await page.getByRole('button', { name: /Back to Solar System/ }).click();
      await page.getByRole('combobox', { name: /Search/ }).fill('Ceres').catch(async () => {
        await page.getByRole('button', { name: /Search the Solar System/ }).click();
        await page.getByRole('combobox', { name: /Search/ }).fill('Ceres');
      });
      await page.getByRole('option', { name: /Ceres/ }).click();
      await page.getByText(/largest object in the asteroid belt/).first().waitFor({ timeout: 15000 });
      await shot('20-ceres-card', 800);
    });
    await context.close();
  }
} finally { await browser.close(); await server.close(); }
console.log(JSON.stringify({ errors, failures }, null, 1));
console.log(`Screenshots: ${DIR}`);
process.exitCode = errors.length || failures.length ? 1 : 0;
