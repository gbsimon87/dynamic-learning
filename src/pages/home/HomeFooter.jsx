import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/auth-context";

/**
 * Homepage footer.
 *
 * Deliberately homepage-only for now: every other screen is a task a child is
 * in the middle of, and a wall of links under a challenge is somewhere to get
 * lost. Here it is the calm end of the page, and it carries the grown-up
 * routes (profiles, parent area) that the child-facing navbar keeps small.
 */
export default function HomeFooter() {
  const { status } = useContext(AuthContext) ?? {};
  const signedOut = status === "signedOut";

  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
        <div className="home-footer-brand">
          <span className="home-footer-mark" aria-hidden="true">DL</span>
          <div>
            <p className="home-footer-name">Dynamic Learning</p>
            <p className="home-footer-tagline">
              Practice and challenges for 6 to 8 year olds, built around the UK
              National Curriculum.
            </p>
          </div>
        </div>

        <nav className="home-footer-nav" aria-label="Footer">
          <div className="home-footer-group">
            <h2>Learn</h2>
            <Link to="/curriculum">Curriculum</Link>
            <Link to="/skills">Skills practice</Link>
          </div>

          <div className="home-footer-group">
            <h2>Account</h2>
            {signedOut ? (
              <>
                <Link to="/login">Sign in</Link>
                <Link to="/signup">Create an account</Link>
              </>
            ) : (
              <>
                <Link to="/profiles">Switch profile</Link>
                <Link to="/parent">Parent area</Link>
              </>
            )}
          </div>
        </nav>
      </div>

      <p className="home-footer-note">
        Progress is saved to the profile that is playing, so everyone keeps
        their own journey.
      </p>
    </footer>
  );
}
