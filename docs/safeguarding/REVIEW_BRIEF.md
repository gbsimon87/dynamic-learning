# Learn with Bix: brief for a children's privacy and safeguarding review

**Prepared:** 2026-10-10, from the code on the `dev` branch. This is a factual
description for a qualified reviewer. It is not legal advice, and it does not
claim that the app complies with any law.

## 1. The service

- Learn with Bix is a web learning app (learnwithbix.com) for children aged
  6–8. It follows the UK National Curriculum, Years 2–4.
- It is live now. It runs on Render in Frankfurt and stores data in MongoDB
  Atlas on AWS Ireland (eu-west-1), a 3-node replica set. Atlas backups are
  currently inactive.
- There are no ads, no purchases, no chat, no messages between users and no
  content made by users other than a nickname.
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
  - The server trusts whatever age band the browser sends. A direct API call
    skips the gate entirely.
  - Nothing confirms that a "parent" is an adult or is the child's parent or
    carer.
  - There is no parental consent step and no record of consent.
  - A learner account aged 13–17 can add more child profiles.

## 4. Data we hold

| What | Data | Kept for |
|---|---|---|
| Account | Email, password hash (PBKDF2-SHA256, 150k iterations), account type, age band (learners only), created date, email-verified flag and date | Indefinitely |
| Child profile | Nickname (≤20 chars; the form says "A nickname is fine!"), chosen avatar and colour, school year, subjects | Until a parent deletes the profile |
| Progress | Which challenges each child completed, per year and subject | Until the profile is deleted |
| Rewards | Badges, XP, streaks, **including the dates the child was active**, and stickers | Until the profile is deleted |
| Pending sign-up | Email, HMAC of the 6-digit code, send counters | About 1 hour (automatic expiry) |
| Rate limiting | Hashes of email and IP address, held in server memory | About 1 hour, never written to disk |
| Browser storage | Session (account id, child id, email), last account (email and profile names and pictures, for a quick switch), sign-up draft (sessionStorage, cleared when sign-up finishes), theme and mute | Until cleared on the device |

**Not collected:** real names (beyond a nickname), date of birth, photos,
location, voice, contact lists or free text.

**Session:** an httpOnly, Secure, SameSite=Lax cookie that lasts 30 days.

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
| MongoDB Atlas | Everything in §4 | Always |
| Resend | Email address, plus the code or reset link | Sign-up and password reset |
| OpenStreetMap / CARTO tiles | IP address | Map-based geography games |
| REST Countries API | IP address | Flag Finder game |
| Device speech engine | Text being read aloud (may go to a cloud voice, depending on the device) | Read-aloud buttons |

**Analytics:** none. The code includes a `track()` wrapper that sends
nothing, and adding PostHog (#36) is on hold until this review is done.

## 7. Things that do not exist yet

- A reviewed privacy notice, terms of use, or consent wording. A placeholder
  page at `/privacy` describes current practice.
- Exporting data, or any way to handle a subject access request.
- A retention policy for accounts that are no longer used.
- Parental consent, or a way to check consent.

## 8. Questions for the reviewer

1. Which rules apply to us, given a UK audience, servers in the EU and
   possibly users elsewhere? We assume UK GDPR, the ICO Age Appropriate Design
   Code, and the age of digital consent of 13. Should COPPA or the GDPR
   rules for EU member states also be considered?
2. Is relying on a parent's account, with no consent record, acceptable for
   child profiles? If not, what proof and record of consent is proportionate
   (for example, a confirmed email plus a declaration and a stored timestamp)?
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
10. Are DPAs needed or already in place with Render, MongoDB and
    Resend?

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
