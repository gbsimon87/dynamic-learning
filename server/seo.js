import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { APP_PAGES, PUBLIC_ORIGIN, PUBLIC_PATHS, getPageSeo, normalisePath, renderRobots, renderSeoHead, renderSitemap, serialiseJsonLd, validateOrigin } from '../shared/seo.js';
import { SKILL_GUIDES } from '../shared/skillGuides.js';
import { CONTENT_SECURITY_POLICY } from './security.js';

export function createSeoMiddleware({ dist, origin = process.env.PUBLIC_APP_URL || PUBLIC_ORIGIN, indexable = process.env.SEO_INDEXABLE === 'true', fallback = false } = {}) {
  origin = validateOrigin(origin);
  const originUrl = new URL(origin);
  const aliases = new Set([originUrl.hostname, `www.${originUrl.hostname}`, process.env.RENDER_EXTERNAL_HOSTNAME].filter(Boolean));
  const files = new Map();
  const file = name => {
    if (!files.has(name)) files.set(name, readFile(path.join(dist, name), 'utf8').catch(error => { files.delete(name); throw error; }));
    return files.get(name);
  };
  const knownPaths = new Set([...PUBLIC_PATHS, ...Object.keys(APP_PAGES), ...SKILL_GUIDES.map(guide => guide.to)]);
  return async (req, res, next) => {
    if (!['GET', 'HEAD'].includes(req.method)) return next();
    let pathname;
    try { pathname = normalisePath(path.posix.normalize(decodeURIComponent(req.path))); }
    catch { return sendPage(req, res, '/__not-found__', false).catch(next); }
    if (fallback) return sendPage(req, res, '/__not-found__', false).catch(next);
    if (['/robots.txt', '/sitemap.xml'].includes(pathname)) {
      res.set('Cache-Control', 'public, max-age=300');
      if (!indexable) res.set('X-Robots-Tag', 'noindex, nofollow');
      return res.type(pathname === '/robots.txt' ? 'text/plain' : 'application/xml').send(pathname === '/robots.txt'
        ? renderRobots({ origin, indexable })
        : indexable ? renderSitemap(origin) : '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>');
    }
    // Files generated for server use must never become duplicate public URLs.
    if (pathname.toLowerCase() === '/index.html') return res.redirect(308, `/${req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : ''}`);
    const internal = /^\/(?:prerendered(?:\/|$)|app\.html$|route-manifest\.json$)/i.test(pathname);
    if (knownPaths.has(pathname.toLowerCase())) pathname = pathname.toLowerCase();
    let known = !internal && (knownPaths.has(pathname) || /^\/parent\/trophies\/[^/]+$/.test(pathname));
    try {
      if (!known && /^\/(?:curriculum\/year|year)\//.test(pathname)) {
        known = JSON.parse(await file('route-manifest.json')).includes(pathname);
      }
      if (!known && !internal) return next(); // Static files or the final 404 handler.
      return await sendPage(req, res, known ? pathname : '/__not-found__', known);
    } catch (error) { return next(error); }
  };

  async function sendPage(req, res, pathname, known) {
    const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    // Only recognised pages redirect. Never touch API writes or recovery params.
    const redirectOrigin = indexable && aliases.has(req.hostname) && `${req.protocol}://${req.get('host')}` !== origin ? origin : '';
    if (known && (req.path !== pathname || redirectOrigin)) return res.redirect(308, `${redirectOrigin}${pathname}${query}`);
    const seo = getPageSeo(pathname, { origin, indexable });
    const filename = seo.isPublic ? `prerendered/${pathname === '/' ? 'home' : pathname.slice(1).replaceAll('/', '--')}.html` : 'app.html';
    let html = await file(filename);
    html = html.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, `<!-- SEO:START -->\n${renderSeoHead(seo)}\n<!-- SEO:END -->`)
      .replace(/<html\b[^>]*>/, `<html lang="en-GB" data-seo-origin="${origin}" data-seo-indexable="${indexable}">`);
    if (!known) html = html.replace('<div id="root"></div>', '<div id="root"><main><h1>We can’t find that page</h1><p>That link might be old, or the page may have moved.</p><a href="/">Go home</a> · <a href="/skills">Explore skill games</a></main></div>');
    if (!indexable || !seo.isPublic) res.set('X-Robots-Tag', seo.robots);
    res.set('Cache-Control', seo.isPublic && indexable ? 'public, max-age=0, must-revalidate' : 'no-store');
    // Permit this exact data block while preserving the existing strict CSP.
    if (seo.structuredData) {
      const hash = createHash('sha256').update(serialiseJsonLd(seo.structuredData)).digest('base64');
      res.set('Content-Security-Policy', CONTENT_SECURITY_POLICY.replace("script-src 'self'", `script-src 'self' 'sha256-${hash}'`));
    }
    return res.status(known ? 200 : 404).type('html').send(html);
  }
}

export function createNotFoundMiddleware({ dist, origin, indexable } = {}) {
  return createSeoMiddleware({ dist, origin, indexable, fallback: true });
}
