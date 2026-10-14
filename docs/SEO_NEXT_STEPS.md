# Learn with Bix: simple SEO follow-up checklist

Use this alongside [the technical audit](SEO_AUDIT.md). This is a guide to follow;
it does not deploy the SEO changes or change the app.

**Suggested order:** make the game-page decision first, deploy with your
developer, check the live site, then measure speed. Extra content can wait.

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

## 4. Decide whether to add public year/subject explanations

**In plain English:** parents may want to know what “Year 2 Maths” includes before
creating an account. A useful public overview could answer that question while
the child's actual lessons and progress stay behind the existing account flow.

### Simple steps — optional, after the checks above

1. Pick one useful starting topic, such as **Year 2 Maths**. Do not create pages
   for every combination at once.
2. Draft answers to four questions:
   - Who is this learning path for?
   - What does the app actually cover?
   - How do the lessons and practice games work?
   - How does a parent get started?
3. Check the claims against the implemented content and the mapped requirements
   in `docs/curriculum/`. Completed challenge counts do not by themselves prove
   complete statutory coverage.
4. Ask your developer to build an openly readable page, available without signup
   and present in the first HTML response. Link it from a relevant public page
   and include it in the sitemap.
5. Keep names, individual progress and account details out of the public page.
   Use clear links to suitable free games and the existing signup flow.
6. Review the finished page for usefulness and accuracy. Expand to other subjects
   only when you can offer equally useful, distinct information.

- [ ] One accurate, useful overview drafted and reviewed.
- [ ] Public page linked and discoverable; learner information remains private.

## Notes to keep

| Item | Your note |
|---|---|
| Game indexing decision | |
| Deployment date | |
| Sitemap submission date | |
| Pages checked in Search Console | |
| Mobile problems found | |
| First overview to consider | |

For now, completing items 1–3 is enough. Item 4 is a content opportunity, not a
requirement to launch the SEO improvements.
