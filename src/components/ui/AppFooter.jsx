import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/auth-context";
import "./AppFooter.css";

// Shared footer for the main learning and account hubs.
export default function AppFooter() {
  const { status } = useContext(AuthContext) ?? {};
  const signedOut = status === "signedOut";

  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div className="app-footer-brand">
          <span className="app-footer-mark" aria-hidden="true">LB</span>
          <div>
            <p className="app-footer-name">Learn with Bix</p>
            <p className="app-footer-tagline">
              Practice and challenges built around the UK
              National Curriculum.
            </p>
          </div>
        </div>

        <nav className="app-footer-nav" aria-label="Footer">
          <div className="app-footer-group">
            <h2>Learn</h2>
            <Link to="/curriculum">Curriculum</Link>
            <Link to="/skills">Skills practice</Link>
          </div>

          <div className="app-footer-group">
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

          <div className="app-footer-group">
            <h2>About</h2>
            <Link to="/privacy">Privacy</Link>
            <Link to="/credits">Credits</Link>
          </div>
        </nav>
      </div>

      <p className="app-footer-note">
        Progress is saved to the profile that is playing, so everyone keeps
        their own journey.
      </p>
    </footer>
  );
}
