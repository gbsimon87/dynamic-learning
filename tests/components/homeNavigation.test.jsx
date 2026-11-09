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

it("uses the current Skills Mode names in quick play", () => {
  mount({ status: "signedOut", child: null });
  for (const title of ["Explore the Solar System", "Read Stories", "Practise Calculations", "Make Number Bonds"]) {
    expect(screen.getByRole("heading", { name: title })).toBeTruthy();
  }
});

it("marks subjects a year does not offer without promising them later", () => {
  mount({ status: "signedOut", child: null });
  expect(screen.queryByText(/Not yet available|Not offered/)).toBeNull();
  expect(screen.getAllByText("–").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Not included in Year 1", { selector: ".sr-only" }).length).toBeGreaterThan(0);
});

it.each([
  { status: "needsChild", child: null },
  { status: "ready", child: { name: "Ada", avatar: "🐱", colour: "sky" } },
])("keeps signed-in curriculum calls to action on the curriculum", (auth) => {
  mount(auth);
  expect(screen.getByText("Explore the topics for your year. Choose any challenge and save your progress as you learn.")).toBeTruthy();
  expect(screen.queryByText(/unlock the next/)).toBeNull();
  if (auth.child) expect(screen.getByText("Choose any challenge to start your learning adventure.")).toBeTruthy();
  expect(screen.getByRole("link", { name: /Start my adventure/ }).getAttribute("href")).toBe("/curriculum");
  expect(screen.getByRole("link", { name: /Explore the curriculum/ }).getAttribute("href")).toBe("/curriculum");
});

it("preserves a signed-in learner's next challenge", () => {
  resumeState.resume = { next: { href: "/year/1/math/problem/number/counting/2", challengeTitle: "Challenge 2", topicName: "Counting" } };
  mount({ status: "ready", child: { name: "Ada", avatar: "🐱", colour: "sky" } });
  expect(screen.getByRole("link", { name: /Keep going/ }).getAttribute("href")).toBe(resumeState.resume.next.href);
  expect(screen.getByRole("link", { name: /Explore the curriculum/ }).getAttribute("href")).toBe("/curriculum");
});
