// Mobile browsers (and script-driven focus) can match :focus-visible after a
// tap or a held button. Track the last input type so CSS can drop the ring
// for touch and mouse while keyboard users keep it.
const root = document.documentElement;

document.addEventListener("pointerdown", () => root.classList.add("using-pointer"), true);
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") root.classList.remove("using-pointer");
}, true);
