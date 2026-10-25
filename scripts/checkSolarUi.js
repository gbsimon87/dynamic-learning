/* global document, localStorage, sessionStorage */
/** One batched, local-only visual check for the Solar System panel redesign. */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const artifacts = '/tmp/bix-solar-ui';
await mkdir(artifacts, { recursive: true });
const server = await preview({ logLevel: 'error', preview: { host: '127.0.0.1', port: 0, open: false } });
const base = `http://127.0.0.1:${server.httpServer.address().port}`;
let browser;
const results = [];
const dotsOnly = process.argv.includes('--dots-only');
const constellationsOnly = process.argv.includes('--constellations-only');
try {
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', chromiumSandbox: true, args: ['--mute-audio'] });
  for (const [width, height] of [[1280, 900], [619, 756], [390, 844], [844, 390]]) for (const theme of ['light', 'dark']) {
    const normalMotion = !constellationsOnly && !dotsOnly && width === 1280 && theme === 'light';
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 1000, reducedMotion: normalMotion ? 'no-preference' : 'reduce' });
    await context.addInitScript(theme => { localStorage.setItem('theme', theme); sessionStorage.setItem('dl.solarWarpSeen', '1'); }, theme);
    await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error' && message.text().includes('Solar module')) errors.push(message.text()); });
    page.setDefaultTimeout(15000);
    const inside = async (selector, { maxWidth = width } = {}) => {
      const element = page.locator(selector);
      const box = await element.boundingBox();
      assert.ok(box && box.x >= -1 && box.y >= -1 && box.x + box.width <= width + 1 && box.y + box.height <= height + 1, `${selector} clipped at ${width}/${theme}: ${JSON.stringify(box)}`);
      assert.ok(box.width <= maxWidth + 1, `${selector} too wide: ${box.width}`);
      assert.ok(await element.evaluate(el => el.scrollWidth <= el.clientWidth + 2), `${selector} overflows horizontally`);
      return box;
    };
    const shot = name => page.screenshot({ path: `${artifacts}/${width}-${theme}-${name}.png` });
    await page.goto(`${base}/solar-system`);
    assert.equal(await page.locator('nav.navbar').isVisible(), false, 'global navigation is hidden in the Solar System');
    const sceneBox = await page.locator('.solar-system').boundingBox();
    assert.ok(sceneBox && sceneBox.y <= 1 && sceneBox.height >= height - 2, `Solar System uses the full viewport: ${JSON.stringify(sceneBox)}`);
    await page.getByRole('button', { name: 'Fly the rocket', exact: true }).waitFor();
    await page.waitForFunction(() => !document.querySelector('[aria-label="Fly the rocket"]').disabled);

    if (!constellationsOnly && !dotsOnly) {
    await page.getByRole('button', { name: /Missions/ }).click();
    await inside('.solar-missions-dialog', { maxWidth: 440 });
    await shot('missions');
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    }

    await page.getByRole('button', { name: 'Explore constellations' }).click();
    await page.locator('.solar-constellation').waitFor();
    const skyBox = await inside('.solar-constellation');
    const controls = await page.locator('.solar-constellation__controls').boundingBox();
    assert.ok(controls.y + controls.height <= skyBox.y + skyBox.height + 1, 'constellation navigation clipped');
    assert.equal(await page.locator('.solar-constellation svg').count(), 0, 'duplicate chart removed');
    if (dotsOnly) {
      await page.getByRole('button', { name: /Join dots/ }).click();
      await page.locator('.solar-dots__star--next').waitFor({ state: 'visible' });
      const panel = await inside('.solar-dots__panel');
      const footer = await page.locator('.solar-dots__actions').boundingBox();
      assert.ok(footer.y + footer.height <= panel.y + panel.height + 1, 'tracing footer clipped');
      if (width >= 600) assert.ok(panel.x <= 13 && panel.y < 110, 'tracing panel must be desktop-left');
      for (const button of await page.locator('.solar-dots__panel button:visible').all()) {
        const box = await button.boundingBox();
        assert.ok(box.width >= 48 && box.height >= 48, 'small tracing control');
      }
      await shot('dots');
      for (let step = 0; step < 40 && await page.locator('.solar-dots__star--next').count(); step++) {
        await page.locator('.solar-dots__star--next').click();
      }
      await page.getByLabel('Constellation complete', { exact: true }).waitFor();
      await inside('.solar-dots__panel');
      await page.getByRole('button', { name: 'Try next constellation' }).waitFor({ state: 'visible' });
      await shot('dots-complete');
      assert.deepEqual(errors, []);
      results.push({ width, height, theme, panel });
      await context.close(); continue;
    }
    await page.getByRole('button', { name: /About this pattern/ }).click();
    const expandedSky = await inside('.solar-constellation');
    if (width >= 600) {
      assert.ok(expandedSky.x <= 13 && expandedSky.y < 110, 'desktop constellation panel must be top-left');
      assert.ok(expandedSky.height > 260, 'desktop details have more vertical reading space');
    }
    await shot('constellations');
    if (constellationsOnly) {
      assert.deepEqual(errors, []);
      results.push({ width, height, theme, panel: expandedSky });
      await context.close(); continue;
    }
    await page.getByRole('button', { name: 'Close constellations' }).click();

    const search = page.getByRole('combobox', { name: 'Search planets and moons' });
    if (!await search.isVisible()) await page.getByRole('button', { name: 'Search planets and moons', exact: true }).click();
    await search.fill('Earth'); await search.press('Enter');
    await page.getByRole('complementary', { name: 'Earth information' }).waitFor();
    await inside('.solar-info-card', { maxWidth: 340 });
    await page.getByRole('button', { name: /Play & compare/ }).click();
    await page.getByRole('combobox', { name: 'Choose an activity' }).selectOption('age');
    await page.getByRole('button', { name: '7', exact: true }).click();
    await inside('.solar-info-card');
    await shot('planet');
    await page.getByRole('button', { name: /Look closer/ }).click();
    await page.getByRole('button', { name: /Moon phases/ }).click();
    await page.getByRole('img', { name: /Moon seen from Earth/ }).waitFor();
    await inside('.solar-info-card');
    await page.getByRole('button', { name: 'Hide Earth information' }).click();

    if (normalMotion) {
      const searchForFlight = page.getByRole('combobox', { name: 'Search planets and moons' });
      if (!await searchForFlight.isVisible()) await page.getByRole('button', { name: 'Search planets and moons', exact: true }).click();
      await searchForFlight.fill('Mars'); await searchForFlight.press('Enter');
      const cameraChoices = page.locator('.solar-camera-choices--floating');
      await cameraChoices.waitFor({ state: 'visible' });
      await cameraChoices.getByRole('button', { name: /Cockpit/ }).click();
      await inside('.solar-cockpit', { maxWidth: width });
      await page.keyboard.press('c');
      await page.locator('.solar-cockpit').waitFor({ state: 'hidden' });
      await page.keyboard.press('c');
      await page.locator('.solar-cockpit').waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      await shot('autopilot-cockpit');
      await cameraChoices.getByRole('button', { name: /Behind rocket/ }).click();
      await page.waitForTimeout(400);
      await shot('autopilot-behind');
      await cameraChoices.waitFor({ state: 'hidden' });
      const hideMars = page.getByRole('button', { name: 'Hide Mars information' });
      if (await hideMars.isVisible()) await hideMars.click();
    }

    await page.getByRole('button', { name: 'Fly the rocket', exact: true }).click();
    const hudBox = await inside('.solar-flight__top', { maxWidth: 340 });
    assert.ok(hudBox.height <= 300, `flight HUD too tall: ${hudBox.height}`);
    assert.equal(await page.getByText('Practice game', { exact: true }).count(), 0);
    const touchControls = page.locator('.solar-flight__touch-controls');
    assert.equal(await touchControls.isVisible(), width < 1000, `touch controls visibility at ${width}px`);
    assert.equal(await page.getByRole('button', { name: 'Stop', exact: true }).count(), 0, 'Stop is removed on every device');
    const panelToggle = page.locator('.solar-flight__panel-toggle');
    const details = page.locator('.solar-flight__details');
    const initiallyExpanded = (await panelToggle.getAttribute('aria-expanded')) === 'true';
    assert.equal(initiallyExpanded, width >= 1000, `flight panel default state at ${width}px`);
    if (initiallyExpanded) {
      await panelToggle.click(); assert.equal(await details.isVisible(), false, 'panel collapses');
      await panelToggle.click(); assert.equal(await details.isVisible(), true, 'panel expands');
    } else {
      await panelToggle.click(); assert.equal(await details.isVisible(), true, 'panel expands');
      await panelToggle.click(); assert.equal(await details.isVisible(), false, 'panel collapses');
      await panelToggle.click();
    }
    assert.equal((await panelToggle.getAttribute('aria-expanded')) === 'true', true, 'panel is open for flight setup');
    await panelToggle.click();
    const compactCamera = page.getByRole('button', { name: 'Switch to Cockpit camera' });
    assert.equal(await compactCamera.isVisible(), true, 'camera control remains visible with the panel collapsed');
    await compactCamera.click();
    await page.locator('.solar-cockpit').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Switch to Behind rocket camera' }).click();
    await page.locator('.solar-cockpit').waitFor({ state: 'hidden' });
    await page.locator('canvas').click({ position: { x: width * .7, y: height * .5 } });
    await page.keyboard.press('c');
    await page.locator('.solar-cockpit').waitFor({ state: 'visible' });
    await shot('collapsed-camera-controls');
    await page.keyboard.press('c');
    await page.locator('.solar-cockpit').waitFor({ state: 'hidden' });
    await panelToggle.click();
    await page.getByRole('button', { name: /Where to/ }).click();
    await page.getByRole('combobox').selectOption('Pluto');
    await page.getByRole('button', { name: 'Point rocket here' }).click();
    await page.getByRole('group', { name: 'Camera view' }).getByRole('button', { name: /Cockpit/ }).click();
    assert.equal(await page.locator('.solar-flight').evaluate(el => document.activeElement === el), true, 'camera changes return keyboard focus to flight');
    await page.locator('.solar-cockpit').waitFor();
    await page.waitForTimeout(220);
    await shot('manual-cockpit');
    await page.getByRole('group', { name: 'Camera view' }).getByRole('button', { name: /Behind rocket/ }).click();
    if (normalMotion) { await page.waitForTimeout(350); await shot('manual-behind'); }
    if (normalMotion) {
      await page.locator('.solar-flight').focus();
      await page.keyboard.down('ArrowUp');
      await page.keyboard.down('Space');
      await page.waitForTimeout(500);
      await shot('keyboard-flight');
      await page.keyboard.down('Shift');
      await page.waitForTimeout(500);
      await shot('turbo');
      await page.keyboard.up('Shift');
      await page.keyboard.up('Space');
      await page.keyboard.up('ArrowUp');
    }
    if (width < 1000) {
      await inside('.solar-flight__turbo'); await inside('.solar-flight__go'); await inside('.solar-flight__stick');
      const stickBox = await page.locator('.solar-flight__stick').boundingBox();
      assert.ok(stickBox.x + stickBox.width < width / 2, `landscape/mobile joystick is on the left: ${JSON.stringify(stickBox)}`);
    } else {
      assert.equal(await page.locator('.solar-flight__touch-controls button:visible').count(), 0, 'desktop has no touch flight buttons');
      assert.equal(await page.locator('.solar-flight__stick:visible').count(), 0, 'desktop has no joystick');
    }
    await shot('flight');
    await page.getByRole('button', { name: 'Back to Solar System' }).click();
    assert.equal(await page.locator('canvas').count(), 1, 'main scene remains the only renderer');
    assert.deepEqual(errors, [], `runtime errors at ${width}/${theme}`);
    results.push({ width, height, theme, hudHeight: Math.round(hudBox.height), constellationHeight: Math.round(skyBox.height), errors: errors.length });
    await context.close();
  }
  console.log(JSON.stringify({ results, artifacts }, null, 2));
} finally {
  await browser?.close();
  await new Promise(resolve => server.httpServer.close(resolve));
}
