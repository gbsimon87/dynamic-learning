# Learn with Bix: simple SEO follow-up checklist

Use this alongside [the technical audit](SEO_AUDIT.md). This is a guide to follow;
it does not deploy the SEO changes or change the app.

**Audience:** you are the app developer and site owner. Follow these steps
yourself; no separate developer hand-off is needed. Updated 2026-10-16.

**Suggested order:** make the game-page decision first, validate locally, deploy
to dev, release to production when ready, check the live site, then measure
speed. The year/subject overviews are already built; include them in the checks.

## Documents to use for the rollout

- **This checklist:** follow the steps below and record decisions/results in
  “Notes to keep”.
- **[SEO_AUDIT.md](SEO_AUDIT.md):** technical implementation and “Validation
  and rollout checklist”, including configuration, HTTP checks and search tools.
  Original page counts describe the initial audit; the curriculum overviews
  were added later.
- **[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md):** §6 item 17 identifies the
  live production/dev services and Blueprint setup. “Public curriculum
  overviews (2026-10-15)” documents the additional public pages.
- **[render.yaml](../render.yaml):** actual deployment configuration. Check
  production/dev branches, `PUBLIC_APP_URL`, `SEO_INDEXABLE` and build-time
  `VITE_USE_API` against the intended service before deploying.
- **[Curriculum source index](curriculum/README.md):** use the relevant statutory
  programme and topic mapping when reviewing public coverage claims.

Local verification commands are in [package.json](../package.json): run
`npm run lint`, `npm test`, `npm run build`, then `npm run check:seo`. The SEO
check uses the built Express app and local Chrome; Vite preview does not
reproduce production HTTP routing/status behaviour. Local checks do not replace
live hosting or Search Console checks.

## 1. Decide which game pages should appear in Google

**In plain English:** `noindex` means “please do not show this page in search
results.” The game still works, but people may stop finding that particular
address through Google. It does not make a page private.

Our changes currently let Google list the new explanation pages, such as
`/learn/number-bonds`, while excluding the actual game at `/number-bonds`.
We should check whether the old game addresses already bring people to the site
before making that switch live.

### Simple steps — before deployment

