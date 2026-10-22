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
  for (const pathname of ['/missing', '/learn/missing', '/assets/missing.js', '/year/2/math/problem/missing/missing/999', '/curriculum-guide/year-5-maths', '/curriculum-guide/year-1-music']) assert.equal((await fetch(`${base}${pathname}`)).status, 404);
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
  await page.getByRole('link', { name: 'About Number Bonds', exact: true }).click();
  await page.getByRole('heading', { name: 'Number Bonds', level: 1 }).waitFor();
  await page.getByRole('link', { name: 'Play Number Bonds' }).click();
  await page.getByRole('heading', { name: '🔢 Number Bonds' }).waitFor();
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
  await staticPage.getByRole('heading', { name: 'Flag Finder', level: 1 }).waitFor();
  assert.ok((await staticPage.getByRole('main').innerText()).includes('REST Countries'));
  await staticPage.goto(`${base}/skills`);
  assert.equal(await staticPage.locator('a.sk-guide-link').count(), 26);
  assert.deepEqual(errors, [], 'no client errors or CSP errors');
  console.log(`Browser verification passed: SPA navigation, gameplay, metadata, 404, no-JS pages and both themes at desktop/mobile sizes. Screenshots: ${screenshots}`);
} finally {
  if (browser) await browser.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
