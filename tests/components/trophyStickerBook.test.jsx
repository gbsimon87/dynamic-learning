import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import { ChildTrophyRoom } from "../../src/pages/trophies/TrophyRoom";

// Stickers are derived from progress; the layout is what is under test here.
const sticker = (topicId, name, earned) => ({ topicId, name, icon: "⭐", earned, available: true, remaining: earned ? 0 : 2 });
const BOOKS = {
  "1-maths": [{ categoryId: "num", title: "Number", stickers: [sticker("count", "Counting", true), sticker("add", "Adding", false)] }],
  "2-maths": [{ categoryId: "shape", title: "Shapes", stickers: [sticker("sides", "Sides", true)] }],
  "1-science": [{ categoryId: "plants", title: "Plants", stickers: [sticker("seeds", "Seeds", false)] }],
};
vi.mock("../../src/data/stickers", () => ({
  topicStickers: (curriculum) => curriculum,
  countStickers: (groups) => {
    const all = groups.flatMap((group) => group.stickers);
    return { earned: all.filter((s) => s.earned).length, total: all.length };
  },
  countAllStickers: () => ({ earned: 2, total: 3 }),
  findSticker: () => undefined,
}));
vi.mock("../../src/data/certificates", () => ({
  curriculumCertificates: () => ({ subject: null, categories: new Map(), topics: new Map() }),
  yearCertificate: () => null,
}));
vi.mock("../../src/data/curriculumProgressStats", () => ({ getYearStats: (progress) => ({ percent: progress?.percent ?? 0 }) }));
vi.mock("../../src/data/curriculumResume", () => ({ pickResume: () => null }));
vi.mock("../../src/data/xp", () => ({ grownUpXp: () => 0 }));
vi.mock("../../src/components/rewards/LevelBar", () => ({ default: () => null }));
vi.mock("../../src/hooks/useTrophyData", () => ({
  useTrophyData: () => ({
    loading: false,
    rewards: { badges: [], streak: { current: 0, best: 0, lastDay: null }, news: { badges: [], stickers: [] } },
    candidates: [
      { year: 1, subject: "maths", subjectName: "Maths", curriculum: BOOKS["1-maths"], progress: { percent: 50 } },
      { year: 1, subject: "science", subjectName: "Science", curriculum: BOOKS["1-science"], progress: { percent: 0 } },
      { year: 2, subject: "maths", subjectName: "Maths", curriculum: BOOKS["2-maths"], progress: { percent: 100 } },
    ],
  }),
}));

it("shows every collected sticker up front and every sticker in each course, started courses first", () => {
  render(
    <AuthContext.Provider value={{ status: "signedIn", children: [{ _id: "ada", name: "Ada", yearGroup: 1 }] }}>
      <MemoryRouter initialEntries={["/parent/trophies/ada"]}>
        <Routes>
          <Route path="/parent/trophies/:childId" element={<ChildTrophyRoom />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );

  const collected = screen.getByRole("heading", { name: "My stickers" }).parentElement;
  expect(within(collected).getByText("Counting")).toBeTruthy();
  expect(within(collected).getByText("Sides")).toBeTruthy();
  expect(within(collected).getByText("Year 2 Maths")).toBeTruthy();
  expect(within(collected).queryByText("Adding")).toBeNull();

  const books = [...document.querySelectorAll("details.trophy-year")];
  expect(books.map((book) => book.querySelector("strong").textContent))
    .toEqual(["Year 1 Maths", "Year 2 Maths", "Year 1 Science"]);
  expect(books.some((book) => book.open)).toBe(false);
  expect(within(books[0]).getByText("Adding")).toBeTruthy();
  expect(within(books[0]).getByText("Counting")).toBeTruthy();
});
