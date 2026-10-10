import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import BixJokeCard from "../../src/components/mascot/BixJokeCard";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, isNarrationSupported: () => false }));

it("the end-of-topic joke is child-paced: one button, setup, punchline, another", () => {
  render(<BixJokeCard />);
  const button = screen.getByRole("button", { name: "Tell me a joke" });
  fireEvent.click(button);
  expect(button.textContent).toBe("Tell me!");
  expect(document.querySelector(".mascot-joke-punchline")).toBeNull();
  fireEvent.click(button);
  expect(document.querySelector(".mascot-joke-punchline")).not.toBeNull();
  expect(button.textContent).toBe("Tell me another");
  const first = document.querySelector(".mascot-joke-setup").textContent;
  fireEvent.click(button);
  expect(document.querySelector(".mascot-joke-setup").textContent).not.toBe(first);
});
