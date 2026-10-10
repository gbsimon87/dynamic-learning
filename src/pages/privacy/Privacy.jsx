import { Link } from "react-router";
import "../credits/Credits.css";
import "./Privacy.css";

/**
 * Placeholder privacy page: a plain description of what the app actually does
 * with information, taken from docs/safeguarding/REVIEW_BRIEF.md. It is not the
 * reviewed privacy notice (#11) and must say so until that review lands.
 */
export default function Privacy() {
  return (
    <div className="credits-page">
      <h1 className="credits-title">How we look after your information</h1>
      <p className="credits-intro">
        <strong>This is a short, early version.</strong> A full privacy notice is being prepared with
        expert help and will replace this page.
      </p>

      <ul className="credits-list">
        <li className="credits-card">
          <h2>What we keep</h2>
          <p>
            <strong>For the account:</strong> an email address and a password (stored scrambled, so
            nobody can read it). Older learners who sign up themselves also tell us an age range
            (13–15, 16–17 or 18+), never a birthday.
          </p>
          <p>
            <strong>For each learner profile:</strong> a nickname, the picture and colour chosen,
            school year and subjects, which challenges are finished, badges and stickers, and the days
            the learner played (for streaks).
          </p>
          <p>
            We don&rsquo;t ask for real names, birthdays, photos, location or voice, and there is
            no chat.
          </p>
        </li>

        <li className="credits-card">
          <h2>What we don&rsquo;t do</h2>
          <p>
            No adverts, no selling, nothing to buy, and no tracking or analytics. We only send two
            kinds of email: a sign-up code and a password-reset link.
          </p>
        </li>

        <li className="credits-card">
          <h2>Who helps us run it</h2>
          <p>
            The app is hosted by Render (Frankfurt, Germany) and its information is stored by
            MongoDB Atlas (Ireland). Emails are sent by Resend. Some geography games load map
            pictures from OpenStreetMap and CARTO, and Flag Finder loads country facts from REST
            Countries, so those services see your device&rsquo;s internet address. Read-aloud uses
            your device&rsquo;s own voice.
          </p>
        </li>

        <li className="credits-card">
          <h2>On this device</h2>
          <p>
            The browser remembers who is signed in, the last account used (so its profiles can be
            shown on the sign-in screen), the light or dark theme and whether sound is off.
            Signing out clears the account details.
          </p>
        </li>

        <li className="credits-card">
          <h2>Removing information</h2>
          <p>
            A grown-up can remove a child&rsquo;s profile, or delete the whole account and
            everything in it, from the <Link className="privacy-inline-link" to="/parent">Parent area</Link>.
            Deleting can&rsquo;t be undone.
          </p>
          <p>
            Questions? Email{" "}
            <a className="privacy-inline-link" href="mailto:hello@learnwithbix.com">hello@learnwithbix.com</a>.
          </p>
        </li>
      </ul>
      <Link className="credits-link credits-home" to="/">Back to home</Link>
    </div>
  );
}
