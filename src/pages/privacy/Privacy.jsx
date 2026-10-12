import { Link } from "react-router";
import InfoPage from "../../components/ui/InfoPage";
import "./Privacy.css";

/**
 * Placeholder privacy page: a plain description of what the app actually does
 * with information, taken from docs/safeguarding/REVIEW_BRIEF.md. It is not the
 * reviewed privacy notice (#11) and must say so until that review lands.
 */
export default function Privacy() {
  return (
    <InfoPage
      title="How we look after your information"
      intro={
        <p className="privacy-draft">
          <span className="privacy-draft-icon" aria-hidden="true">📝</span>
          <span>
            <strong>This is a short, early version.</strong> A full privacy notice is being prepared
            with expert help and will replace this page.
          </span>
        </p>
      }
    >
      <section className="info-section" aria-labelledby="privacy-keep">
        <h2 id="privacy-keep">What we keep</h2>
        <dl className="privacy-keep">
          <div>
            <dt>For the account</dt>
            <dd>
              An email address and a password (stored scrambled, so nobody can read it). Older
              learners who sign up themselves also tell us an age range (13–15, 16–17 or 18+), never
              a birthday.
            </dd>
          </div>
          <div>
            <dt>For each learner profile</dt>
            <dd>
              A nickname, the picture and colour chosen, school year and subjects, which challenges
              are finished, badges and stickers, and the days the learner played (for streaks).
            </dd>
          </div>
        </dl>
        <p>
          We don&rsquo;t ask for real names, birthdays, photos, location or voice, and there is no
          chat.
        </p>
      </section>

      <section className="info-section" aria-labelledby="privacy-dont">
        <h2 id="privacy-dont">What we don&rsquo;t do</h2>
        <p>
          No adverts, no selling, nothing to buy, and no tracking or analytics. We only send two
          kinds of email: a sign-up code and a password-reset link.
        </p>
      </section>

      <section className="info-section" aria-labelledby="privacy-helpers">
        <h2 id="privacy-helpers">Who helps us run it</h2>
        <p>
          The app is hosted by Render (Frankfurt, Germany) and its information is stored by MongoDB
          Atlas (Ireland). Emails are sent by Resend. Some geography games load map pictures from
          OpenStreetMap and CARTO, and Flag Finder loads country facts from REST Countries, so
          those services see your device&rsquo;s internet address. Read-aloud uses your
          device&rsquo;s own voice.
        </p>
      </section>

      <section className="info-section" aria-labelledby="privacy-device">
        <h2 id="privacy-device">On this device</h2>
        <p>
          The browser remembers who is signed in, the last account used (so its profiles can be
          shown on the sign-in screen), the light or dark theme and whether sound is off. Signing
          out clears the account details.
        </p>
      </section>

      <section className="info-section" aria-labelledby="privacy-remove">
        <h2 id="privacy-remove">Removing information</h2>
        <p>
          A grown-up can remove a child&rsquo;s profile, or delete the whole account and everything
          in it, from the <Link className="privacy-inline-link" to="/parent">Parent area</Link>.
          Deleting can&rsquo;t be undone.
        </p>
        <p className="privacy-contact">
          Questions? Email{" "}
          <a className="privacy-inline-link" href="mailto:hello@learnwithbix.com">hello@learnwithbix.com</a>.
        </p>
      </section>
    </InfoPage>
  );
}
