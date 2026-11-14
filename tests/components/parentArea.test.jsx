import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, expect, it, vi } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import { ThemeProvider } from "../../src/context/ThemeContext";
import { isMuted, setMuted } from "../../src/components/celebration/sound/player";
import { getBreakMinutes, setBreakMinutes } from "../../src/components/brainBreak/breakSetting";
import { BREAK_SETTING_KEY } from "../../src/data/brainBreaks";
import ParentArea from "../../src/pages/auth/ParentArea";
import Navbar from "../../src/components/ui/Navbar";

const progressState = vi.hoisted(() => ({ summaries: {} }));
vi.mock("../../src/hooks/useChildrenProgress", () => ({
  useChildrenProgress: () => ({ summaries: progressState.summaries, loading: false }),
}));
vi.mock("../../src/hooks/useChildrenRewards", () => ({
  useChildrenRewards: () => ({ rewards: {}, loading: false }),
}));
vi.mock("../../src/hooks/useTrophyData", () => ({
  useTrophyData: () => ({ candidates: [], loading: false }),
}));
vi.mock("../../src/hooks/useRewards", () => ({
  useRewards: () => ({ hydrated: false }),
}));

const ada = { _id: "ada", name: "Ada", avatar: "🐱", colour: "sky", yearGroup: 2 };
const ben = { _id: "ben", name: "Ben", avatar: "🐶", colour: "mint", yearGroup: 1 };

beforeEach(() => {
  progressState.summaries = {};
  localStorage.setItem("theme", "light");
  setMuted(false);
  setBreakMinutes(15);
});

function mount(auth = {}, { navbar = false } = {}) {
  return render(
    <ThemeProvider>
      <AuthContext.Provider value={{ status: "signedOut", children: [], ...auth }}>
        <MemoryRouter initialEntries={["/parent"]}>
          {navbar && <Navbar />}
          <Routes>
            <Route path="/parent" element={<ParentArea />} />
            <Route path="/login" element={<h1>Sign-in destination</h1>} />
            <Route path="/" element={<h1>Home destination</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    </ThemeProvider>,
  );
}

it("offers device preferences without signing in and retains choices across remounts", async () => {
  const user = userEvent.setup();
  const view = mount();
  expect(screen.getByRole("link", { name: "Sign in" }).getAttribute("href")).toBe("/login");
  await user.click(screen.getByRole("switch", { name: "Dark mode" }));
  await user.click(screen.getByRole("switch", { name: "Learning sounds" }));
  await user.click(within(screen.getByRole("group", { name: "Brain breaks" })).getByRole("button", { name: "Off" }));
  expect(document.body.classList.contains("dark")).toBe(true);
  expect(localStorage.getItem("theme")).toBe("dark");
  expect(isMuted()).toBe(true);
  expect(localStorage.getItem("dl.soundMuted")).toBe("1");
  expect(getBreakMinutes()).toBe(null);
  expect(localStorage.getItem(BREAK_SETTING_KEY)).toBe("off");
  view.unmount();
  mount({ status: "ready", children: [ada] });
  expect(screen.getByRole("switch", { name: "Dark mode" }).getAttribute("aria-checked")).toBe("true");
  expect(screen.getByRole("switch", { name: "Learning sounds" }).getAttribute("aria-checked")).toBe("false");
  await user.click(screen.getByRole("switch", { name: "Dark mode" }));
  await user.click(screen.getByRole("switch", { name: "Learning sounds" }));
  expect(document.body.classList.contains("light")).toBe(true);
  expect(isMuted()).toBe(false);
});

it.each([
  [{ status: "signedOut" }, "Parent area"],
  [{ status: "needsChild" }, "Parent area"],
  [{ status: "ready", child: ada, isLearner: true }, "My account"],
])("links from navigation to preferences for %s", (auth, label) => {
  mount(auth, { navbar: true });
  const nav = screen.getByRole("navigation", { name: "Main" });
  expect(within(nav).getByRole("link", { name: label }).getAttribute("href")).toBe("/parent");
  expect(within(nav).queryByRole("button")).toBeNull();
});

it("separates the adult account destination from the child's personalised profile switcher", () => {
  mount({ status: "ready", child: ada, children: [ada] }, { navbar: true });
  const nav = screen.getByRole("navigation", { name: "Main" });
  const account = within(nav).getByRole("link", { name: "Parent area" });
  const profile = within(nav).getByTitle("Playing as Ada - tap to switch");
  expect(account.getAttribute("href")).toBe("/parent");
  expect(profile.getAttribute("href")).toBe("/profiles");
  expect(within(profile).getByText(ada.avatar)).toBeTruthy();
  expect(within(profile).getByText(ada.name)).toBeTruthy();
});

it("opens only the requested child's progress and keeps editing scoped to that child", async () => {
  const user = userEvent.setup();
  const updateChild = vi.fn(async (_id, patch) => ({ ...ada, ...patch }));
  mount({ status: "ready", children: [ada, ben], updateChild });
  const adaCard = screen.getByRole("heading", { name: "Ada" }).closest("li");
  const benCard = screen.getByRole("heading", { name: "Ben" }).closest("li");
  await user.click(within(adaCard).getByRole("button", { name: "See progress" }));
  const progress = document.getElementById(within(adaCard).getByRole("button", { name: "Hide progress" }).getAttribute("aria-controls"));
  expect(progress.hidden).toBe(false);
  expect(within(progress).getByText("Ada has not started a curriculum yet.")).toBeTruthy();
  await user.click(within(benCard).getByRole("button", { name: "See progress" }));
  expect(progress.hidden).toBe(true);
  await user.click(within(adaCard).getByText("Edit profile"));
  const name = within(adaCard).getByRole("textbox", { name: "Name" });
  await user.clear(name);
  await user.type(name, "Ada Rose");
  await user.click(within(adaCard).getByRole("button", { name: "Save name" }));
  await waitFor(() => expect(updateChild).toHaveBeenCalledWith("ada", { name: "Ada Rose" }));
  await user.click(within(adaCard).getByRole("button", { name: "3" }));
  await waitFor(() => expect(updateChild).toHaveBeenCalledWith("ada", { yearGroup: 3 }));
  expect(within(benCard).getByRole("heading", { name: "Ben" })).toBeTruthy();
});

it("requires a second deliberate action to remove a profile", async () => {
  const user = userEvent.setup();
  const removeChild = vi.fn();
  mount({ status: "ready", children: [ada], removeChild });
  await user.click(screen.getByText("Edit profile"));
  await user.click(screen.getByRole("button", { name: "Remove profile" }));
  expect(removeChild).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "Keep", exact: true }));
  expect(removeChild).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "Remove profile" }));
  await user.click(screen.getByRole("button", { name: "Yes, remove" }));
  expect(removeChild).toHaveBeenCalledExactlyOnceWith("ada");
});

