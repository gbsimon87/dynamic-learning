import { Link, Outlet } from "react-router";
import "./SkillGameLayout.css";

/**
 * Wraps the Skills Mode games that don't sit on FreePlayShell (which draws its
 * own back link) so every game can return to the /skills hub.
 */
function SkillGameLayout() {
  return (
    <>
      <nav className="skill-back-bar" aria-label="Skills">
        <Link to="/skills" className="skill-back">
          <span aria-hidden="true">←</span> Back to Skills
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default SkillGameLayout;
