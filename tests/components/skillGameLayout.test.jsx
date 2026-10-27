import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { it, expect } from "vitest";
import SkillGameLayout from "../../src/components/skills/SkillGameLayout";
import { SKILL_GROUPS } from "../../shared/skillsCatalog.js";

it("puts one Back to Skills link above every game", () => {
  render(
    <MemoryRouter initialEntries={["/skills/robot-moves"]}>
      <Routes>
        <Route element={<SkillGameLayout />}>
          <Route path="skills/robot-moves" element={<h1>Robot</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: /Back to Skills/ }).getAttribute("href")).toBe("/skills");
  expect(screen.getByRole("heading", { name: "Robot" })).toBeTruthy();
});

it("keeps every game under /skills/", () => {
  for (const game of SKILL_GROUPS.flatMap((group) => group.games)) expect(game.to).toMatch(/^\/skills\/[a-z-]+$/);
});
