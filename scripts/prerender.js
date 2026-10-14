import { mkdir, readFile, readdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, loadEnv } from 'vite';
import { PUBLIC_ORIGIN, PUBLIC_PATHS, getPageSeo, renderSeoHead, renderSitemap, renderRobots, validateOrigin } from '../shared/seo.js';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const origin = validateOrigin(env.PUBLIC_APP_URL || PUBLIC_ORIGIN);
const indexable = env.SEO_INDEXABLE === 'true';
const dist = path.resolve('dist');
const ssrOutput = path.resolve('dist-ssr/seo-renderer');
try {
  await build({ logLevel: 'error', build: { ssr: 'src/seo/entry-server.jsx', outDir: ssrOutput, emptyOutDir: true, copyPublicDir: false, manifest: false } });
  const { renderPublicPage, curriculumPaths } = await import(pathToFileURL(path.join(ssrOutput, 'entry-server.js')));
  const font = (await readdir(path.join(dist, 'assets'))).find(name => /^abeezee-latin-400-normal-.*\.woff2$/.test(name));
  const template = (await readFile(path.join(dist, 'index.html'), 'utf8'))
    .replace('<html lang="en-GB">', `<html lang="en-GB" data-seo-origin="${origin}" data-seo-indexable="${indexable}">`)
    .replace('</head>', `${font ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />\n` : ''}</head>`);
  if (!template.includes('<div id="root"></div>') || !template.includes('<!-- SEO:START -->')) throw new Error('Prerendering requires a fresh Vite build; run npm run build.');
  await writeFile(path.join(dist, 'app.html'), template);
  await mkdir(path.join(dist, 'prerendered'), { recursive: true });
  for (const pathname of PUBLIC_PATHS) {
    const content = renderPublicPage(pathname);
    if (!content.includes('<h1') || !content.includes('href="')) throw new Error(`Missing public content for ${pathname}`);
    const html = template.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, `<!-- SEO:START -->\n${renderSeoHead(getPageSeo(pathname, { origin, indexable }))}\n<!-- SEO:END -->`)
      .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
    const filename = pathname === '/' ? 'home' : pathname.slice(1).replaceAll('/', '--');
    await writeFile(path.join(dist, 'prerendered', `${filename}.html`), html);
    if (pathname === '/') await writeFile(path.join(dist, 'index.html'), html);
  }
  await writeFile(path.join(dist, 'route-manifest.json'), JSON.stringify(curriculumPaths()));
  await writeFile(path.join(dist, 'sitemap.xml'), indexable ? renderSitemap(origin) : '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>');
  await writeFile(path.join(dist, 'robots.txt'), renderRobots({ origin, indexable }));
  console.log(`Prerendered ${PUBLIC_PATHS.length} public pages (${indexable ? 'indexable' : 'noindex'}).`);
} finally {
  await rm(ssrOutput, { recursive: true, force: true });
}
