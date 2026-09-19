import { useReveal } from "../home/useReveal";
import "./AuthShell.css";

/* ===== DECORATION =====
   The drifting layer behind the auth card, the same idea as the homepage and
   curriculum skies. Fixed positions rather than random so the scene is the same
   on every visit, and `aria-hidden` on the container because a screen reader
   announcing "a 4 star b" would be nonsense. */
const GLYPHS = [
  { char: "✦", left: 7, top: 16, size: 1.8, duration: 16, delay: 0 },
  { char: "a", left: 18, top: 62, size: 2.1, duration: 19, delay: 3 },
  { char: "4", left: 30, top: 12, size: 2.3, duration: 14, delay: 6 },
  { char: "●", left: 41, top: 76, size: 1.5, duration: 21, delay: 1 },
  { char: "★", left: 54, top: 20, size: 1.9, duration: 17, delay: 4 },
  { char: "＋", left: 66, top: 68, size: 2, duration: 15, delay: 8 },
  { char: "b", left: 77, top: 24, size: 2.2, duration: 20, delay: 2 },
  { char: "▲", left: 88, top: 58, size: 1.6, duration: 18, delay: 5 },
  { char: "9", left: 95, top: 14, size: 2, duration: 13, delay: 7 },
  { char: "■", left: 12, top: 88, size: 1.4, duration: 22, delay: 9 },
];

/**
 * The shared frame for /login and /signup.
 *
 * Both screens were plain white cards on a plain background while the rest of
 * the app drifts, reveals and wiggles — and they are the FIRST thing anyone
 * sees. This gives them one sky, one card and one entrance, so moving between
 * them reads as two views of the same place rather than two different websites.
 *
 * The reveal ref is returned to the caller through `data-reveal` descendants:
 * anything inside `children` carrying that attribute is staggered in on mount by
 * `useReveal`, exactly as the homepage sections are.
 *
 * @param {string} [width] - "narrow" (a form) or "wide" (choice cards, faces).
 */
function AuthShell({ children, width = "narrow" }) {
  const revealRef = useReveal();

  return (
    <div className="auth-page" ref={revealRef}>
      <div className="auth-sky" aria-hidden="true">
        {GLYPHS.map((glyph, index) => (
          <span
            key={index}
            className="auth-glyph"
            style={{
              left: `${glyph.left}%`,
              top: `${glyph.top}%`,
              fontSize: `${glyph.size}rem`,
              animationDuration: `${glyph.duration}s`,
              // A negative delay starts each glyph mid-flight, so the scene is
              // already in motion on arrival rather than all starting together.
              animationDelay: `-${glyph.delay}s`,
            }}
          >
            {glyph.char}
          </span>
        ))}
      </div>

      <main className={`auth-card is-${width}`}>{children}</main>
    </div>
  );
}

export default AuthShell;
