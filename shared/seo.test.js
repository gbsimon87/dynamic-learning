import test from 'node:test';
import assert from 'node:assert/strict';
import { PUBLIC_PATHS, getPageSeo, renderSitemap, renderRobots, renderSeoHead, serialiseJsonLd, validateOrigin } from './seo.js';
import { SKILL_GUIDES } from './skillGuides.js';

test('public catalogue contains unique descriptions and canonicals for every guide', () => {
  const pages = PUBLIC_PATHS.map(path => getPageSeo(path));
  assert.equal(new Set(pages.map(page => page.title)).size, pages.length);
  assert.equal(new Set(pages.map(page => page.description)).size, pages.length);
  assert.equal(new Set(pages.map(page => page.canonical)).size, pages.length);
  for (const page of pages) {
    assert.equal(page.robots, 'index, follow');
    assert.equal(page.exists, true);
    assert.ok(page.structuredData['@graph'].length > 0);
  }
  for (const guide of SKILL_GUIDES) assert.equal(getPageSeo(guide.to).robots, 'noindex, follow', 'game controls have a dedicated public guide');
});

test('private, utility, unknown and staging pages are excluded without blocking public navigation', () => {
  for (const path of ['/login', '/reset-password', '/parent', '/parent/trophies/example', '/year/2/math/problem/a/b/1', '/privacy', '/credits', '/daily-puzzle', '/missing-page']) {
    assert.equal(getPageSeo(path).robots, 'noindex, follow');
  }
  assert.equal(getPageSeo('/missing-page').canonical, null);
  assert.equal(getPageSeo('/skills', { indexable: false }).robots, 'noindex, follow');
  assert.equal(getPageSeo('/skills/').canonical, 'https://learnwithbix.com/skills');
  assert.equal(renderRobots({ indexable: false }), 'User-agent: *\nDisallow: /\n');
  assert.ok(!renderRobots().includes('Disallow: /login'), 'crawlers can read noindex on app pages');
});

test('sitemap is generated only from public canonical URLs without fictional modification dates', () => {
  const sitemap = renderSitemap('https://example.com');
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, PUBLIC_PATHS.length);
  for (const path of PUBLIC_PATHS) assert.ok(sitemap.includes(`<loc>https://example.com${path}</loc>`));
  for (const value of ['lastmod', '/login', '/parent', '/year/', '<loc>https://example.com/flag-finder</loc>']) assert.ok(!sitemap.includes(value));
});

test('fixed-origin SEO rejects unsafe configuration and safely serialises JSON-LD and HTML', () => {
  for (const origin of ['java' + 'script:alert(1)', 'https://user:password@example.com', 'https://example.com/path', 'https://example.com/?x=y', 'https://example.com/#test']) assert.throws(() => validateOrigin(origin));
  const data = serialiseJsonLd({ name: '</script><script>alert(1)</script>' });
  assert.ok(!data.includes('<'));
  assert.equal(JSON.parse(data).name, '</script><script>alert(1)</script>');
  const head = renderSeoHead({ ...getPageSeo('/'), title: 'A "quote" & <tag>' });
  assert.ok(head.includes('A &quot;quote&quot; &amp; &lt;tag&gt;'));
  assert.equal((head.match(/rel="canonical"/g) ?? []).length, 1);
});

 test('curriculum overview breadcrumbs stay in the public curriculum guides', () => {
  const hub = getPageSeo('/what-we-teach').structuredData['@graph'].find(item => item['@type'] === 'BreadcrumbList');
  const guide = getPageSeo('/curriculum-guide/year-3-maths').structuredData['@graph'].find(item => item['@type'] === 'BreadcrumbList');
  assert.deepEqual(hub.itemListElement.map(item => item.name), ['Home', 'What we teach']);
  assert.deepEqual(guide.itemListElement.map(item => item.name), ['Home', 'What we teach', 'Year 3 Maths']);
  assert.equal(guide.itemListElement[2].item, 'https://learnwithbix.com/curriculum-guide/year-3-maths');
});
