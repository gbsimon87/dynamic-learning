import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth-context";

/**
 * A badge that opens up a new profile picture says so on its own beat — and
 * lets the child claim it there and then, rather than sending them to a
 * grown-up screen to find it later.
 *
 * Uses the same `updateChild` path the grown-up area's picture picker does
 * (fields whitelisted in childFields.js). The badge that unlocked it was saved
 * before this step appeared, so the picture is genuinely theirs to pick.
 */
export default function UnlockStep({ step, headingRef, focalRef }) {
  const { child, updateChild } = useContext(AuthContext) ?? {};
  const [state, setState] = useState("idle"); // idle | saving | done | failed
  const already = child?.avatar === step.avatar;

  const claim = async () => {
    if (!child || state === "saving") return;
    setState("saving");
    try {
      await updateChild(child._id, { avatar: step.avatar });
      setState("done");
    } catch {
      setState("failed");
    }
  };

  const done = already || state === "done";

  return (
    <>
      <p className="completion-celebration-eyebrow">A reward from {step.badge.name}</p>
      <h2 ref={headingRef} tabIndex={-1}>New picture unlocked!</h2>

      <div className={`celebration-avatar ${done ? "is-claimed" : ""}`} ref={focalRef} aria-hidden="true">
        {step.avatar}
      </div>

      {child && (
        done ? (
          <p className="celebration-chip" role="status">
            <span aria-hidden="true">✓ </span>It’s your picture now!
          </p>
        ) : (
          <button
            type="button"
            className="completion-celebration-secondary celebration-claim"
            onClick={claim}
            disabled={state === "saving"}
          >
            {state === "saving" ? "Saving…" : <>Make it my picture <span aria-hidden="true">{step.avatar}</span></>}
          </button>
        )
      )}

      <p className="completion-celebration-message">
        {state === "failed"
          ? "That didn’t save — you can try again, or pick it later in the grown-up area."
          : done
            ? "Look out for it next to your name."
            : "Want to use it as your profile picture?"}
      </p>
    </>
  );
}
