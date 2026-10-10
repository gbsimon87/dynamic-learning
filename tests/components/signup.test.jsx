import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";
import { useState } from "react";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../src/context/auth-context";
import SignUpFlow from "../../src/pages/auth/signup/SignUpFlow";
import HandOver from "../../src/pages/auth/signup/HandOver";
import CodeInput from "../../src/pages/auth/signup/parts/CodeInput";
import { DRAFT_KEY, STEP, emptyDraft, serialiseDraft } from "../../src/data/signupFlow";

vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: vi.fn(), isMuted: () => true, setMuted: vi.fn(), subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: vi.fn() }));
const auth = { requestSignupCode: vi.fn(), completeSignup: vi.fn(), selectChild: vi.fn() };
beforeEach(() => { Object.values(auth).forEach((fn) => fn.mockReset()); });
const child = { _id: "existing", name: "Maya", avatar: "🦊", colour: "--profile-pink", yearGroup: 2, subjects: ["math"] };
function mountFlow() {
  return render(<MemoryRouter><AuthContext.Provider value={auth}><SignUpFlow /></AuthContext.Provider></MemoryRouter>);
}
it("under-13 gate sends no request and retains no personal draft", () => {
  mountFlow();
  // Choose the youngest year using the wheel's keyboard support.
  const wheel = screen.getByRole("listbox");
  fireEvent.keyDown(wheel, { key: "Home" });
  fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
  expect(screen.getByRole("heading", { name: "Ask a grown-up" })).toBeTruthy();
  expect(auth.requestSignupCode).not.toHaveBeenCalled();
  expect(auth.completeSignup).not.toHaveBeenCalled();
  expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
});
it("editing a profile returns to summary and Back retains the account answers", async () => {
  const draft = { ...emptyDraft(), ageBand: "18+", learnFor: "children", learners: [child], email: "grownup@example.com", cursor: { step: STEP.summary } };
  sessionStorage.setItem(DRAFT_KEY, serialiseDraft(draft));
  mountFlow();
  fireEvent.click(screen.getByRole("button", { name: "Edit Maya" }));
  fireEvent.change(screen.getByLabelText("Nickname"), { target: { value: "May" } });
  fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
  fireEvent.click(screen.getByRole("button", { name: /Year 2/ }));
  await screen.findByText("Pick a picture");
  fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
  fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
  await screen.findByRole("button", { name: "Edit May" });
  fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
  expect(screen.getByLabelText("Email address").value).toBe("grownup@example.com");
  fireEvent.click(screen.getByRole("button", { name: /Back/ }));
  expect(screen.getByRole("button", { name: "Edit May" })).toBeTruthy();
  expect(auth.requestSignupCode).not.toHaveBeenCalled();
});
it("code paste/autofill submit all six digits; typing and backspace move focus", async () => {
  const complete = vi.fn();
  function Harness() { const [value, setValue] = useState(""); return <CodeInput value={value} onChange={setValue} onComplete={complete} />; }
  render(<Harness />);
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Digit 1"), "12");
  expect(document.activeElement).toBe(screen.getByLabelText("Digit 3"));
  await user.keyboard("{Backspace}");
  expect(screen.getByLabelText("Digit 2").value).toBe("");
  expect(document.activeElement).toBe(screen.getByLabelText("Digit 2"));
  fireEvent.paste(screen.getByLabelText("Digit 2"), { clipboardData: { getData: () => "482 913" } });
  expect(complete).toHaveBeenCalledExactlyOnceWith("482913");
  fireEvent.change(screen.getByLabelText("Digit 1"), { target: { value: "123456" } });
  expect(complete).toHaveBeenLastCalledWith("123456");
});
it("hand-over prevents repeated taps and permits retry after failure", async () => {
  let reject;
  const start = vi.fn().mockImplementationOnce(() => new Promise((_resolve, no) => { reject = no; })).mockResolvedValueOnce(undefined);
  render(<HandOver result={{ parent: { accountType: "parent" }, children: [child] }} onStart={start} />);
  const button = screen.getByRole("button", { name: /I'm Maya/ });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(start).toHaveBeenCalledTimes(1);
  await act(async () => reject(new Error("offline")));
  await screen.findByRole("alert");
  fireEvent.click(button);
  await waitFor(() => expect(start).toHaveBeenCalledTimes(2));
});
