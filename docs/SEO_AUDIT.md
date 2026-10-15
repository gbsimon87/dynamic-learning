# Technical SEO audit and implementation — Learn with Bix

**Date:** 14 October 2026. **Baseline:** `ebececa` on `feat/styling-changes`.
**Isolated workspace:** `/private/tmp/bix-seo-audit`, branch `codex/seo-audit`.
Concurrent Year 2 maths lesson work was excluded. These changes are local and have
not been deployed or submitted to Google/Bing.

## Assessment

Before this change, the answer to “can a crawler discover each important URL and
read meaningful content without JavaScript?” was **no**. Express returned the
same `index.html`, whose root element was empty, for every non-API URL. Public
navigation, curriculum coverage and games appeared only after React ran. Missing
URLs also returned 200, and all routes shared one title with no description,
canonical, social metadata or structured data.

The implementation makes **27 public landing URLs** discoverable through real
HTML links and readable in the initial HTTP response: `/`, `/skills`, and 25
`/learn/<game-slug>` guides. These explain existing games and link to their
original playable URLs. People and crawlers receive the same anonymous HTML.
Gameplay, account screens and progress screens retain their existing React
behaviour and URLs, and are excluded from indexing.

**Indexing policy trade-off:** game URLs such as `/number-bonds` are now
`noindex, follow`; their public search landing pages are `/learn/number-bonds`.
This is a deliberate separation of stable learning information from changing
game state, not a claim that public games are private. Before deploying, review
Search Console for existing game-page impressions, links and traffic. If those
URLs already have valuable search visibility, retain their indexability and add
equivalent, visible prerendered explanatory content to the existing game pages
instead. This audit had no Search Console access and cannot establish their
current indexing or ranking. No gameplay URL redirects to a guide: that would
change direct-play behaviour.

## Architecture actually found

| Area | Evidence and consequence |
|---|---|
| React | React 19 + Vite 7, `createRoot` in `src/main.jsx`; no existing SSR or hydration. |
| Routing | React Router 7 `createBrowserRouter`, real history paths and React `Link` elements. Links were crawlable only after rendering the SPA. |
| Hosting | Render Node Web Services, Express serves built assets and `/api` on the same origin. Production is configured as `https://learnwithbix.com`; development has a separate service. |
| Backend | `server/app.js` installs auth, children, progress, rewards, signup and recovery APIs. Unknown API routes already returned JSON 404. Frontend fallback previously returned the SPA with 200 for arbitrary paths. |
| MongoDB | Collections contain parents, children, progress, rewards and signup records. There is **no public MongoDB article/product/course catalogue** to server-render or include in a sitemap. Existing owner checks, authentication, database shapes and unlock rules were preserved. |
| Public content | Curriculum/game data lives in source files. Flag Finder fetches REST Countries; maps load local GeoJSON and map resources; Solar System uses WebGL/Three.js. These are interactive experiences, not reliable initial-HTML content sources. |
| Persistence | API storage is a build-time option; local storage remains supported. Public rendering mounts inert anonymous contexts, not auth/progress/rewards providers. It neither reads a database nor executes effects. |

