# Learn with Bix: brief for a children's privacy and safeguarding review

**Prepared:** 2026-10-10. **Updated:** 2026-10-15 against the current repository.
This is a factual description for a qualified reviewer. It is not legal advice,
and it does not claim that the app complies with any law.

## 1. The service

- Learn with Bix is a web learning app (learnwithbix.com) for children aged
  6–8, with implemented curriculum paths for Years 1–4 in Maths, English,
  Science, History and Geography, plus standalone Skills games. Public
  overviews are available without signup at `/what-we-teach` and the 20
  `/curriculum-guide/year-<year>-<subject>` pages. Topic counts are not a claim
  of full statutory coverage.
- It is live now. It runs on Render in Frankfurt and stores data in MongoDB
  Atlas on AWS Ireland (eu-west-1), a 3-node replica set. Atlas backups are
  recorded as inactive in the 2026-10-10 project notes. Hosting regions, backup
  status, supplier agreements and platform-log retention need confirmation
  against the current supplier dashboards; this update did not inspect them.
- There are no ads, no purchases, no chat, no messages between users and no
  published user-generated content. Nicknames and learning responses are
  entered in the app; Speed Reader also accepts a pasted story. These inputs
  stay in the browser; existing completion/reward records may be saved
  separately. Requested read-aloud may pass text to the device speech engine.
- The source code repository is public.

## 2. Who has an account

| Type | Who it's for | Login | Email |
|---|---|---|---|
| Parent | A grown-up (18+) who adds 1–6 child profiles at sign-up, and more later | Yes | The grown-up's |
| Learner | A 13–17-year-old, or an adult, who signs up for themselves and gets one profile | Yes | Their own |
| Child profile | A child using a parent's account | No (the parent picks the profile) | None |

## 3. The age gate as it stands

- **Question asked:** "What year were you born?", chosen from a scrolling
  wheel of years.
- **How age is worked out:** `currentYear − birthYear − 1`, the youngest the
  person could be.
  - Under 13: a dead-end screen, "Ask a grown-up to sign up for you", with a
    **Start again** button.
  - 13–17: a learner account only.
  - 18+: they choose either a learner account or a parent account.
- **The birth year is not stored or sent anywhere.** The server receives only
  an age band (`13-15`, `16-17`, `18+`), and it stores no band at all for a
  parent.
- **Known weaknesses:**
  - Start again, or reloading the page, lets someone pick a different year.
    Nothing records that a person was turned away.
  - The server validates the permitted learner age-band values and rejects
    `under-13`, but trusts the declared band. A caller can claim an older band
    or a parent account; the server does not establish actual age.
  - Nothing confirms that a "parent" is an adult or is the child's parent or
    carer.
  - There is no parental consent step and no record of consent.
  - A learner account aged 13–17 can add more child profiles.

## 4. Data we hold

| What | Data | Kept for |
|---|---|---|
| Account | Email, salted password hash (PBKDF2-SHA256, 150k iterations), account type, age band (learners only), created date, email verification, session version; recovery metadata when requested | Until account deletion; no inactivity retention policy implemented |
| Child profile | Nickname (≤20 chars; the form says "A nickname is fine!"), chosen avatar and colour, school year, subjects | Until a parent deletes the profile |
| Progress | Which challenges each child completed, per year and subject | Until the profile is deleted |
| Rewards | Badges, XP, streaks and activity-day stamps, stickers, practice counts, intro completion timestamp, coach-mark flags and daily puzzle dates/counts | Until the profile/account is deleted |
| Pending sign-up | Email, HMAC of the 6-digit code, send counters | About 1 hour (automatic expiry) |
| Request throttling | Hashed email/account/token keys and hashed client IP keys, held in server memory | Authentication buckets typically 15 minutes; email-request IP buckets up to 1 hour |
| Email-send budget | Aggregate daily send count stored in MongoDB, without a per-person identifier | Scheduled for TTL deletion one day after the UTC send day ends; TTL cleanup is asynchronous |
| Browser storage | App session/active profile state, remembered account/profile details for switching, signup draft (no password or birth year), theme, mute and other preferences | Depends on the item: sessionStorage lasts for the tab session; persistent items remain until cleared or removed by the app |

**Not requested:** legal names (the nickname field could still receive one),
full date of birth, photos, precise device location, voice recordings or contact
lists. Birth year is used in memory for the age gate and excluded from the saved
signup draft and API body. Games accept typed answers and Speed Reader accepts
a pasted story; the app has no general
messaging or free-text publishing feature and no separate attempt-history store.
IP addresses necessarily reach hosting/external services; app throttles use
hashed IP keys. Supplier logging and retention must be checked separately.

