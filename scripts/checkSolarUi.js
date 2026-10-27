/* global document, localStorage, sessionStorage */
/** One batched, local-only visual check for the Solar System panel redesign. */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

// Star systems, trips and the galaxy map have their own pass (#108/#109).
if (process.argv.includes('--systems')) {
  await import('./checkSolarSystems.js');
  process.exit(process.exitCode ?? 0);
}

const artifacts = '/tmp/bix-solar-ui';
await mkdir(artifacts, { recursive: true });
const server = await preview({ logLevel: 'error', preview: { host: '127.0.0.1', port: 0, open: false } });
const base = `http://127.0.0.1:${server.httpServer.address().port}`;
let browser;
const results = [];
const settingsOnly = process.argv.includes('--settings-only');
const dotsOnly = process.argv.includes('--dots-only');
const constellationsOnly = process.argv.includes('--constellations-only');
const beyondOnly = process.argv.includes('--beyond-only');
try {
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', chromiumSandbox: true, args: ['--mute-audio'] });
  for (const [width, height] of [[1280, 900], [619, 756], [390, 844], [844, 390]]) for (const theme of ['light', 'dark']) {
    if (beyondOnly && width === 619) continue;
    const normalMotion = !settingsOnly && !constellationsOnly && !dotsOnly && width === 1280 && theme === 'light';
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
    await page.goto(`${base}/solar-system${settingsOnly ? "?debug" : ""}`);
    assert.equal(await page.locator('nav.navbar').isVisible(), false, 'global navigation is hidden in the Solar System');
    const sceneBox = await page.locator('.solar-system').boundingBox();
    assert.ok(sceneBox && sceneBox.y <= 1 && sceneBox.height >= height - 2, `Solar System uses the full viewport: ${JSON.stringify(sceneBox)}`);
    await page.getByRole('button', { name: 'Fly the rocket', exact: true }).waitFor();
    await page.waitForFunction(() => document.querySelector('[aria-label="Fly the rocket"]')?.disabled === false);

    if (beyondOnly && width === 1280 && theme === 'light') {
      // Toolbar between the launch buttons and My view at every breakpoint:
      // an open field of at least 216px, or the search button that spreads out.
      const edges = () => page.evaluate(() => {
        const box = selector => { const b = document.querySelector(selector)?.getBoundingClientRect(); return b && b.width ? { left: b.left, right: b.right } : null; };
        return { row: box('.solar-launch-buttons'), toggle: box('.solar-search-toggle'), search: box('.solar-search'), pane: box('.solar-tuning') };
      });
      for (const probe of [720, 767, 768, 1099, 1100, 1279, 1280]) {
        await page.setViewportSize({ width: probe, height: 900 });
        await page.waitForTimeout(150);
        const e = await edges();
        const start = (e.search ?? e.toggle).left;
        assert.ok(e.row.right <= start - 4, `launch row meets search at ${probe}px: ${JSON.stringify(e)}`);
        if (e.search) {
          assert.ok(e.search.right - e.search.left >= 216, `search field narrow at ${probe}px: ${JSON.stringify(e)}`);
          assert.ok(e.search.right <= e.pane.left - 4, `search meets My view at ${probe}px`);
        } else {
          await page.getByRole('button', { name: 'Search the Solar System' }).click();
          const open = await edges();
          assert.ok(open.search && open.search.right <= open.pane.left - 4 && open.search.right - open.search.left >= 216, `opened search at ${probe}px: ${JSON.stringify(open)}`);
          assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('solar-search__input')), true, 'opened search takes focus');
          await page.locator('.solar-search__input').evaluate(input => input.blur());
          await page.waitForTimeout(100);
        }
      }
      await page.setViewportSize({ width: 1100, height: 900 });
      await page.getByRole('button', { name: 'Search the Solar System' }).click();
      await page.locator('.solar-search__input').fill('Mars');
      await page.keyboard.press('Enter');
      await page.getByRole('button', { name: /Overview/ }).waitFor();
      const chosen = await edges();
      assert.ok(chosen.row === null && chosen.toggle.left < 400, `toolbar moves left when the launch buttons go: ${JSON.stringify(chosen)}`);
      const overview = await page.getByRole('button', { name: /Overview/ }).boundingBox();
      assert.ok(overview.x + overview.width <= chosen.pane.left - 4, 'Overview clear of My view');
      const cameras = await page.locator('.solar-camera-choices--floating').boundingBox();
      assert.ok(!cameras || cameras.x + cameras.width <= chosen.toggle.left - 4, `camera buttons clear of search: ${JSON.stringify(cameras)}`);
      await shot('toolbar-1100-chosen');
      await page.getByRole('button', { name: /Overview/ }).click();
      await page.getByRole('button', { name: 'More things to do' }).waitFor();
      await page.setViewportSize({ width, height });
      await page.waitForTimeout(300);
    }

    if (beyondOnly) {
      // Warp to Beyond (#113) → Space ripples (#94) → home, in one pass.
      await page.getByRole('button', { name: 'More things to do' }).click();
      await page.getByRole('button', { name: 'Warp to Beyond' }).click();
      await page.getByRole('dialog', { name: 'Where to?' }).waitFor();
      await inside('.beyond-picker', { maxWidth: 440 });
      await shot('beyond-picker');
      await page.getByRole('button', { name: /Space ripples/ }).click();
      const hold = page.getByRole('button', { name: 'Hold to power the engine' });
      await hold.waitFor();
      await inside('.beyond-warp');
      assert.equal(await hold.evaluate(el => el === document.activeElement), true, 'focus moves to the hold button');
      const holdBox = await hold.boundingBox();
      assert.ok(holdBox.width >= 48 && holdBox.height >= 48, 'small hold button');
      await page.mouse.move(holdBox.x + holdBox.width / 2, holdBox.y + holdBox.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(2500);
      const progress = Number(await page.getByRole('progressbar').getAttribute('aria-valuenow'));
      assert.ok(progress > 20 && progress < 100, `holding moves the warp on: ${progress}`);
      await shot('beyond-warp');
      await page.getByRole('button', { name: 'Bring them together' }).waitFor({ timeout: 10000 });
      await page.mouse.up();
      await inside('.beyond-ripples-card', { maxWidth: 340 });
      assert.equal(await page.getByRole('button', { name: 'Bring them together' }).evaluate(el => el === document.activeElement), true, 'focus moves to the card on arrival');
      for (const button of await page.locator('.beyond-ripples-card button:visible').all()) {
        const box = await button.boundingBox();
        assert.ok(box.width >= 48 && box.height >= 48, 'small ripples control');
      }
      await shot('beyond-arrived');
      await page.getByRole('button', { name: 'Bring them together' }).click();
      await page.waitForTimeout(7000);
      await shot('beyond-merging');
      await page.getByRole('button', { name: 'Replay' }).waitFor({ timeout: 12000 });
      const cardBox = await page.locator('.beyond-ripples-card').boundingBox();
      const tapX = width >= 720 ? Math.round((cardBox.x + cardBox.width + width) / 2) : Math.round(width / 2);
      await page.mouse.click(tapX, Math.round(Math.min(height * 0.42, cardBox.y - 30)));
      await page.waitForTimeout(600);
      await shot('beyond-settled-tap');
      await page.getByRole('button', { name: 'Back to the Solar System' }).click();
      await page.getByRole('button', { name: 'More things to do' }).waitFor({ timeout: 10000 });
      assert.equal(await page.locator('.beyond-ripples-card, .beyond-warp, .beyond-picker').count(), 0, 'Beyond UI cleared on return');
      await page.waitForTimeout(1500);
      assert.equal(await page.getByRole('button', { name: 'More things to do' }).evaluate(el => el === document.activeElement), true, 'focus returns to More');
      // A second trip builds everything afresh (the first trip's warp was freed).
      await page.getByRole('button', { name: 'More things to do' }).click();
      await page.getByRole('button', { name: 'Warp to Beyond' }).click();
      await page.getByRole('button', { name: /Space ripples/ }).click();
      await hold.waitFor();
      const again = await hold.boundingBox();
      await page.mouse.move(again.x + again.width / 2, again.y + again.height / 2);
      await page.mouse.down();
      await page.getByRole('button', { name: 'Bring them together' }).waitFor({ timeout: 10000 });
      await page.mouse.up();
      await shot('beyond-second-trip');
      await page.getByRole('button', { name: 'Back to the Solar System' }).click();
      await page.getByRole('button', { name: 'More things to do' }).waitFor({ timeout: 10000 });
      await page.waitForTimeout(800);
      await shot('beyond-home');
      assert.equal(await page.locator('canvas').count(), 1, 'Beyond draws on the main renderer');
      assert.deepEqual(errors, [], `runtime errors at ${width}/${theme}`);
      results.push({ width, height, theme, warpProgressAt2_5s: progress });
      await context.close(); continue;
    }

    if (settingsOnly) {
      const pane = page.locator('.solar-tuning');
      const collapsed = await inside('.solar-tuning', { maxWidth: 232 });
      assert.ok(collapsed.height < 48, 'tuning starts as a compact collapsed bar');
      await pane.getByRole('button', { name: 'Fine tuning', exact: true }).click();
      await page.waitForTimeout(250);
      const expanded = await inside('.solar-tuning');
      assert.ok(expanded.height > 140, 'tuning expands to its closed folders');
      assert.equal(await pane.locator('input[type="checkbox"]').count(), 0, 'all boolean bindings moved out of tuning');
      for (const label of ['Navigation', 'Focus', 'Stop Following', 'Reset View', 'Start Guided Tour', 'Orbit Speed', 'Asteroid Belt']) {
        assert.equal(await pane.getByText(label, { exact: true }).count(), 0, `${label} is not duplicated in tuning`);
      }
      await shot('settings-tuning');
      await page.getByRole('button', { name: 'My view settings', exact: true }).click();
      await inside('#solar-settings-panel');
      assert.equal(await page.getByRole('switch').count(), 10, 'nine view switches and debug Bloom');
      await page.waitForTimeout(250);
      await shot('settings-drawer');
      for (const label of ['Planet tilt', 'Galaxy background', 'Sun glow', 'Asteroid belt']) {
        const toggle = page.getByRole('switch', { name: new RegExp(label) });
        assert.equal(await toggle.getAttribute('aria-checked'), 'true');
        await toggle.click();
        assert.equal(await toggle.getAttribute('aria-checked'), 'false');
      }
      await page.getByRole('switch', { name: /Bloom/ }).click();
      assert.equal(await page.getByRole('switch', { name: /Bloom/ }).getAttribute('aria-checked'), 'true');
      await page.getByRole('switch', { name: /Bloom/ }).click();
      assert.equal(await page.getByRole('switch', { name: /Bloom/ }).getAttribute('aria-checked'), 'false');
      await page.getByRole('button', { name: /Reset Solar System/ }).click();
      assert.ok((await pane.boundingBox()).height < 48, 'Reset keeps tuning collapsed');
      await page.reload();
      await page.waitForFunction(() => document.querySelector('[aria-label="Fly the rocket"]')?.disabled === false);
      await page.getByRole('button', { name: 'My view settings', exact: true }).click();
      for (const label of ['Planet tilt', 'Galaxy background', 'Sun glow', 'Asteroid belt']) {
        assert.equal(await page.getByRole('switch', { name: new RegExp(label) }).getAttribute('aria-checked'), 'false', `${label} survives Reset and reload`);
      }
      assert.equal(await page.getByRole('switch', { name: /Bloom/ }).getAttribute('aria-checked'), 'false', 'debug Bloom stays session-only');
      assert.deepEqual(errors, [], `settings runtime errors at ${width}/${theme}`);
      results.push({ width, height, theme, errors: errors.length });
      await context.close();
      continue;
    }

    if (!constellationsOnly && !dotsOnly) {
    await page.getByRole('button', { name: /Missions/ }).click();
    await inside('.solar-missions-dialog', { maxWidth: 440 });
    await shot('missions');
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    }

    await page.getByRole('button', { name: 'More things to do' }).click();

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

    const search = page.getByRole('combobox', { name: 'Search the Solar System' });
    if (!await search.isVisible()) await page.getByRole('button', { name: 'Search the Solar System', exact: true }).click();
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
    await page.getByRole('button', { name: 'Orbit Earth', exact: true }).click();
    await page.getByRole('button', { name: 'Leave orbit around Earth' }).waitFor();
    await inside('.solar-orbit-control');
    assert.equal(await page.locator('.solar-info-card__body').isVisible(), false, 'orbit leaves the planet visible');
    await page.getByRole('button', { name: 'Show planet facts' }).click();
    assert.equal(await page.locator('.solar-info-card__body').isVisible(), true);
    await page.getByRole('button', { name: 'Hide planet facts' }).click();
    await page.keyboard.press('c');
    await page.locator('.solar-cockpit').waitFor({ state: 'visible' });
    await page.waitForTimeout(normalMotion ? 1500 : 80);
    await shot('planet-orbit-cockpit');
    await page.keyboard.press('c');
    await page.locator('.solar-cockpit').waitFor({ state: 'hidden' });
    await page.waitForTimeout(normalMotion ? 1500 : 80);
    await shot('planet-orbit-behind');
    await page.getByRole('button', { name: 'Leave orbit around Earth' }).click();
    await page.getByRole('button', { name: 'Hide Earth information' }).click();

    if (normalMotion) {
      const searchForFlight = page.getByRole('combobox', { name: 'Search the Solar System' });
      if (!await searchForFlight.isVisible()) await page.getByRole('button', { name: 'Search the Solar System', exact: true }).click();
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

    await page.getByRole('button', { name: 'Tour the Solar System', exact: true }).click();
    await page.getByRole('button', { name: 'Orbit Mercury', exact: true }).click();
    await page.getByRole('button', { name: 'Leave orbit around Mercury' }).waitFor();
    await inside('.solar-orbit-control');
    await page.waitForTimeout(normalMotion ? 1500 : 80);
    await shot('tour-orbit');
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await page.getByRole('button', { name: 'Leave orbit around Mercury' }).waitFor({ state: 'hidden' });
    await page.getByRole('button', { name: 'Orbit Venus', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Hide Venus information' }).click();

    await page.getByRole('button', { name: 'Fly the rocket', exact: true }).click();
    const hudBox = await inside('.solar-flight__top', { maxWidth: 340 });
    assert.ok(hudBox.height <= 370, `flight HUD too tall: ${hudBox.height}`);
    assert.equal(await page.getByText('Practice game', { exact: true }).count(), 0);
    await page.getByRole('button', { name: 'Orbit Earth', exact: true }).click();
    await page.getByRole('button', { name: 'Leave orbit around Earth' }).waitFor();
    await inside('.solar-orbit-control');
    await page.waitForTimeout(normalMotion ? 1500 : 80);
    await shot('manual-orbit');
    await page.getByRole('button', { name: 'Leave orbit around Earth' }).click();
    await page.getByRole('button', { name: 'Orbit Earth', exact: true }).click();
    await page.keyboard.down('d');
    await page.getByRole('button', { name: 'Leave orbit around Earth' }).waitFor({ state: 'hidden' });
    await page.keyboard.up('d');
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
