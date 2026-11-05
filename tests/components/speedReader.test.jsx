import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import SpeedReader from "../../src/pages/skills/english/SpeedReader";
import stories from "../../src/data/stories.json";

const pressed = (name) => screen.getByRole("button", { name }).getAttribute("aria-pressed");

it("starts on Easy with its short stories and a gentle pace", () => {
  render(<SpeedReader />);
  expect(pressed(/Easy/)).toBe("true");
  const easy = stories.filter((s) => s.band === "easy");
  for (const story of easy) expect(screen.getByRole("button", { name: new RegExp(story.title) })).toBeTruthy();
  expect(screen.queryByRole("button", { name: /Moon Picnic/ })).toBeNull();
  expect(screen.getByRole("slider").value).toBe("70");
});

it("a harder level swaps the stories, speed and chunk size", () => {
  render(<SpeedReader />);
  fireEvent.click(screen.getByRole("button", { name: /Hard/ }));
  expect(pressed(/Hard/)).toBe("true");
  expect(screen.getByRole("button", { name: /Moon Picnic/ })).toBeTruthy();
  expect(screen.queryByRole("button", { name: /Lost Egg/ })).toBeNull();
  expect(screen.getByRole("slider").value).toBe("160");
  expect(pressed("2")).toBe("true");
});

it("the speed slider moves the words-a-minute readout", () => {
  render(<SpeedReader />);
  fireEvent.change(screen.getByRole("slider"), { target: { value: "200" } });
  expect(screen.getByText("200")).toBeTruthy();
  expect(pressed(/Super/)).toBe("true");
});

it("writing your own story is a clear choice beside the Bix stories", () => {
  render(<SpeedReader />);
  expect(screen.queryByLabelText("Your story")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: /Your own story/ }));
  const start = screen.getByRole("button", { name: /Start Reading/ });
  expect(start.disabled).toBe(true);
  fireEvent.change(screen.getByLabelText("Your story"), { target: { value: "The cat sat down." } });
  expect(start.disabled).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: /A Bix story/ }));
  expect(screen.queryByLabelText("Your story")).toBeNull();
});
