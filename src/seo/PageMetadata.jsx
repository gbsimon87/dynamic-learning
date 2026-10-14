import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getPageSeo, PUBLIC_ORIGIN, serialiseJsonLd } from '../../shared/seo.js';

// Initial metadata comes from Express; this keeps it in step with SPA navigation.
// DOM text/attribute APIs avoid an HTML injection sink and extra dependencies.
export default function PageMetadata({ notFound = false }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const origin = document.documentElement.dataset.seoOrigin || PUBLIC_ORIGIN;
    const indexable = document.documentElement.dataset.seoIndexable === 'true';
    const seo = getPageSeo(notFound ? '/__not-found__' : pathname, { origin, indexable });
    document.head.querySelectorAll('[data-seo]').forEach(node => node.remove());
    document.title = seo.title;
    const add = (tag, attributes, content) => {
      const node = document.createElement(tag);
      node.setAttribute('data-seo', '');
      Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
      if (content) node.textContent = content;
      document.head.appendChild(node);
    };
    const meta = (name, content, property = false) => add('meta', { [property ? 'property' : 'name']: name, content });
    meta('description', seo.description);
    meta('robots', seo.robots);
    if (seo.canonical) {
      add('link', { rel: 'canonical', href: seo.canonical });
      meta('og:url', seo.canonical, true);
    }
    meta('og:type', 'website', true);
    meta('og:site_name', 'Learn with Bix', true);
    meta('og:locale', 'en_GB', true);
    for (const prefix of ['og', 'twitter']) {
      meta(`${prefix}:title`, seo.title, prefix === 'og');
      meta(`${prefix}:description`, seo.description, prefix === 'og');
      meta(`${prefix}:image`, seo.image, prefix === 'og');
      meta(`${prefix}:image:alt`, 'Learn with Bix — learning games and curriculum adventures', prefix === 'og');
    }
    meta('og:image:width', '1200', true);
    meta('og:image:height', '630', true);
    meta('twitter:card', 'summary_large_image');
    if (seo.structuredData) add('script', { id: 'seo-jsonld', type: 'application/ld+json' }, serialiseJsonLd(seo.structuredData));
  }, [pathname, notFound]);
  return null;
}