**Storage modes:** production is configured with `VITE_USE_API=true`, using the
API/MongoDB store. Local development defaults to a separate localStorage store,
which also holds accounts, profiles, progress and rewards on that browser and
has no equivalent server security boundary or backup. Do not use production
children's data for a review demonstration.

**Production session:** an httpOnly, Secure, SameSite=Lax cookie that lasts
30 days. Secure is conditional on production configuration; the local store
does not use this API session mechanism.

## 5. Email

Emails are sent through **Resend** (US provider) from `hello@learnwithbix.com`.
Only two kinds are sent:

1. A sign-up verification code, valid for 10 minutes.
2. A password-reset link, valid for 30 minutes.

There is no marketing email. Learners aged 13–17 give **their own** email
address.

## 6. Third parties and outside requests

| Party | What it receives | When |
|---|---|---|
| Render (hosting, Frankfurt) | Everything the server handles, and platform logs | Always |
| MongoDB Atlas | API account/profile/progress/rewards documents, pending signup records and aggregate email-send budgets; browser-only preferences and in-memory throttle maps are not stored there | API storage and email operations |
| Resend | Email address, plus the code or reset link | Sign-up and password reset |
| OpenStreetMap / CARTO tiles | Client IP and normal request metadata; requested map tiles | Map-based geography games |
| REST Countries API and external game assets | Client IP and normal request metadata | Flag Finder and any other externally loaded game resources; confirm the full browser request inventory |
| Device speech engine | Text being read aloud (may go to a cloud voice, depending on the device) | Read-aloud buttons |

**Analytics:** none. The code includes a `track()` wrapper that sends
nothing, and adding PostHog (#36) is on hold until this review is done.

## 7. Things that do not exist yet

- A reviewed privacy notice, terms of use, or consent wording. A placeholder
  page at `/privacy` describes current practice.
- A self-service export or a documented subject-access request procedure.
  This does not establish that requests cannot be fulfilled manually; ask the
  reviewer to define the operational process.
- A retention policy for accounts that are no longer used.
- Parental consent, or a way to check consent.

## 8. Questions for the reviewer

1. Which rules apply to us, given a UK audience, servers in the EU and
   possibly users elsewhere? Please assess UK GDPR, PECR and the ICO Children’s
   Code, including the DPIA and age-assurance requirements, and identify whether
   EU GDPR, COPPA or other rules apply given our actual audience and targeting.
2. What is the appropriate lawful basis for each purpose: accounts, child
   profiles, curriculum completions, rewards and operational security? Where
   consent is the appropriate basis, what parental authorisation, verification,
   record and withdrawal process is required? Please distinguish this from
   parental involvement or age assurance where another lawful basis applies;
   an email verification alone proves control of an address, not parenthood.
3. Is a self-declared birth year enough for 13–17 self-sign-up? Should
   someone turned away under 13 be stopped from simply trying again, and if
   so, how strongly?
4. Should learner accounts aged 13–17 be allowed to add child profiles?
5. Do activity dates (used for streaks) need special handling, or is a
   default-off setting required?
6. Do map tiles and the REST Countries API need consent or a notice, or
   should we drop those outside calls? (Fonts are now self-hosted.)
7. What must the privacy notice say, and in what child-friendly form?
8. What should the defaults be for account deletion, data export and
   retention of accounts nobody uses?
9. What may be recorded for #9/#10 (attempt-level learning data: wrong
   answers, time spent), and for #36 (analytics), and on what lawful basis?
10. Review the actual agreements with Render, MongoDB Atlas and Resend:
    controller/processor roles, Article 28 terms, subprocessors, processing and
    support locations, international transfer mechanisms, security, breach
    assistance, retention and deletion. What evidence or changes are missing?
    Please assess external map/API requests and device speech separately;
    an EU hosting region alone does not settle all transfer questions.
11. Please provide reviewed adult-facing and age-appropriate child-facing privacy
    wording, a prioritised implementation list and any unresolved assumptions.
    Identify required operational procedures as well as code changes.

## 9. Engineering changes already made (2026-10-10)

- Fonts are hosted by the app, so no page load contacts Google.
- Server error logs record the error type and code only, never messages that
  could contain an email address.
- A grown-up or learner can delete their whole account from `/parent`, after
  typing their password again. This removes every profile, all progress and
  rewards, and any pending sign-up.
- A placeholder privacy page at `/privacy` describes current practice and is
  linked from sign-up and `/parent`.

Still on hold until your answers: server-side age checks beyond the age band,
a consent flow, consent records, analytics and attempt recording.
