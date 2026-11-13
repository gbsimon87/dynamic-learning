# SEO and public pages

Public pages must be readable without JavaScript; private screens stay out of
search. Source decides behaviour; this page names the moving parts.

## How it works

- **Prerendering.** `npm run build` runs [scripts/prerender.js](../scripts/prerender.js),
  which renders the anonymous public pages through
  [src/seo/entry-server.jsx](../src/seo/entry-server.jsx) into `dist/prerendered/`.
  `dist/app.html` is the private SPA shell. The build fails if a public page has
  no heading or links. No runtime SSR service exists.
- **Catalogue and metadata.** [shared/seo.js](../shared/seo.js) decides public URL
  eligibility, titles, descriptions, canonicals, JSON-LD, sitemap and robots.
  [server/seo.js](../server/seo.js) writes the head into the HTTP response;
  [PageMetadata.jsx](../src/seo/PageMetadata.jsx) updates it after SPA navigation.
  Absolute URLs come from validated `PUBLIC_APP_URL`, never the request host.
  Initial JSON-LD is allowed by an exact SHA-256 CSP hash: changing it changes
  the hash.
- **Public content.** Skills guides (`/learn/<slug>`) come from
  [skillsCatalog.js](../shared/skillsCatalog.js) and
  [skillGuides.js](../shared/skillGuides.js); year/subject overviews
  (`/what-we-teach`, `/curriculum-guide/<year>-<subject>`) from
  [curriculumGuides.js](../shared/curriculumGuides.js); parent guides from
  [parentExplainers.js](../shared/parentExplainers.js) (indexed only once reviewed).
- **Indexing policy.** Playable games, login/signup/recovery, profiles,
  parent/trophies, curriculum challenges, daily puzzle, teacher planning,
  credits and the draft privacy notice carry `noindex, follow` in headers and
  HTML; APIs `noindex, nofollow`. robots.txt allows crawling those pages so the
  directive is seen. `SEO_INDEXABLE=false` (default, dev) makes everything
  noindex with an empty sitemap. Noindex is not access control.
- **HTTP behaviour** ([server/app.js](../server/app.js)). API routes first; public
  routes get their prerendered document; app routes the shell; unknown URLs and
  invalid curriculum URLs (checked against the build manifest, without touching
  progress) get a real 404. Slash/case variants and `/index.html` 308-redirect,
  keeping query strings. Public HTML revalidates; private HTML and API use
  `no-store`; hashed assets are immutable for a year.
- **Performance.** Routes are lazy-loaded in [main.jsx](../src/main.jsx) so 3D,
  map and curriculum chunks stay off the homepage; keep new heavy features lazy.

Adding a Skills game means adding its catalogue entry and guide together
([SKILLS_AUTHORING.md](SKILLS_AUTHORING.md)). Making a playable game URL
indexable is a deliberate change: add it to `shared/seo.js` with a useful
anonymous initial view, choose its canonical, and update `shared/seo.test.js`,
`server/seo.test.js` and `scripts/checkSeo.js` (they currently expect games to
be noindex).

## Checks

`npm run build` then `npm run check:seo`: starts the built Express app with an
indexable configuration and local Chrome (`CHROME_PATH` if elsewhere), checks
real HTTP HTML, one h1 per page, metadata, a crawl graph from the homepage and
screenshots in `.seo-artifacts/`. Vite preview does not reproduce production
routing. Local checks do not replace live checks.

## Open owner checks

Not recorded as done; tick off by deleting the line.

- **Game-page indexing decision.** In Search Console, check whether original game
  URLs (`/number-bonds`, `/flag-finder`, `/speed-reader`…) have clicks,
  impressions or known links. If they do, keep them indexable (above);
  otherwise keep the guide-only policy. Missing data is not zero traffic.
- **Live production checks.** On `https://learnwithbix.com`: View Source on `/`,
  `/skills`, a `/learn/` guide, `/what-we-teach` and a curriculum guide shows
  content, one canonical, `index, follow`, matching `og:url` and JSON-LD; works
  with JavaScript disabled; sitemap/robots/redirects/404s/cache headers correct;
  private pages absent from the sitemap. Dev stays noindex with an empty sitemap.
- **Search engines.** Submit `/sitemap.xml` in Google Search Console and Bing
  Webmaster Tools; URL-inspect representative pages; recheck indexing weekly
  for the first month. Validate JSON-LD with the Rich Results Test.
- **Phone performance.** PageSpeed Insights (Mobile) for the homepage, `/skills`
  and one guide, twice each, plus a real phone on mobile data. Targets: LCP
  ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Confirm br/gzip transfer and that 3D/map
  chunks do not load on the homepage.
