import { useState } from "react";

/**
 * The payoff. One child: "Hand the device to Maya!" and a big button only she
 * should press. Several: "Who's playing first?". A learner: "Let's go!".
 */
export default function HandOver({ result, onStart }) {
  const [starting, setStarting] = useState(false);
  const kids = result.children;
  const learner = result.parent.accountType === "learner";
  const start = async (child) => {
    if (starting) return;
    setStarting(true);
    try {
      await onStart(child);
    } finally {
      setStarting(false);
    }
  };

  if (kids.length === 1) {
    const [child] = kids;
    return (
      <div className="sf-handover">
        <span className="sf-handover-face" style={child.colour ? { "--sf-face": `var(${child.colour})` } : undefined} aria-hidden="true">
          {child.avatar}
        </span>
        <h1 className="auth-title">{learner ? "You're all set!" : `Hand the device to ${child.name}!`}</h1>
        <button type="button" className="auth-btn" onClick={() => start(child)} disabled={starting} autoFocus>
          {learner ? "Let's go! 🚀" : `I'm ${child.name}! 🚀`}
        </button>
      </div>
    );
  }

  return (
    <div className="sf-handover">
      <h1 className="auth-title">Who's playing first?</h1>
      <div className="sf-cards">
        {kids.map((child) => (
          <button key={child._id} type="button" className="sf-card" onClick={() => start(child)} disabled={starting}>
            <span className="sf-card-icon" aria-hidden="true">{child.avatar}</span>
            <span className="sf-card-title">{child.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