1. Open [Google Search Console](https://search.google.com/search-console/) and
   select `learnwithbix.com`. If it is not set up, choose **Add property →
   Domain**, enter `learnwithbix.com` without a protocol or path, and copy the
   Google verification TXT value. In Namecheap, open the domain’s DNS settings
   (Advanced DNS when Namecheap manages the DNS), add a TXT record at host `@`
   with that exact value, save, then return to Search Console and click
   **Verify**. If the domain uses other nameservers, add the record at that DNS
   provider instead. Keep existing website and email DNS records unchanged, and
   keep the verification TXT record after verification.
   [Google’s ownership-verification instructions](https://support.google.com/webmasters/answer/9008080).
2. Open **Performance → Search results**. Choose the last six months, or the
   longest period available. Open the **Pages** tab.
3. Look for original game addresses such as `/number-bonds`, `/flag-finder` and
   `/speed-reader`. Record their **clicks** and **impressions**. Clicks mean visits;
   impressions mean Google showed a result. [Google's report explanation](https://support.google.com/webmasters/answer/10268906?hl=en).
4. Paste those game addresses into the inspection bar at the top. Record whether
   Google says each is indexed. Also consider links you know schools or other
   websites have made to these games.
5. Record the results and choose a policy:

| What you find | Suggested decision |
|---|---|
| Existing games have search traffic or useful links | Keep those addresses eligible for search and add useful initial HTML there; follow the implementation steps below. |
| No established search visibility or known valuable links | The new public-guide approach may be suitable. |
| Missing data or uncertainty | Postpone excluding the original game pages until you have enough evidence. |

### Apply the indexing decision

If the guide-only approach is suitable, retain the current implementation:
`/learn/<slug>` is public and the playable game carries `noindex, follow`.

If you need to keep an original game URL searchable, make a separate code change
before production release:

1. Use `shared/skillsCatalog.js` and `shared/skillGuides.js` to identify the exact
   game and its guide. Record which original URLs you are retaining.
2. Add those game URLs to the public catalogue in `shared/seo.js`, give each
   accurate metadata, and implement an anonymous, useful initial HTML view in
   `src/seo/entry-server.jsx`. Do not server-render browser-only game effects or
   access learner state. Preserve the existing playable URL and client game.
3. Decide whether both pages offer distinct useful information. If they do,
   give each a self-canonical; if they duplicate one another, explicitly choose
   a canonical strategy. Review `getPageSeo` and JSON-LD so a game is described
   accurately rather than automatically labelled as a guide.
4. Check `scripts/prerender.js` and `server/app.js` serve the new public document.
   Update `shared/seo.test.js`, `server/seo.test.js`, component metadata tests
   and `scripts/checkSeo.js` for the changed policy. The current checks explicitly
   expect `/number-bonds` to be noindex, so do not leave that assertion unchanged
   if you retain that URL for indexing.
5. Run the local checks in section 2, inspect the resulting game source HTML and
   canonical, and confirm gameplay still works. If evidence is missing, defer
   the indexing-policy release rather than assuming zero traffic.

- [ ] I have recorded the evidence and chosen which addresses should stay searchable.

**Important:** no clicks alone does not prove a page has no value. Avoid making
the decision from a single `site:` search or assuming missing reports mean zero
traffic.

## 2. Check the live website after deployment

**In plain English:** the local version passed our checks. Now confirm that the
version visitors and Google actually receive works the same way.

### Validate locally and deploy

1. From the repository root, run each command below. Resolve failures before
   proceeding. Database-dependent tests may skip without a test MongoDB; record
   those skips rather than treating them as database coverage.

   ```sh
   npm ci --include=dev
   npm run lint
   npm test
   npm run build
   npm run check:seo
   ```

   The SEO check starts Express and Chrome locally without accessing MongoDB.
   If Chrome is installed elsewhere, run
   `CHROME_PATH='/absolute/path/to/chrome' npm run check:seo`.
   Review `.seo-artifacts/` screenshots in both themes. The current catalogue
   contains 48 public pages; use the catalogue and check output as the source
   of truth if more pages are added. A default local build is intentionally
   noindex; the SEO check exercises an indexable local server configuration.
2. Commit the reviewed changes and push to `dev`. In Render, open
   **dynamic-learning-dev-zkww**, confirm its branch is `dev`, then inspect the
   deployment event for that commit. If auto-deploy is off, choose **Manual
   Deploy → Deploy latest commit**. Wait for the deployment to become live.
3. In the dev service’s **Environment**, verify `SEO_INDEXABLE=false`,
   `VITE_USE_API=true`, its own `PUBLIC_APP_URL`, and
   `MONGODB_DB=dynamic_learning_dev`. Use its actual HTTPS URL to check noindex
   headers/source and an empty sitemap. Test navigation, games and account flows
   using disposable dev accounts. Do not submit the dev sitemap to search engines.
4. When you choose to release to production, open a pull request from `dev` to
   `main`, review the complete diff and checks, then merge. In Render, open
   **dynamic-learning-zkww**, confirm branch `main`, and verify
   `SEO_INDEXABLE=true`, `PUBLIC_APP_URL=https://learnwithbix.com` and
   `VITE_USE_API=true`. These values must be available during the build and at
   runtime; rebuild/redeploy after changing them. Confirm the deployment event
   matches the merged commit and reaches live status.

   The Blueprint syncs `render.yaml` from `dev`, while production code deploys
   from `main`. Review configuration changes before pushing; keep the production
   service on Starter and the databases separate. See PROJECT_KNOWLEDGE §6 item
   17 and [Render’s deployment instructions](https://render.com/docs/deploys).

### Verify the production response

1. Open `/`, `/skills`, `/learn/number-bonds`, `/what-we-teach` and
   `/curriculum-guide/year-2-maths` on `https://learnwithbix.com`. Check links,
   guide-to-game navigation, both themes and phone widths.
2. Use **View Page Source**, not just Elements, on each public page. Find its
   visible heading/body text, one unique title, description, one absolute
   canonical, `index, follow`, matching `og:url` and JSON-LD. In Chrome DevTools,
   use the Command Menu → **Disable JavaScript**, reload, and confirm public
   information and links remain usable; re-enable JavaScript afterward.
3. Follow the copyable HTTP checks and expected outcomes in
   [SEO_AUDIT.md — Production HTTP checks](SEO_AUDIT.md#production-http-checks).
   They cover GET/HEAD, canonicals, sitemap, robots, redirects, cache headers and
   actual 404s. Confirm private screens stay noindex and absent from the sitemap.
4. In Search Console, paste each representative public URL into URL Inspection,
   choose **Test Live URL**, then inspect the tested HTML, screenshot and blocked
   resources. Confirm the declared canonical. Check Google’s selected canonical
   in the indexed report when one is available; the live test does not establish
   that the page is already indexed.
   [Google’s URL Inspection instructions](https://support.google.com/webmasters/answer/12482179?hl=en).
5. In **Sitemaps**, submit `https://learnwithbix.com/sitemap.xml` and check its
   processing status. Request indexing for a few key public pages. Record the
   date and recheck Page Indexing and Performance after one week, then weekly
   during the first month. Submission does not guarantee inclusion.
6. In [Bing Webmaster Tools](https://www.bing.com/webmasters/), add/import the
   production property, complete the offered ownership check, submit the same
   sitemap, and use URL Inspection for representative public URLs.
7. Open [Google’s Rich Results Test](https://search.google.com/test/rich-results)
   for a public guide and check supported markup such as breadcrumbs. Use
   [Schema.org’s validator](https://validator.schema.org/) for the full JSON-LD
   graph. Resolve errors against the visible content; a passing validator is
   not a promise of a rich result.

- [ ] Local checks pass and screenshots have been reviewed.
- [ ] Dev deployment checked; production deployment commit/date recorded.
- [ ] Public pages contain useful source HTML and work without JavaScript.
- [ ] Sitemap, robots, redirects, caching and actual 404 responses are correct.
- [ ] Google can access intended pages; account/progress pages remain excluded.
- [ ] Production sitemap submitted; indexing follow-up scheduled.

## 3. Check how the website feels on a phone

**In plain English:** we reduced the main JavaScript download. Now check whether
people can see the page quickly, tap without waiting, and read without things
jumping around.

### Simple steps

1. Open [PageSpeed Insights](https://pagespeed.web.dev/). Test the live homepage,
   `/skills`, and one public guide. Select **Mobile**.
2. Save each result and the date. Repeat twice to spot unusually good or bad runs.
   Compare the same URLs and settings after later changes.
3. Look at real-user data when available, alongside the simulated test:

| Measure | Simple meaning | Good target |
|---|---|---|
| LCP | How quickly the main content appears | 2.5 seconds or less |
| INP | How quickly the page responds to interaction | 200 milliseconds or less |
| CLS | How much the layout unexpectedly moves | 0.1 or less |

4. If there is insufficient real-user data, use the simulated results for clues.
   They do not prove how every visitor experiences the site. Historical real-user
   results also take time to reflect a deployment. [How PageSpeed's data works](https://developers.google.com/speed/docs/insights/v5/about).
5. Try the site on an actual phone using mobile data. Open a guide, start a game,
   tap controls and scroll. Note delays, jumps, overlapping text or difficult
   buttons. Include a map or Solar System game if practical.
6. Record each issue with its URL, device/browser, reproduction steps and saved
   results. In Chrome DevTools, open **Network**, disable cache and reload using
   a consistent mobile throttling profile. Check whether unrelated 3D/map chunks
   load on the homepage, whether fonts are downloaded twice, and whether JS/CSS
   responses have `Content-Encoding: br` or `gzip`. Use **Performance** to record
   a slow interaction and identify long tasks or layout shifts. Fix the largest
   repeated issue, rerun local checks, deploy to dev, and repeat the same mobile
   measurements before a production release.

- [ ] Mobile results saved for the same three public pages.
- [ ] Real phone checked; any problems recorded with the page address.
- [ ] Improvements selected from evidence, rather than the score alone.

## 4. Public year/subject overviews — built (2026-10-15)

All 20 overviews are implemented: **Years 1–4 Maths, English, Geography,
Science and History**. Parents can browse them without creating an account at
`/what-we-teach`, then open a subject page such as
`/curriculum-guide/year-2-maths`.

The pages explain who each path is for, what it covers, how activities work,
and how to get started. They include reviewed subject-specific guidance and
practical limits, with topic names and counts drawn from the curriculum registry.
They are included in public prerendering, metadata and sitemap generation, and
linked from the public hub and homepage. Learner information remains private.

Implementation and editorial checks are recorded in
[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md) under “Public curriculum overviews
(2026-10-15)”. These pages no longer need to be created.

### Remaining follow-up — after deployment

- [ ] Include `/what-we-teach` and representative curriculum guides in the live
  source HTML, sitemap, canonical and Search Console checks in section 2.
- [ ] Include a curriculum guide in the mobile checks in section 3.
- [ ] Keep the public explanations accurate as curriculum content changes;
  challenge counts alone do not establish full statutory coverage.

## Notes to keep

| Item | Your note |
|---|---|
| Game indexing decision | |
| Deployment date | |
| Sitemap submission date | |
| Pages checked in Search Console | |
| Mobile problems found | |
| Curriculum hub/guide live checks | |

Focus on the indexing decision, deployment and live checks in items 1–3.
Include the existing curriculum overviews in those checks, as described in item 4.
