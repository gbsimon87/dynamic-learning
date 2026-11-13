/** Checks the built site's HTTP HTML and crawl graph, then local browser behaviour.
 * No MongoDB, account setup, email, third-party request or hosted deployment.
 * Run after npm run build; Chrome can be selected with CHROME_PATH.
 */
import assert from 'node:assert/strict';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { chromium } from 'playwright-core';
import { createApp } from '../server/app.js';
import { PUBLIC_PATHS } from '../shared/seo.js';
import { CURRICULUM_GUIDES } from '../shared/curriculumGuides.js';
import { SKILL_GUIDES } from '../shared/skillGuides.js';
import { familyFridayEdition } from '../src/data/familyFriday.js';

const dist = path.resolve('dist');
const screenshots = path.resolve('.seo-artifacts');
const mailer = { verification: 'off' };
const server = createApp({ serveStatic: true, dist, seo: { indexable: true, origin: 'https://learnwithbix.com' }, signup: { mailer }, recovery: { mailer } }).listen(0, '127.0.0.1');
let browser;
try {
  await new Promise((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const links = new Map();
  for (const pathname of PUBLIC_PATHS) {
    const response = await fetch(`${base}${pathname}`);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const { document } = new JSDOM(html).window;
    assert.equal(document.querySelectorAll('#root h1').length, 1, `one primary heading at ${pathname}`);
    assert.ok(document.querySelector('#root').textContent.trim().length > 150, `meaningful content at ${pathname}`);
    assert.equal(document.querySelector('[rel="canonical"]').href, `https://learnwithbix.com${pathname}`);
    assert.equal(document.querySelector('[name="robots"]').content, 'index, follow');
    assert.ok(JSON.parse(document.querySelector('#seo-jsonld').textContent)['@graph'].length);
    assert.ok(document.querySelector('[property="og:image"]').content.endsWith('/social-card.png'));
    links.set(pathname, [...document.querySelectorAll('#root a[href]')].map(link => link.getAttribute('href')).filter(href => PUBLIC_PATHS.includes(href)));
  }
  const discovered = new Set(['/']);
  const queue = ['/'];
  while (queue.length) for (const link of links.get(queue.shift())) if (!discovered.has(link)) { discovered.add(link); queue.push(link); }
  assert.equal(discovered.size, PUBLIC_PATHS.length, 'all public URLs must be discoverable from homepage HTML links');
  const xml = new JSDOM(await (await fetch(`${base}/sitemap.xml`)).text(), { contentType: 'application/xml' }).window.document;
  assert.equal(xml.querySelectorAll('url > loc').length, PUBLIC_PATHS.length);
  for (const loc of xml.querySelectorAll('loc')) assert.ok(PUBLIC_PATHS.includes(new URL(loc.textContent).pathname));
  assert.equal((await fetch(`${base}/social-card.png`)).headers.get('content-type'), 'image/png');
  for (const pathname of ['/missing', '/learn/missing', '/assets/missing.js', '/year/2/math/problem/missing/missing/999', '/curriculum-guide/year-7-maths', '/curriculum-guide/year-1-music']) assert.equal((await fetch(`${base}${pathname}`)).status, 404);
  for (const pathname of ['/login', '/parent', '/profiles', '/reset-password?token=example', '/number-bonds']) {
    const response = await fetch(`${base}${pathname}`);
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
  const asset = (await readdir(path.join(dist, 'assets'))).find(name => /^index-.*\.js$/.test(name));
  assert.ok((await fetch(`${base}/assets/${asset}`)).headers.get('cache-control').includes('immutable'));
  const ordinaryHtml = await (await fetch(`${base}/skills`)).text();
  const crawlerHtml = await (await fetch(`${base}/skills`, { headers: { 'User-Agent': 'Googlebot' } })).text();
  assert.equal(ordinaryHtml, crawlerHtml, 'the same HTML is served to people and crawlers');
  console.log(`HTTP verification passed: ${discovered.size} public URLs discoverable without JavaScript, sitemap, metadata, exclusions, cache and 404s.`);

  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', chromiumSandbox: true });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('404')) errors.push(message.text()); });
  const loaded = [];
  page.on('request', request => loaded.push(request.url()));
  await page.goto(base);
  await page.locator('body.light, body.dark').waitFor();
  assert.equal(await page.getByRole('link', { name: 'Start my adventure', exact: true }).getAttribute('href'), '/signup');
  assert.ok(!loaded.some(url => /SolarSystem-.*\.js/.test(url)), '3D game code must not load on the homepage');
  await page.goto(`${base}/what-we-teach`);
  await page.getByRole('link', { name: /Year 3 Maths/ }).click();
  await page.getByRole('heading', { name: 'Year 3 Maths with Bix', level: 1 }).waitFor();
  await page.getByText('See all 7 topics', { exact: true }).first().click();
  assert.ok(await page.getByText('Counting in Multiples of 4, 8, 50 and 100', { exact: true }).isVisible());
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Skills', exact: true }).click();
  await page.getByRole('heading', { name: 'Pick a game' }).waitFor();
  await page.getByRole('link', { name: 'About Make Number Bonds', exact: true }).click();
  await page.getByRole('heading', { name: 'Make Number Bonds', level: 1 }).waitFor();
  await page.getByRole('link', { name: 'Play Make Number Bonds' }).click();
  await page.getByRole('heading', { name: 'Number Bonds', exact: true, level: 1 }).waitFor();
  assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, follow');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Skills', exact: true }).click();
  await page.getByRole('heading', { name: 'Pick a game' }).waitFor();
  assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'index, follow');
  assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
  assert.equal(await page.locator('script#seo-jsonld').count(), 1);
  const missing = await page.goto(`${base}/missing`);
  assert.equal(missing.status(), 404);
  await page.getByRole('heading', { name: "We can't find that page" }).waitFor();
  await mkdir(screenshots, { recursive: true });
  for (const width of [1280, 360]) for (const theme of ['light', 'dark']) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(theme => globalThis.localStorage.setItem('theme', theme), theme);
    for (const [name, pathname] of [['home', '/'], ['skills', '/skills'], ['guide', '/learn/flag-finder'], ['overview', '/what-we-teach'], ...CURRICULUM_GUIDES.map(guide => [guide.slug, guide.path])]) {
      await page.goto(`${base}${pathname}`);
      await page.locator(`body.${theme}`).waitFor();
      assert.ok(await page.evaluate(() => globalThis.document.documentElement.scrollWidth <= globalThis.innerWidth + 1), `no horizontal overflow: ${name}/${width}/${theme}`);
      await page.screenshot({ path: path.join(screenshots, `${name}-${width}-${theme}.png`), fullPage: true });
    }
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  for (const guide of CURRICULUM_GUIDES) {
    await staticPage.goto(`${base}/what-we-teach`);
    await staticPage.getByRole('link', { name: new RegExp(guide.label) }).click();
    await staticPage.getByRole('heading', { name: `${guide.label} with Bix`, level: 1 }).waitFor();
    assert.ok((await staticPage.getByRole('main').innerText()).includes('What does Bix cover?'));
    await staticPage.locator('.curriculum-guide-area summary').first().click();
    assert.ok(await staticPage.locator('.curriculum-guide-area details[open] li').first().isVisible());
  }
  await staticPage.goto(`${base}/learn/flag-finder`);
  await staticPage.getByRole('heading', { name: 'Match Flags to Countries', level: 1 }).waitFor();
  assert.ok((await staticPage.getByRole('main').innerText()).includes('REST Countries'));
  await staticPage.goto(`${base}/skills`);
  assert.equal(await staticPage.locator('a.sk-guide-link').count(), SKILL_GUIDES.length);
  assert.deepEqual(errors, [], 'no client errors or CSP errors');
  // One batched layout/gameplay pass for the Friday invitation and finite quiz.
  // Fixed browser Date changes publication without changing real app settings.
  await page.clock.setFixedTime(new Date('2026-11-27T12:00:00Z'));
  const friday = '2026-11-27';
  const edition = familyFridayEdition(friday);
  for (const width of [360, 768, 1280]) for (const theme of ['light', 'dark']) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(theme => globalThis.localStorage.setItem('theme', theme), theme);
    const capture = async name => {
      assert.ok(await page.evaluate(() => globalThis.document.documentElement.scrollWidth <= globalThis.innerWidth + 1), `Family Friday overflow: ${name}/${width}/${theme}`);
      await page.evaluate(() => globalThis.scrollTo(0, 0));
      await page.screenshot({ path: path.join(screenshots, `family-friday-${name}-${width}-${theme}.png`), fullPage: true });
    };
    await page.goto(base);
    await page.getByRole('link', { name: /Play this week’s quiz/ }).waitFor();
    await capture('home');
    await page.getByRole('link', { name: /Play this week’s quiz/ }).click();
    await page.getByRole('button', { name: 'Start the quiz' }).waitFor();
    assert.ok(page.url().includes(`week=${friday}`));
    await capture('intro');
    await page.getByRole('button', { name: 'Start the quiz' }).click();
    for (const [index, question] of edition.questions.entries()) {
      await page.getByRole('heading', { name: question.prompt, exact: true }).waitFor();
      if (question.picture) await capture('picture');
      const value = index === 0 ? question.options.find(option => option !== question.answer) : question.answer;
      await page.getByRole('group', { name: /Choose your family/ }).getByRole('button').filter({ hasText: value }).click();
      assert.equal(await page.getByText(question.explanation, { exact: true }).count(), 0, 'explanations stay hidden before submission');
      assert.equal(await page.locator('.is-correct').count(), 0, 'choices do not reveal correctness');
      if (index === 0) await capture('choice');
      if (index === 1) {
        await page.getByRole('button', { name: 'Previous question', exact: true }).click();
        await page.getByRole('heading', { name: edition.questions[0].prompt, exact: true }).waitFor();
        assert.equal(await page.locator('.ff-option[aria-pressed="true"]').count(), 1, 'previous choice is preserved');
        await page.getByRole('button', { name: /Next question/ }).click();
        await page.getByRole('heading', { name: question.prompt, exact: true }).waitFor();
        assert.equal(await page.locator('.ff-option[aria-pressed="true"]').count(), 1, 'later choice is preserved');
      }
      await page.getByRole('button', { name: index === 4 ? /Submit quiz/ : /Next question/ }).click();
    }
    await page.getByLabel('Your family scored 4 out of 5').waitFor();
    for (const question of edition.questions) await page.getByText(question.explanation, { exact: false }).waitFor();
    await capture('results');
    await page.locator('.ff-review-card').first().screenshot({ path: path.join(screenshots, `family-friday-discovery-card-${width}-${theme}.png`) });
    // Test computed colour contrast on the new surfaces in each actual theme.
    const contrast = await page.locator('.ff-score').evaluate(element => {
      const rgb = value => value.match(/[\d.]+/g).slice(0, 3).map(Number).map(n => { const s = n / 255; return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4; });
      const luminance = values => .2126 * values[0] + .7152 * values[1] + .0722 * values[2];
      const ink = luminance(rgb(globalThis.getComputedStyle(element).color));
      const paper = luminance(rgb(globalThis.getComputedStyle(element.closest('.ff-panel')).backgroundColor));
      return (Math.max(ink, paper) + .05) / (Math.min(ink, paper) + .05);
    });
    assert.ok(contrast >= 4.5, `Family Friday score contrast: ${contrast}/${theme}`);
    const reviewContrasts = await page.locator('.ff-review-badge, .ff-review-pick dt, .ff-review-pick dd, .ff-review-category, .ff-review-discovery-label, .ff-review-chat').evaluateAll(elements => elements.map(element => {
      const rgb = value => value.match(/[\d.]+/g).slice(0, 3).map(Number).map(n => { const s = n / 255; return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4; });
      const luminance = values => .2126 * values[0] + .7152 * values[1] + .0722 * values[2];
      let background = element;
      while (background.parentElement && globalThis.getComputedStyle(background).backgroundColor === 'rgba(0, 0, 0, 0)') background = background.parentElement;
      const ink = luminance(rgb(globalThis.getComputedStyle(element).color));
      const paper = luminance(rgb(globalThis.getComputedStyle(background).backgroundColor));
      return { label: element.className || element.tagName, ratio: (Math.max(ink, paper) + .05) / (Math.min(ink, paper) + .05) };
    }));
    for (const { label, ratio } of reviewContrasts) assert.ok(ratio >= 4.5, `Family Friday review contrast: ${label}/${ratio}/${theme}`);
    await page.getByRole('link', { name: '13 November 2026' }).click();
    await page.getByText('Edition 1 · 13 November 2026', { exact: true }).waitFor();
  }
  await page.clock.setFixedTime(new Date('2026-11-28T12:00:00Z'));
  await page.goto(base);
  await page.locator('body.light, body.dark').waitFor();
  assert.equal(await page.getByRole('link', { name: /Play this week’s quiz/ }).count(), 0, 'Saturday has no homepage invitation');
  await page.goto(`${base}/skills/family-friday`);
  await page.getByRole('button', { name: 'Start the quiz' }).waitFor();
  await page.clock.setFixedTime(new Date('2026-11-26T12:00:00Z'));
  await page.goto(`${base}/skills/family-friday?week=2026-11-27`);
  await page.getByRole('heading', { name: 'That quiz isn’t available' }).waitFor();
  assert.deepEqual(errors, [], 'no Family Friday client or CSP errors');
  console.log('Family Friday passed: Friday-only homepage, five questions, editable previous choices, answers only after submission, score, archive and no overflow at 360/768/1280px in both themes.');
  console.log(`Browser verification passed: SPA navigation, gameplay, metadata, 404, no-JS pages and both themes at desktop/mobile sizes. Screenshots: ${screenshots}`);
} finally {
  if (browser) await browser.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
