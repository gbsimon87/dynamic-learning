import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { expect, it } from "vitest";
import { AuthContext } from "../../src/context/auth-context";
import CertificateStep from "../../src/components/celebration/steps/CertificateStep";
import StickerStep from "../../src/components/celebration/steps/StickerStep";

const at = (element) => (
  <AuthContext.Provider value={{ child: { _id: "c1", name: "Ada", avatar: "🦊", colour: "--child-1" } }}>
    <MemoryRouter initialEntries={["/year/3/math/problem/number-fractions/tenths/4"]}>
      <Routes>
        <Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={element} />
      </Routes>
    </MemoryRouter>
  </AuthContext.Provider>
);

it("a finished quest's celebration step shows its certificate with the child's name", () => {
  render(at(
    <CertificateStep
      step={{ type: "certificate", kind: "category" }}
      result={{ summary: { categoryTitle: "Number - Fractions" } }}
      year={3}
      subjectName="Maths"
      childName="Ada"
    />
  ));
  expect(screen.getByRole("heading", { name: "Your quest certificate" })).toBeTruthy();
  const card = document.querySelector(".certificate");
  expect(card.textContent).toContain("Ada");
  expect(card.textContent).toContain("finished every topic in the Number - Fractions quest");
  expect(screen.getByRole("button", { name: /Print or save/ })).toBeTruthy();
});

it("a topic's sticker opens its certificate in a dialog, and Escape closes it", () => {
  render(at(
    <StickerStep
      step={{ sticker: { topicId: "tenths", name: "Tenths", icon: "🍕" } }}
      year={3}
      subjectName="Maths"
      childName="Ada"
    />
  ));
  fireEvent.click(screen.getByRole("button", { name: /See my certificate/ }));
  const dialog = screen.getByRole("dialog");
  expect(dialog.textContent).toContain("finished every challenge in the Tenths topic");
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).toBeNull();
});