Google can render JavaScript, but initial HTML reduces reliance on its rendering
queue and helps crawlers that do not execute JavaScript. That is why metadata
alone would have been insufficient. [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## Priorities, impact and effort

| Priority | Initial issue and impact | Effort | Result |
|---|---|---|---|
| P0 | Empty public HTML; no initial content or navigation for non-JS crawlers. | Medium | Build-time React rendering of homepage, skills hub and game guides. |
| P0 | Every unknown frontend URL returned 200, inviting soft 404s. | Low–medium | Real 404 responses for missing pages/assets and nonexistent curriculum paths; correct client error message. |
| P0 | No production/staging indexing distinction. | Low | Explicit production `SEO_INDEXABLE=true`; default/staging false, response headers, robots policy and empty staging sitemap. |
| P1 | One title; missing descriptions, canonical and social tags. | Low | Shared unique page metadata in initial HTML and after SPA navigation. |
| P1 | No sitemap; meaningful links required JS. | Low | XML sitemap from the public catalogue; guides linked by the prerendered hub and related-guide navigation. |
| P1 | Large eager game/account imports slowed all first visits. | Medium | Lazy route modules; retained eager lightweight public pages. |
| P1 | Duplicate slash/case/index/host URLs and query variants. | Low–medium | Permanent redirects for recognised paths; fixed-origin, query-free canonicals. |
| P2 | Missing JSON-LD and some semantic/accessibility issues. | Low | Accurate schema, labelled navigation, skip link, one main landmark; corrected nested Speed Reader main. |
| P2 | No measured field Core Web Vitals or API latency evidence. | Measurement | Bundle sizes verified; field LCP/INP/CLS and MongoDB latency remain unmeasured. |

## Code changes and how to verify them

### Public HTML and discoverable links

- `scripts/prerender.js` uses the already-installed Vite and React server renderer.
  It renders real existing `Home` and `SkillsPage` components, plus the shared
  `SkillGuide`, at build time. `npm run build` now includes this step and fails if
  a public page lacks a heading or links. No headless browser is required to build
  on Render and no runtime React SSR dependency/service was introduced.
- `src/seo/entry-server.jsx` renders anonymous public content and generates a
  manifest of valid curriculum URLs from existing datasets. The manifest is used
  for HTTP route recognition only; it does not determine unlock eligibility.
- `shared/skillsCatalog.js` holds the existing 25-game hub catalogue;
  `shared/skillGuides.js` adds game descriptions, instructions and skill lists.
  `src/seo/SkillGuide.jsx` serves these same visible descriptions in React.
- `SkillsPage.jsx` keeps every existing direct-play link and adds a separate
  48px information link labelled “About [game]”. Filters remain component state, so no new filter URL
  combinations are generated.
- Generated HTML lives under `dist/prerendered/`; `dist/app.html` is the private
  SPA shell. Express prevents direct access to internal build files. The built
  homepage also becomes `dist/index.html` for a meaningful static root preview.

**Verify:** run `npm run check:seo` after building. It checks actual HTTP HTML,
one h1 per public page, content, metadata and a crawl graph: all 27 public URLs
must be reachable from the homepage's initial links. Disable JavaScript and open
the homepage, hub and `/learn/flag-finder`; their information remains readable.
Interactive game controls still require JavaScript.

### Titles, canonical, sharing and structured data

- `shared/seo.js` centralises public URL eligibility, metadata, safe HTML/JSON-LD
  serialisation, sitemap and robots generation. `server/seo.js` supplies the head
  in the actual HTTP response; `src/seo/PageMetadata.jsx` updates it after SPA
  navigation. There is no dependency on a client-only head manager.
- Each public page has a unique title/description and one absolute canonical.
  Metadata ignores query parameters/fragments. Recovery tokens never enter
  metadata. URLs come from validated `PUBLIC_APP_URL`, never a request host.
- Open Graph and Twitter metadata include a 1200 × 630 PNG sharing card, made
  from existing Bix SVG artwork. The editable source is `public/social-card.svg`;
  the committed runtime asset is `public/social-card.png`.
- JSON-LD describes a `WebSite`, `WebPage`/`CollectionPage`/`LearningResource`, and
  breadcrumbs where appropriate. It does not invent reviews, course credentials,
  government endorsement, a search action, or aggregate ratings.
- Initial JSON-LD is allowed by an exact SHA-256 CSP hash. Existing strict script
  policy, ownership checks, API cache restrictions and write protections remain.

**Verify:** inspect **View Source** or `curl`, rather than relying only on the
post-JavaScript DOM. Check one canonical and matching `og:url` on each URL, and
confirm metadata changes when navigating hub → guide → game. Use Google's Rich
Results Test for supported features such as breadcrumbs and Schema.org's
validator for the full graph. Generic `LearningResource` markup is semantic
description, not a promise of a Google rich result. Eligibility also depends on
Google's policies and content quality. [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

### Sitemap, robots and indexing exclusions

- Production `/sitemap.xml` includes only public canonical landing URLs; it is
  generated from the same catalogue at build time and served dynamically by
  Express using runtime configuration. No invented `lastmod`, priority or
  change-frequency values are emitted.
- Production `/robots.txt` permits public pages/assets and names the absolute
  sitemap. It disallows API/internal build paths. It deliberately allows crawling
  of HTML pages carrying `noindex`, so search engines can observe that directive.
- Login/signup/recovery, profiles, parent/trophies, curriculum challenges, daily
  puzzle, gameplay, credits and the draft privacy notice carry `noindex, follow`
  in HTTP headers and HTML. APIs carry `noindex, nofollow`. These directives do
  not replace authentication or make data private; existing API authorization
  remains the security control.
- Staging/default builds are `noindex`, have an empty sitemap and disallow
  crawling. If staging URLs were previously indexed, a crawl disallow can prevent
  Google seeing a new noindex directive; use temporary crawl permission with
  noindex or authenticated staging when removing those known URLs.

**Verify:** production sitemap returns XML/200; every `<loc>` returns 200 and has
the same canonical. Validate in Search Console's Sitemaps report and Bing
Webmaster Tools. Private URLs must be absent. Inspect staging headers and source
as well as robots.txt. A sitemap aids discovery but does not guarantee indexing.
[Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### HTTP status, URL consistency and cache policy

- `server/app.js` preserves API routing before frontend handling. Public routes
  receive their prerendered document; real application routes receive their
  existing shell; unknown URLs and missing static files return HTML/404.
- Curriculum URLs are validated against the build manifest. Invalid topic or
  challenge URLs receive 404 without looking up or modifying learner progress.
  Unknown child IDs retain the existing private UI/API ownership behaviour.
- Recognised slash/case/path variants and `/index.html` redirect with 308.
  Normalisation preserves query strings, including recovery tokens. Known host
  aliases redirect to the configured origin; APIs and writes are not redirected.
  The Render alias is recognised through `RENDER_EXTERNAL_HOSTNAME` when present.
- Public HTML revalidates; private HTML and API data use `no-store`; Vite files
  with content hashes use one-year immutable caching. Other static assets use
  a shorter cache lifetime. Errors do not canonicalise to the homepage.
- `NotFound.jsx` now distinguishes a normal unmatched route from an actual
  application exception; the catch-all previously displayed “Something went
  wrong” when there was no route error.

**Verify:** GET and HEAD on missing URLs return 404; unknown `/api` routes remain
JSON/404. `/skills/` redirects to `/skills`; its query string survives. Check
HTTPS, www and the Render hostname on the live service. Localhost is intentionally
not redirected to production. Canonicals consolidate query variants rather than
using noindex as a duplicate-URL workaround. [Canonicalisation guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### Performance and accessibility

| Measured production build output | Before | After final implementation build |
|---|---:|---:|
| Main entry JavaScript | 3,052.51 kB | 1,145.71 kB |
| Main entry, gzip estimate | 701.23 kB | 224.56 kB |

The main entry shrank about **62% uncompressed / 68% gzip**. Vite's gzip values
are build estimates, not verified network transfer sizes or Core Web Vitals.
Some large route-specific chunks remain, including Solar System and curriculum
renderers; they are no longer all eager homepage dependencies.

- `src/main.jsx` lazy-loads games, account pages, trophies and curriculum views.
  Original paths, guards, named exports and providers are preserved.
- Initial public information no longer waits for API requests. Flag Finder's
  public guide remains useful even if REST Countries fails; live flags remain an
  interactive dependency rather than content required for indexing.
- The Latin regular self-hosted font is preloaded with the correct cross-origin
  mode. Existing font-display swap remains. Bix is CSS artwork with no hero image
  download; adding image lazy loading to it would not improve LCP.
- Navbar scroll tracking now uses a ref and a passive listener, avoiding a state
  update and listener replacement on every scroll. A browser-safe initial ref
  also lets the real navbar render during the build.
- Added named main navigation, keyboard skip link and a focusable main target;
  removed nested main elements in Speed Reader. Guides use h1 → h2 headings,
  theme tokens, wrapping layouts, visible focus and 48px actions.

**Verify:** compare Lighthouse/PageSpeed Insights on the same public URL and
mobile profile before/after deployment. Inspect the Network waterfall to confirm
3D/map/game chunks are absent from the homepage, font preload is reused, and
text/JavaScript transfer compression is actually enabled by hosting. No measured
LCP/INP/CLS improvement or Lighthouse score is claimed here. For field evaluation,
use the 75th-percentile thresholds: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, with mobile
and desktop assessed separately. [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).

## Rendering recommendation and trade-offs

Use **targeted SSG/prerendering inside the existing Vite + Express deployment**.
It is the smallest architecture change that serves real public HTML independently
of JavaScript. Content changes already trigger a build, so regeneration fits the
existing workflow. Express adds runtime headers, metadata/configuration and URL
handling without rendering React or querying MongoDB on every request.

Keep account/progress/games in the existing SPA. The client still uses
`createRoot`, replacing the public snapshot when it starts; this avoids forcing
browser-stored theme/session/progress state into hydration. It also means public
components do some repeated work and startup could still cause layout shift.
Measure this before introducing selective hydration with a deterministic
anonymous first render. The first snapshot is always anonymous, even for a
signed-in visitor, before normal client personalisation.

Full SSR would introduce request-time rendering, browser-global audits,
authentication/cache isolation and hydration requirements with little current
benefit: public content is not stored in MongoDB. Browser-based prerendering
would add Chrome deployment and external-API failure concerns. User-agent-based
bot rendering introduces divergent delivery and operational complexity. A Next.js
migration is unnecessary to achieve the present public-content objective.

If a public MongoDB catalogue is added later, expose only published records,
give each a stable URL, and use selective Express SSR or rebuild-triggered SSG.
Generate its sitemap from actual published records, with real modification dates,
pagination and bounded output. Missing records should return 404/410, temporary
backend failures 503, and untrusted content must be safely escaped. Do not put
children, progress, rewards, pending signups or personalised API documents into
public rendering, JSON-LD, shared caches or sitemap generation.

## Validation and rollout checklist

1. Run `npm run lint`, `npm test`, and `npm run build` in the isolated worktree.
   Run `npm run check:seo` after a build; it starts a local app without MongoDB
   and uses installed Playwright/Chrome. `CHROME_PATH` can select a browser.
2. Review `.seo-artifacts/` screenshots for homepage/hub/guide at 1280px and
   360px in both themes. Review keyboard focus and the existing direct-play flow.
3. On production, set `SEO_INDEXABLE=true` and
   `PUBLIC_APP_URL=https://learnwithbix.com` at **build and runtime**. The Blueprint
   now contains these production settings and disables indexing for development.
   A manually managed service needs the same configuration. Redeploy via the
   existing process; no deployment was performed by this audit.
4. After deployment, compare source HTML and rendered DOM on `/`, `/skills`, a
   `/learn/` guide, a game, a login page and a missing URL. Repeat with JavaScript
   disabled. Public source must include useful text, links, metadata and JSON-LD.
   For local HTTP SEO checks, use the Express app through `npm run check:seo`;
   Vite's `npm run preview` retains its development SPA fallback and does not
   reproduce the production route/status policy.
5. Verify HTTPS/www/Render-domain redirects, trailing slash redirects, sitemap
   XML, robots policies, asset cache headers and real 404s. Use GET as well as
   HEAD. Ensure recovery query strings survive normalisation.
6. In Google Search Console, verify the production domain, submit the sitemap,
   and inspect representative public URLs. Use **Test Live URL** and inspect its
   rendered HTML, screenshot, resource errors and selected canonical. Request
   indexing for a small number of key pages, then monitor Page Indexing and
   impressions over time. Submit/inspect through Bing Webmaster Tools too.
7. Run Rich Results Test against deployed guides. Validate the full JSON-LD graph
   separately. A schema validator passing is not proof of rich-result eligibility.
8. Run Lighthouse and PageSpeed Insights with a consistent mobile setup. Check
   field/CrUX data when enough data exists; Lighthouse lab checks alone do not
   establish real-user INP or an SEO ranking improvement.
9. Review historical game-page traffic before activating the noindex policy
   described above. Track public impressions/clicks and soft-404/canonical reports
   after rollout. Do not change children's data collection to obtain SEO metrics.

### Four different outcomes

| Term | What it establishes | How to check |
|---|---|---|
| Crawlable | The bot can discover/request the URL; robots/access allow it. | Initial hrefs, sitemap, robots, HTTP status and crawl logs. |
| Renderable | Meaningful content can be obtained and displayed. | Initial HTML/no-JS view; rendered HTML and resource diagnostics for CSR. |
| Indexable | The page has no indexing prohibition and provides a coherent canonical/content signal. | Status, headers/meta robots, canonical and URL Inspection. |
| Actually indexed | The search engine chose to include a URL in its index. | Search Console/Bing indexing reports; this is not guaranteed by the other three. |

## Local verification results

- `npm run lint`: passes.
- `npm test`: 1,887 unit/API tests passed, four skipped by existing
  database-dependent tests; 379 component tests passed. No production database
  was accessed.
- `npm run build`: passes, generating 27 public HTML documents. A default build
  was also checked to generate noindex output; a production-configured build
  generated indexable output.
- HTTP regression tests cover public metadata/content, private exclusions,
  sitemap/robots, fixed-origin URLs, preserved recovery queries, immutable caching,
  unknown API/frontend routes and inaccessible internal build files.
- `npm run check:seo`: passes. Actual built HTTP HTML exposes all 27 public URLs
  through the homepage crawl graph. Local Chrome checks confirmed SPA metadata,
  direct gameplay, correct 404 UI and JavaScript-disabled guides/hub. Twelve
  screenshots cover homepage/hub/guide at 1280px and 360px in both themes;
  representative screenshots and the sharing card were visually reviewed. No
  horizontal overflow, client exception or CSP error was observed.
- Search Console, Bing reports, hosted redirects/compression, Rich Results Test,
  Lighthouse/PageSpeed field metrics and live indexing have not been verified in
  this session. Search results/`site:` queries cannot establish indexing coverage.

## Longer-term opportunities

**Update (2026-10-15):** the public year/subject overviews proposed in item 1
below are now implemented for all 20 Years 1–4 subject combinations, with a
`/what-we-teach` hub. See “Public curriculum overviews (2026-10-15)” in
[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md) and the updated
[follow-up checklist](SEO_NEXT_STEPS.md). The audit and verification counts above
record the original implementation, before these pages were added.

1. Improve useful public information first: expand guides with specific supported
   examples, parent guidance and accessible alternatives. Avoid mass-producing
   thin pages just because challenge IDs exist. Add substantive public year/subject
   overviews separately from gated progress screens, using the mapped curriculum
   documents when describing statutory coverage.
2. Reduce remaining eager curriculum/reward data and large game chunks after
   measuring what the homepage actually needs. Keep progress/unlock contracts
   intact and follow the curriculum-progress skill before touching those rules.
3. Profile game interactions, 3D rendering, flags and maps on actual low-end
   mobile devices. Check image dimensions/placeholder space and external image
   caching without introducing misleading or answer-revealing text.
4. Measure production API timings/query plans using existing authorised server
   observability; retain the shared MongoClient and private response `no-store`.
   Do not cache child-specific responses publicly for a Lighthouse score.
5. Evaluate selective hydration only if measured startup work or CLS warrants
   it. Preserve browser-stored theme/session and signed-in resume behaviour.
6. Finish the reviewed privacy notice and consider making that substantive public
   document indexable. Establish editorial ownership, evidence and clear scope for
   educational content; do not imply government affiliation or full statutory
   coverage from completed challenge counts.
