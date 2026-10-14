import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createApp } from './app.js';
import { PUBLIC_PATHS } from '../shared/seo.js';

async function fixture(t, indexable = true) {
  const dist = await mkdtemp(path.join(tmpdir(), 'bix-seo-test-'));
  await mkdir(path.join(dist, 'prerendered'));
  await mkdir(path.join(dist, 'assets'));
  const template = '<!doctype html><html lang="en-GB"><head><!-- SEO:START --><title>Shell</title><!-- SEO:END --></head><body><div id="root"></div></body></html>';
  await writeFile(path.join(dist, 'app.html'), template);
  for (const pathname of PUBLIC_PATHS) {
    const filename = pathname === '/' ? 'home' : pathname.slice(1).replaceAll('/', '--');
    await writeFile(path.join(dist, 'prerendered', `${filename}.html`), template.replace('<div id="root"></div>', '<div id="root"><h1>Useful public content</h1><a href="/skills">Skills</a></div>'));
  }
  await writeFile(path.join(dist, 'route-manifest.json'), JSON.stringify(['/curriculum/year/2/math', '/year/2/math/problem/number/counting/1']));
  await writeFile(path.join(dist, 'assets', 'app-12345678.js'), 'console.log("asset")');
  const mailer = { verification: 'off' };
  const app = createApp({ serveStatic: true, dist, seo: { origin: 'https://learnwithbix.com', indexable }, trustProxy: 1, signup: { mailer }, recovery: { mailer } });
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
  t.after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); await rm(dist, { recursive: true, force: true }); });
  return (pathname, options) => fetch(`http://127.0.0.1:${server.address().port}${pathname}`, { redirect: 'manual', ...options });
}

test('public HTTP responses deliver content and complete unique metadata before JavaScript', async t => {
  const request = await fixture(t);
  for (const pathname of PUBLIC_PATHS) {
    const response = await request(pathname);
    const html = await response.text();
    assert.equal(response.status, 200, pathname);
    assert.ok(html.includes('<h1>Useful public content</h1>'));
    assert.ok(html.includes('name="robots" content="index, follow"'));
    assert.ok(html.includes(`rel="canonical" href="https://learnwithbix.com${pathname}"`));
    assert.ok(html.includes('property="og:image"'));
    assert.ok(html.includes('name="twitter:card"'));
    assert.ok(html.includes('type="application/ld+json"'));
    assert.ok(response.headers.get('content-security-policy').includes("'sha256-"));
  }
  assert.equal((await request('/skills', { method: 'HEAD' })).status, 200);
});

test('missing routes/assets and internal build files return 404, while real private paths remain usable', async t => {
  const request = await fixture(t);
  for (const pathname of ['/does-not-exist', '/learn/does-not-exist', '/assets/missing.js', '/prerendered/home.html', '/PRERENDERED/home.html', '/prerendered%2fhome.html', '/app.html', '/route-manifest.json', '/year/2/math/problem/invalid/invalid/999']) {
    const response = await request(pathname);
    assert.equal(response.status, 404, pathname);
    const html = await response.text();
    assert.ok(html.includes('We can’t find that page'), pathname);
    assert.ok(!html.includes('rel="canonical"'), '404 has no canonical pointing to a valid URL');
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
  }
  for (const pathname of ['/login', '/signup', '/profiles', '/parent', '/reset-password?token=secret', '/curriculum/year/2/math', '/year/2/math/problem/number/counting/1', '/parent/trophies/example']) {
    const response = await request(pathname);
    assert.equal(response.status, 200, pathname);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
    assert.ok(!(await response.text()).includes('secret'), 'recovery token never enters metadata');
  }
  const unknownApi = await request('/api/missing');
  assert.equal(unknownApi.status, 404);
  assert.deepEqual(await unknownApi.json(), { error: 'NOT_FOUND' });
  assert.equal(unknownApi.headers.get('x-robots-tag'), 'noindex, nofollow');
});

test('permanent redirects normalise public URLs and preserve recovery parameters', async t => {
  const request = await fixture(t);
  for (const [pathname, location] of [['/skills/?utm_source=test', '/skills?utm_source=test'], ['/SKILLS', '/skills'], ['/index.html', '/'], ['/reset-password/?token=keep-me', '/reset-password?token=keep-me']]) {
    const response = await request(pathname);
    assert.equal(response.status, 308, pathname);
    assert.equal(response.headers.get('location'), location);
  }
  const alias = await request('/skills?utm_source=example', { headers: { 'X-Forwarded-Host': 'www.learnwithbix.com', 'X-Forwarded-Proto': 'https' } });
  assert.equal(alias.status, 308);
  assert.equal(alias.headers.get('location'), 'https://learnwithbix.com/skills?utm_source=example');
  const hostSpoof = await request('/skills', { headers: { Host: 'attacker.example' } });
  assert.ok(!(await hostSpoof.text()).includes('attacker.example'));
});

test('sitemap/robots use the fixed origin; hashed assets cache; staging is excluded', async t => {
  const request = await fixture(t);
  const sitemap = await request('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  assert.ok(sitemap.headers.get('content-type').includes('application/xml'));
  assert.equal(((await sitemap.text()).match(/<loc>/g) ?? []).length, PUBLIC_PATHS.length);
  assert.ok((await (await request('/robots.txt')).text()).includes('Sitemap: https://learnwithbix.com/sitemap.xml'));
  assert.equal((await request('/assets/app-12345678.js')).headers.get('cache-control'), 'public, max-age=31536000, immutable');
  const staging = await fixture(t, false);
  assert.equal((await staging('/')).headers.get('x-robots-tag'), 'noindex, follow');
  assert.equal(await (await staging('/robots.txt')).text(), 'User-agent: *\nDisallow: /\n');
  assert.ok(!(await (await staging('/sitemap.xml')).text()).includes('<loc>'));
  assert.equal((await staging('/assets/app-12345678.js')).headers.get('x-robots-tag'), 'noindex, nofollow');
});
