import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

import RuleZoo from "../../src/pages/skills/math/RuleZoo";

function zoo() {
  render(<MemoryRouter><RuleZoo /></MemoryRouter>);
}

const pen = (name) => screen.getByRole("region", { name: new RegExp(`^${name}`) });
const penCount = () => within(pen("Sunny Pen")).queryAllByRole("listitem").length + within(pen("Moon Pen")).queryAllByRole("listitem").length;
const message = () => document.querySelector(".zoo-message").textContent;

it("starts with one creature in each pen and three to test", () => {
  zoo();
  expect(penCount()).toBe(2);
  expect(screen.getAllByRole("button", { name: /^Test this creature/ })).toHaveLength(3);
});

it("testing a creature puts it in a pen and says which", () => {
  zoo();
  fireEvent.click(screen.getAllByRole("button", { name: /^Test this creature/ })[0]);
  expect(penCount()).toBe(3);
  expect(message()).toMatch(/It went to the (Sunny|Moon) Pen!/);
  expect(screen.getAllByRole("button", { name: /^Test this creature/ })).toHaveLength(3);
});

it("Help me think lists every clue, and a guess either cracks it or explains", () => {
  zoo();
  fireEvent.click(screen.getByRole("button", { name: "Help me think" }));
  const clues = screen.getByRole("list", { name: /What Bix has worked out/ });
  // The two starting creatures fit every clue, so nothing is ruled out yet.
  expect(within(clues).getAllByRole("listitem").every((item) => item.textContent.includes("still possible"))).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "I know the rule!" }));
  const choices = within(screen.getByRole("group", { name: "Choose the secret rule" })).getAllByRole("button");
  expect(choices).toHaveLength(3);
  fireEvent.click(choices[0]);
  // Before any test every clue fits, so a guess is right or "fits", never wrong.
  expect(message()).toMatch(/You cracked it!|fits every creature so far/);
});

it("switching to Trickier starts a new zoo with five clues", () => {
  zoo();
  fireEvent.click(screen.getAllByRole("button", { name: /^Test this creature/ })[0]);
  fireEvent.click(screen.getByRole("button", { name: "Trickier" }));
  expect(penCount()).toBe(2);
  fireEvent.click(screen.getByRole("button", { name: "I know the rule!" }));
  expect(within(screen.getByRole("group", { name: "Choose the secret rule" })).getAllByRole("button")).toHaveLength(5);
});

it("Stump Bix: the child sets a rule and sorts each creature Bix asks about", () => {
  zoo();
  fireEvent.click(screen.getByRole("button", { name: /Stump Bix/ }));
  fireEvent.click(screen.getByRole("button", { name: /Has horns/ }));
  expect(screen.getByText(/Your secret rule:/)).toBeTruthy();
  for (let i = 0; i < 8 && screen.queryByRole("button", { name: /Bix, pick one/ }); i += 1) {
    fireEvent.click(screen.getByRole("button", { name: /Bix, pick one/ }));
    const picked = screen.queryByRole("region", { name: "The creature Bix wants to test" });
    if (!picked) break;
    const described = picked.querySelector(".zoo-bix-pick__creature").getAttribute("aria-label");
    const horned = !described.includes("no horns");
    fireEvent.click(screen.getByRole("button", { name: horned ? /Sunny Pen/ : /Moon Pen/ }));
  }
  expect(message()).toMatch(/I think your secret rule is Has horns!/);
});

it("Stump Bix: the creature Bix picks is described, and a wrong pen is explained afresh each time", () => {
  zoo();
  fireEvent.click(screen.getByRole("button", { name: /Stump Bix/ }));
  fireEvent.click(screen.getByRole("button", { name: /Has horns/ }));
  fireEvent.click(screen.getByRole("button", { name: /Bix, pick one/ }));
  const picked = within(screen.getByRole("region", { name: "The creature Bix wants to test" })).getByRole("img");
  const described = picked.getAttribute("aria-label");
  expect(described).toMatch(/^A \w+ creature with /);
  const wrong = described.includes("no horns") ? /Sunny Pen/ : /Moon Pen/;
  fireEvent.click(screen.getByRole("button", { name: wrong }));
  const first = message();
  expect(first).toMatch(/Check your rule/);
  fireEvent.click(screen.getByRole("button", { name: wrong }));
  expect(message()).not.toBe(first);
  fireEvent.click(screen.getByRole("button", { name: wrong }));
  expect(message()).toBe(first);
});
