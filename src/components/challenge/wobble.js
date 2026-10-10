/**
 * The gentle side-to-side shake for a wrong answer, shared by ChallengeShell
 * (Curriculum Mode) and useAnswerFeedback (Skills Mode) so both feel the same.
 * A no-op under reduced motion or without the Web Animations API.
 */
export function wobble(element) {
  if (!element?.animate) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  element.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-7px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(2px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 420, easing: "ease-out" }
  );
}
