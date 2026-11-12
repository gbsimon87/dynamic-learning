import Mascot from "./Mascot";
import "./BixLoader.css";

/**
 * The app's one loading screen: Bix in the middle of the whole screen, gently
 * zooming in and out, with a short line saying what he is fetching.
 *
 * Used wherever a child would otherwise wait on a blank page or a bare
 * "Loading…" line: route chunks, the account and progress reads, a challenge
 * module, the trophy cabinet, the map and flag data, the 3D ocean.
 *
 *   message   what Bix is doing, without a trailing ellipsis — three bouncing
 *             dots follow it on screen
 *
 * The screen is a polite live region, so a screen reader hears the message
 * once. It fades in after a short beat (CSS), so a load that finishes almost
 * at once never flashes. Bix himself is decorative but still tappable: a tap
 * while waiting earns a cheer. Under `prefers-reduced-motion` nothing zooms,
 * bobs or bounces; the screen simply holds still.
 */
export default function BixLoader({ message = "Bix is getting things ready" }) {
  return (
    <div className="bix-loader" role="status" aria-live="polite">
      <div className="bix-loader-stage">
        <span className="bix-loader-glow" aria-hidden="true" />
        <span className="bix-loader-sparkle bix-loader-sparkle-1" aria-hidden="true">⭐</span>
        <span className="bix-loader-sparkle bix-loader-sparkle-2" aria-hidden="true">✨</span>
        <span className="bix-loader-sparkle bix-loader-sparkle-3" aria-hidden="true">🌟</span>
        <span className="bix-loader-sparkle bix-loader-sparkle-4" aria-hidden="true">💫</span>
        <div className="bix-loader-zoom">
          <Mascot decorative className="bix-loader-mascot" />
        </div>
      </div>
      <p className="bix-loader-message">
        {message}
        <span className="bix-loader-dots" aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
}
