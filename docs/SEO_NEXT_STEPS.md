# Learn with Bix: simple SEO follow-up checklist

Use this alongside [the technical audit](SEO_AUDIT.md). This is a guide to follow;
it does not deploy the SEO changes or change the app.

**Suggested order:** make the game-page decision first, deploy with your
developer, check the live site, then measure speed. The year/subject overviews are already built; verify them as part of the live checks.

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

Developer verification commands are in [package.json](../package.json): run
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
   select `learnwithbix.com`. If it is not set up, ask your developer to help
   verify ownership first.
2. Open **Performance → Search results**. Choose the last six months, or the
   longest period available. Open the **Pages** tab.
3. Look for original game addresses such as `/number-bonds`, `/flag-finder` and
   `/speed-reader`. Record their **clicks** and **impressions**. Clicks mean visits;
   impressions mean Google showed a result. [Google's report explanation](https://support.google.com/webmasters/answer/10268906?hl=en).
4. Paste those game addresses into the inspection bar at the top. Record whether
   Google says each is indexed. Also consider links you know schools or other
   websites have made to these games.
5. Give the results to your developer and choose a policy:

| What you find | Suggested decision |
|---|---|
| Existing games have search traffic or useful links | Keep those addresses eligible for search; ask the developer to add useful initial HTML there. |
| No established search visibility or known valuable links | The new public-guide approach may be suitable. |
| Missing data or uncertainty | Postpone excluding the original game pages until you have enough evidence. |

- [ ] I have recorded the evidence and agreed which addresses should stay searchable.

**Important:** no clicks alone does not prove a page has no value. Avoid making
the decision from a single `site:` search or assuming missing reports mean zero
traffic.

## 2. Check the live website after deployment

**In plain English:** the local version passed our checks. Now confirm that the
version visitors and Google actually receive works the same way.

### Simple steps — with your developer

1. Ask the developer to deploy the reviewed SEO branch through the usual process.
   Production must have `SEO_INDEXABLE=true` and
   `PUBLIC_APP_URL=https://learnwithbix.com`; development should stay excluded.
   These settings are already documented in the technical audit.
2. Open the homepage, `/skills`, and `/learn/number-bonds`. Confirm the pages look
   right, their links work, and the guide's Play button opens the original game.
3. On a public page, choose your browser's **View Page Source** option. Find its
   title and some visible page text. They should already be in the source.
   Ask the developer to confirm its robots tag allows indexing and its canonical
   URL — its preferred address — matches the page without tracking parameters.
4. Open `/sitemap.xml`. It should show the intended public page addresses.
   Open `/robots.txt`; production should not have a blanket `Disallow: /` rule.
5. Open `/this-page-does-not-exist`. You should see a helpful missing-page message.
   Ask the developer to confirm the response is **404**, not 200; the message
   alone cannot prove the status. Also confirm `/skills/` redirects to `/skills`.
6. In Search Console, enter the full address of a public guide and click
   **Test Live URL**. Repeat for the homepage and skills hub. Check that Google
   can access their content. The live test checks the current page; it does not
   prove the page is already indexed. [Google's inspection guide](https://support.google.com/webmasters/answer/12482179?hl=en).
7. Open **Sitemaps**, submit `sitemap.xml`, and check that Google can read it.
   Request indexing for a few key public pages. Recheck the indexing report later;
   inclusion is Google's decision, not an immediate result of submission.

- [ ] Public pages work and contain useful source HTML.
- [ ] Sitemap, robots, redirects and actual 404 responses are correct.
- [ ] Google can access the intended pages; account/progress pages remain excluded.
- [ ] Sitemap submitted; indexing status scheduled for a later check.

You can repeat the sitemap and URL checks in
[Bing Webmaster Tools](https://www.bing.com/webmasters/).

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
6. Send the developer the specific slow page, screenshots/results and what felt
   wrong. Fix the largest repeated issue first rather than chasing a perfect score.

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
