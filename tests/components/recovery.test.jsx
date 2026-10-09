import { fireEvent, render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { beforeEach, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { ForgotPassword, ResetPassword } from "../../src/pages/auth/PasswordRecovery";

const fake = vi.hoisted(() => ({ requestPasswordReset: vi.fn(), resetPassword: vi.fn() }));
vi.mock("../../src/data/store", () => ({ store: fake }));
beforeEach(() => { fake.requestPasswordReset.mockReset(); fake.resetPassword.mockReset(); window.history.replaceState(null, "", "/"); });
it("recovery request shows the same non-enumerating email message", async () => {
  fake.requestPasswordReset.mockResolvedValue({ accepted: true });
  render(<MemoryRouter><ForgotPassword /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "known@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));
  expect((await screen.findByRole("status")).textContent).toMatch(/If an account uses that email/);
});
it("StrictMode retains the fragment token in memory and validates matching passwords", async () => {
  const token = "a".repeat(64);
  window.history.replaceState(null, "", `/reset-password#token=${token}`);
  fake.resetPassword.mockResolvedValue({ reset: true });
  render(<StrictMode><MemoryRouter><ResetPassword /></MemoryRouter></StrictMode>);
  expect(window.location.hash).toBe("");
  fireEvent.change(screen.getByLabelText("New password"), { target: { value: "new-password" } });
  fireEvent.change(screen.getByLabelText("Repeat new password"), { target: { value: "different" } });
  fireEvent.click(screen.getByRole("button", { name: "Save new password" }));
  expect(fake.resetPassword).not.toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText("Repeat new password"), { target: { value: "new-password" } });
  fireEvent.click(screen.getByRole("button", { name: "Save new password" }));
  await screen.findByText("Password saved");
  expect(fake.resetPassword).toHaveBeenCalledExactlyOnceWith({ token, password: "new-password" });
});
