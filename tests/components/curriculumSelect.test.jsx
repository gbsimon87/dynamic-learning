import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { expect, it } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import CurriculumSelectPage from "../../src/pages/curriculum/CurriculumSelectPage";

const CORE_SUBJECTS = ["Maths", "English", "Geography", "Science", "History"];
const YEAR_5_SUBJECTS = [
  ...CORE_SUBJECTS,
  "Art & Design", "Computing", "Design & Technology", "French", "Music", "PE",
  "Relationships & Health",
];

function mount(child = null) {
  return render(
    <AuthContext.Provider value={{ child }}>
      <MemoryRouter initialEntries={["/curriculum?pick=1"]}>
        <Routes>
          <Route path="/curriculum" element={<CurriculumSelectPage />} />
          <Route path="/curriculum/year/5/french" element={<p>Course opened</p>} />
          <Route path="/curriculum/year/6/math" element={<p>Year 6 Maths opened</p>} />
          <Route path="/curriculum/year/6/science" element={<p>Year 6 Science opened</p>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

function subjectNames() {
  const section = screen.getByRole("region", { name: /Your subject/ });
  return within(section).getAllByRole("button").map((button) =>
    button.querySelector(".cs-subject-name").textContent
  );
}

it.each([1, 2, 3, 4, 5])("shows only courses available for saved Year %i", (yearGroup) => {
  mount({ yearGroup });
  expect(subjectNames()).toEqual(yearGroup === 5 ? YEAR_5_SUBJECTS : CORE_SUBJECTS);
});

it("shows Maths and Science for saved Year 6 while its other courses are built", async () => {
  const user = userEvent.setup();
  mount({ yearGroup: 6 });
  expect(subjectNames()).toEqual(["Maths", "Science"]);
  await user.click(screen.getByRole("button", { name: /Science/ }));
  expect(screen.getByText("Year 6 Science opened")).toBeTruthy();
});

it("updates available courses when the learner changes year and opens the chosen course", async () => {
  const user = userEvent.setup();
  mount({ yearGroup: 5, subjects: ["french"] });
  expect(screen.getByRole("button", { name: /French/ }).textContent).toContain("Your pick");

  for (const year of [1, 2, 3, 4]) {
    await user.click(screen.getByRole("button", { name: new RegExp(`^Year ${year}`) }));
    expect(subjectNames()).toEqual(CORE_SUBJECTS);
  }

  await user.click(screen.getByRole("button", { name: /^Year 5/ }));
  expect(subjectNames()).toEqual(YEAR_5_SUBJECTS);
  await user.click(screen.getByRole("button", { name: /French/ }));
  expect(screen.getByText("Course opened")).toBeTruthy();
});

it("keeps the year prompt before selection and filters after choosing a year", async () => {
  const user = userEvent.setup();
  mount();
  expect(subjectNames()).toEqual(YEAR_5_SUBJECTS);
  expect(screen.getAllByText("Pick a year first")).toHaveLength(YEAR_5_SUBJECTS.length);

  await user.click(screen.getByRole("button", { name: /^Year 1/ }));
  expect(subjectNames()).toEqual(CORE_SUBJECTS);
  expect(screen.queryByText("Pick a year first")).toBeNull();
});

it("opens the staged Year 6 Maths pathway", async () => {
  const user = userEvent.setup();
  mount({ yearGroup: 6, subjects: ["math"] });
  await user.click(screen.getByRole("button", { name: /Maths/ }));
  expect(screen.getByText("Year 6 Maths opened")).toBeTruthy();
});
