import { act, fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { useState } from "react";
import ProfileBuilder from "../../src/pages/auth/ProfileBuilder";
import SpeedReader from "../../src/pages/skills/english/SpeedReader";
import ReadingView from "../../src/pages/skills/english/ReadingView";
import { MAX_TEXT_CHARS, tokenize } from "../../src/hooks/spritzTiming";

it("profile input and preview render script-like text literally and reject overlong names", () => {
  const save = vi.fn();
  const { container } = render(<ProfileBuilder title="Profile" nameLabel="Nickname" saveLabel="Save" onSave={save} />);
  fireEvent.change(screen.getByLabelText("Nickname"), { target: { value: "<b>Mia</b>" } });
  expect(container.querySelector(".pb-preview-chip").textContent).toContain("<b>Mia</b>");
  expect(container.querySelector(".pb-preview-chip b")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Save", exact: true }));
  expect(save).toHaveBeenCalledWith(expect.objectContaining({ name: "<b>Mia</b>" }));
  fireEvent.change(screen.getByLabelText("Nickname"), { target: { value: '<img src=x onerror="alert(1)">' } });
  expect(container.querySelector(".pb-preview-chip img")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Save", exact: true }));
  expect(save).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("alert").textContent).toContain("20 characters");
});

it("custom story textarea bounds pasted input without stripping markup or punctuation", () => {
  render(<SpeedReader />);
  const textarea = screen.getByLabelText("Your story");
  const text = 'O’Brien <script>alert(1)</script> <img src=x onerror=alert(2)>';
  fireEvent.change(textarea, { target: { value: text } });
  expect(textarea.value).toBe(text);
  expect(textarea.maxLength).toBe(MAX_TEXT_CHARS);
  fireEvent.change(textarea, { target: { value: "x".repeat(MAX_TEXT_CHARS + 1000) } });
  expect(textarea.value.length).toBe(MAX_TEXT_CHARS);
  expect(tokenize("x".repeat(MAX_TEXT_CHARS + 1000))[0].text.length).toBe(MAX_TEXT_CHARS);
});

it("the reading stage never turns story text into HTML with either pivot mode", async () => {
  vi.useFakeTimers();
  try {
    function Story() {
      const [wpm, setWpm] = useState(100);
      return <ReadingView text="<script>alert(1)</script>" wpm={wpm} chunkSize={1} showPivot={false} onWpmChange={setWpm} onFinish={() => {}} />;
    }
    const { container, unmount } = render(<Story />);
    for (let i = 0; i < 4; i++) await act(async () => { vi.advanceTimersByTime(700); });
    expect(container.querySelector(".sr-word").textContent).toBe("<script>alert(1)</script>");
    expect(container.querySelector("script")).toBeNull();
    unmount();
    const pivot = render(<ReadingView text="<img/src=x/onerror=alert(1)>" wpm={100} chunkSize={1} showPivot onWpmChange={() => {}} onFinish={() => {}} />);
    for (let i = 0; i < 4; i++) await act(async () => { vi.advanceTimersByTime(700); });
    expect(pivot.container.querySelector(".sr-word").textContent).toBe("<img/src=x/onerror=alert(1)>");
    expect(pivot.container.querySelector("img")).toBeNull();
    pivot.unmount();
  } finally { vi.useRealTimers(); }
});
