import Mascot from "../../../../components/mascot/Mascot";

/** Bix and one speech bubble. The bubble is a polite live region, so each new line is read out. */
export default function BixGuide({ line, mood = "idle", cheerOn }) {
  return (
    <div className="sf-bix">
      <Mascot decorative mood={mood} cheerOn={cheerOn} className="sf-bix-mascot" />
      <p className="sf-bubble" aria-live="polite">
        {line}
      </p>
    </div>
  );
}
