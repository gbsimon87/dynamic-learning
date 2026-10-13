import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import RootLayout from "../../src/layouts/RootLayout";

vi.mock("../../src/components/ui/Navbar", () => ({ default: () => <nav aria-label="Main" /> }));
vi.mock("../../src/components/brainBreak/BrainBreak", () => ({ default: () => null }));

function mount(path) {
  return render(
    <AuthContext.Provider value={{ status: "signedOut" }}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="*" element={<p>Page content</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

it.each(["/", "/curriculum", "/skills", "/trophies", "/profiles", "/parent", "/login", "/signup", "/skills/"])(
  "shows one footer outside the main content on %s",
  (path) => {
    mount(path);
    const footer = screen.getByRole("contentinfo");
    expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
    expect(screen.getByRole("main").contains(footer)).toBe(false);
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeTruthy();
  },
);

it.each(["/privacy", "/credits", "/forgot-password", "/arithmetic-practice", "/year/1/math"])(
  "does not show the hub footer on %s",
  (path) => {
    mount(path);
    expect(screen.queryByRole("contentinfo")).toBeNull();
  },
);
