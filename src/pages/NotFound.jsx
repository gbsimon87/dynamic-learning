import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import "./NotFound.css";

/**
 * Route-level error boundary.
 *
 * Without this, React Router falls back to its built-in developer error
 * screen ("Unexpected Application Error!"), which is not something a child
 * using the app should ever see.
 */
function NotFound() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="notfound-page">
      <div className="notfound-emoji">{is404 ? "🧭" : "🛠️"}</div>

      <h1 className="notfound-title">
        {is404 ? "We can't find that page" : "Something went wrong"}
      </h1>

      <p className="notfound-message">
        {is404
          ? "That link might be old, or the page may have moved."
          : "Sorry about that! Try heading back and having another go."}
      </p>

      <div className="notfound-actions">
        <Link to="/" className="notfound-btn notfound-btn-primary">
          🏠 Go Home
        </Link>
        <Link to="/curriculum" className="notfound-btn">
          📘 Curriculum
        </Link>
        <Link to="/skills" className="notfound-btn">
          🎮 Skills
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
