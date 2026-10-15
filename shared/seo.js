import { SKILL_GUIDES } from './skillGuides.js';
import { CURRICULUM_GUIDES } from './curriculumGuides.js';

export const PUBLIC_ORIGIN = 'https://learnwithbix.com';
export const PUBLIC_PATHS = ['/', '/skills', '/what-we-teach', ...CURRICULUM_GUIDES.map(guide => guide.path), ...SKILL_GUIDES.map(guide => guide.path)];
export const APP_PAGES = {
  '/login': 'Sign in', '/signup': 'Create an account', '/forgot-password': 'Reset your password',
  '/reset-password': 'Choose a new password', '/profiles': 'Learner profiles', '/parent': 'Parent area',
  '/curriculum': 'Choose your curriculum', '/trophies': 'Trophy room', '/hello': 'Meet Bix',
  '/daily-puzzle': 'Daily puzzle', '/credits': 'Credits', '/privacy': 'Privacy',
};

export function normalisePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

export function validateOrigin(value = PUBLIC_ORIGIN) {
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('PUBLIC_APP_URL must be an http(s) origin without credentials, a path, query or fragment');
  }
  return url.origin;
}

export function getPageSeo(pathname, { origin = PUBLIC_ORIGIN, indexable = true } = {}) {
  origin = validateOrigin(origin);
  const path = normalisePath(pathname);
  const guide = SKILL_GUIDES.find(item => item.path === path || item.to === path);
  const curriculumGuide = CURRICULUM_GUIDES.find(item => item.path === path);
  const isPublic = PUBLIC_PATHS.includes(path);
  let name = APP_PAGES[path];
  let description = 'Learning games and curriculum challenges with Learn with Bix.';
  if (path === '/') {
    name = 'Primary School Learning Games & UK Curriculum';
    description = 'Explore Maths, English, Science, History and Geography with Learn with Bix. Play skill games or follow a UK primary curriculum learning path.';
  } else if (path === '/what-we-teach') {
    name = 'What We Teach';
    description = 'Explore Years 1–4 Maths, English, Geography, Science and History with Bix. See each learning path’s topics and find out how to get started.';
  } else if (curriculumGuide) {
    name = `${curriculumGuide.label}: Topics & Learning Path`;
    description = `${curriculumGuide.intro} Explore ${curriculumGuide.label} with Bix before signing up.`;
  } else if (path === '/skills') {
    name = 'Maths, English & Geography Learning Games';
    description = `Explore ${SKILL_GUIDES.length} learning games for primary school children. Practise numbers, words, shapes and geography with Learn with Bix.`;
  } else if (guide) {
    name = `${guide.label} – ${guide.subject} ${isPublic ? 'Learning Guide' : 'Practice'}`;
    description = `${guide.description} ${isPublic ? 'Find out how to play with Learn with Bix.' : 'Play with Learn with Bix.'}`;
  } else if (/^\/curriculum\/year\/[^/]+\/[^/]+$/.test(path)) {
    const [, , , year, subject] = path.split('/');
    name = `Year ${year} ${subject} Curriculum`;
  } else if (path.startsWith('/year/')) name = 'Curriculum challenge';
  else if (path.startsWith('/parent/trophies/')) name = 'Learner trophies';
  const exists = Boolean(name);
  const canonical = exists ? `${origin}${path}` : null;
  const robots = indexable && isPublic ? 'index, follow' : 'noindex, follow';
  const title = `${name || 'Page not found'} | Learn with Bix`;
  const graph = [];
  if (isPublic) {
    graph.push({ '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'Learn with Bix', inLanguage: 'en-GB' });
    graph.push({ '@type': guide ? 'LearningResource' : path === '/skills' ? 'CollectionPage' : 'WebPage',
      '@id': `${canonical}#page`, url: canonical, name: title, description, inLanguage: 'en-GB',
      isPartOf: { '@id': `${origin}/#website` },
      ...(guide ? { learningResourceType: 'Game guide', educationalUse: 'Practice', teaches: guide.skills } : {}),
    });
    if (path !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: path === '/what-we-teach' || path.startsWith('/curriculum-guide/') ? 'What we teach' : 'Skills', item: `${origin}${path === '/what-we-teach' || path.startsWith('/curriculum-guide/') ? '/what-we-teach' : '/skills'}` },
      ...(guide ? [{ '@type': 'ListItem', position: 3, name: guide.label, item: canonical }] : curriculumGuide ? [{ '@type': 'ListItem', position: 3, name: curriculumGuide.label, item: canonical }] : []),
    ] });
  }
  return { title, description, canonical, robots, isPublic, exists,
    image: `${origin}/social-card.png`,
    structuredData: graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null };
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

export function serialiseJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function renderSeoHead(seo) {
  const meta = (name, content, property = false) => `<meta data-seo ${property ? 'property' : 'name'}="${name}" content="${escapeHtml(content)}" />`;
  return [
    `<title data-seo>${escapeHtml(seo.title)}</title>`, meta('description', seo.description), meta('robots', seo.robots),
    ...(seo.canonical ? [`<link data-seo rel="canonical" href="${escapeHtml(seo.canonical)}" />`, meta('og:url', seo.canonical, true)] : []),
    meta('og:type', 'website', true), meta('og:site_name', 'Learn with Bix', true), meta('og:locale', 'en_GB', true),
    meta('og:title', seo.title, true), meta('og:description', seo.description, true), meta('og:image', seo.image, true),
    meta('og:image:width', '1200', true), meta('og:image:height', '630', true),
    meta('og:image:alt', 'Learn with Bix — learning games and curriculum adventures', true),
    meta('twitter:card', 'summary_large_image'), meta('twitter:title', seo.title), meta('twitter:description', seo.description),
    meta('twitter:image', seo.image), meta('twitter:image:alt', 'Learn with Bix — learning games and curriculum adventures'),
    ...(seo.structuredData ? [`<script data-seo id="seo-jsonld" type="application/ld+json">${serialiseJsonLd(seo.structuredData)}</script>`] : []),
  ].join('\n');
}

export function renderSitemap(origin = PUBLIC_ORIGIN) {
  const base = validateOrigin(origin);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PUBLIC_PATHS.map(path => `  <url><loc>${escapeHtml(`${base}${path}`)}</loc></url>`).join('\n')}\n</urlset>\n`;
}

export function renderRobots({ origin = PUBLIC_ORIGIN, indexable = true } = {}) {
  // Do not disallow noindex HTML pages: crawlers must be able to see noindex.
  return indexable
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /prerendered/\nDisallow: /app.html\nSitemap: ${validateOrigin(origin)}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';
}