it("keeps the account visible when sign-out fails", async () => {
  const user = userEvent.setup();
  const signOut = vi.fn().mockRejectedValue(new Error("offline"));
  mount({ status: "ready", children: [], parent: { email: "parent@example.com" }, signOut });
  await user.click(screen.getByRole("button", { name: "Sign out" }));
  expect(await screen.findByRole("alert")).toHaveProperty("textContent", expect.stringContaining("We couldn’t sign you out"));
  expect(screen.getByRole("heading", { name: "Parent area" })).toBeTruthy();
});

it("keeps password confirmation and cancellation for account deletion", async () => {
  const user = userEvent.setup();
  const deleteAccount = vi.fn().mockRejectedValue(new Error("WRONG_PASSWORD"));
  mount({ status: "ready", children: [ada], deleteAccount });
  await user.click(screen.getByRole("button", { name: "Delete account" }));
  expect(deleteAccount).not.toHaveBeenCalled();
  await user.type(screen.getByLabelText("Type your password to confirm"), "example-password");
  await user.click(screen.getByRole("button", { name: "Delete everything" }));
  expect(deleteAccount).toHaveBeenCalledExactlyOnceWith("example-password");
  expect(await screen.findByRole("alert")).toHaveProperty("textContent", expect.stringContaining("Nothing has been deleted"));
  await user.click(screen.getByRole("button", { name: "Keep my account" }));
  expect(screen.queryByLabelText("Type your password to confirm")).toBeNull();
});

it("shows a snapshot with headline stats and only the topics a child has worked on", async () => {
  progressState.summaries = {
    ada: {
      year: 2, subjectName: "Maths",
      stats: { completed: 5, total: 20, percent: 25, datasetTotal: 40 },
      categories: [{ id: "n", title: "Number", topics: [
        { id: "a", name: "Counting", completed: 4, total: 4 },
        { id: "b", name: "Adding", completed: 1, total: 4 },
        { id: "c", name: "Fractions", completed: 0, total: 4 },
      ] }],
    },
  };
  const user = userEvent.setup();
  mount({ status: "ready", children: [ada] });
  await user.click(screen.getByRole("button", { name: "See progress" }));
  const tiles = screen.getByRole("list", { name: "Ada’s snapshot" });
  expect(within(tiles).getByText("Level 1")).toBeTruthy();
  expect(within(tiles).getByText(/Streak/)).toBeTruthy();
  expect(screen.getByText("Counting")).toBeTruthy();
  expect(screen.getByText("Adding")).toBeTruthy();
  expect(screen.queryByText("Fractions")).toBeNull();
  expect(screen.getByText("1 more topic not started yet.")).toBeTruthy();
  expect(screen.getByRole("link", { name: /Ada’s Trophy Room/ }).getAttribute("href")).toBe("/parent/trophies/ada");
});
