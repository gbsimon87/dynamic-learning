import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import Home from "../../src/pages/home/Home";

const resumeState = vi.hoisted(() => ({ resume: null, candidates: [] }));
vi.mock("../../src/pages/home/useHomeResume", () => ({ useHomeResume: () => resumeState }));
vi.mock("../../src/pages/home/useReveal", () => ({ useReveal: () => null }));
vi.mock("../../src/components/mascot/Mascot", () => ({ default: () => null }));
vi.mock("../../src/pages/home/HomeAchievements", () => ({ default: () => null }));

beforeEach(() => { resumeState.resume = null; });

function mount(auth) {
  render(<AuthContext.Provider value={auth}><MemoryRouter><Home /></MemoryRouter></AuthContext.Provider>);
}

it("lets signed-out visitors explore coverage while the hero starts signup", () => {
  mount({ status: "signedOut", child: null });
  expect(screen.getByRole("link", { name: /Start my adventure/ }).getAttribute("href")).toBe("/signup");
  expect(screen.getByRole("link", { name: /Explore the curriculum/ }).getAttribute("href")).toBe("/what-we-teach");
});

it.each([
  { status: "needsChild", child: null },
  { status: "ready", child: { name: "Ada", avatar: "🐱", colour: "sky" } },
])("keeps signed-in curriculum calls to action on the curriculum", (auth) => {
  mount(auth);
  expect(screen.getByRole("link", { name: /Start my adventure/ }).getAttribute("href")).toBe("/curriculum");
  expect(screen.getByRole("link", { name: /Explore the curriculum/ }).getAttribute("href")).toBe("/curriculum");
});

it("preserves a signed-in learner's next challenge", () => {
  resumeState.resume = { next: { href: "/year/1/math/problem/number/counting/2", challengeTitle: "Challenge 2", topicName: "Counting" } };
  mount({ status: "ready", child: { name: "Ada", avatar: "🐱", colour: "sky" } });
  expect(screen.getByRole("link", { name: /Keep going/ }).getAttribute("href")).toBe(resumeState.resume.next.href);
  expect(screen.getByRole("link", { name: /Explore the curriculum/ }).getAttribute("href")).toBe("/curriculum");
});
