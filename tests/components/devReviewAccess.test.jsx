import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { AvatarPicker } from "../../src/pages/auth/ProfilePickers";
import { AVATARS_UNLOCKABLE } from "../../src/data/badges";
import { HOSTED_DEV_HOSTNAME, shouldBypassLocks } from "../../src/data/devUnlock";
import { buildLockState } from "../../src/data/curriculumLocks";

const originalLocation = globalThis.location;

afterEach(() => {
  cleanup();
  vi.stubGlobal("location", originalLocation);
  vi.unstubAllEnvs();
});

function hosted(hostname) {
  vi.stubEnv("DEV", false);
  vi.stubEnv("VITE_UNLOCK_ALL", "true");
  vi.stubGlobal("location", { hostname });
}

it("hosted dev allows selecting every reward avatar without earning badges", () => {
  hosted(HOSTED_DEV_HOSTNAME);
  const onChange = vi.fn();
  const unlocked = [];
  render(<AvatarPicker onChange={onChange} unlocked={unlocked} />);
  for (const emoji of AVATARS_UNLOCKABLE) {
    fireEvent.click(screen.getByRole("button", { name: `Choose the ${emoji} picture` }));
    expect(onChange).toHaveBeenLastCalledWith(emoji);
  }
  expect(screen.queryAllByRole("img")).toHaveLength(0);
  expect(unlocked).toEqual([]);
});

it("main production retains earned-only avatar access despite the local unlock flag", () => {
  hosted("learnwithbix.com");
  const unlocked = [AVATARS_UNLOCKABLE[0]];
  render(<AvatarPicker onChange={() => {}} unlocked={unlocked} />);
  expect(screen.getByRole("button", { name: `Choose the ${unlocked[0]} picture` })).toBeTruthy();
  expect(screen.queryByRole("button", { name: `Choose the ${AVATARS_UNLOCKABLE[1]} picture` })).toBeNull();
  expect(screen.getAllByRole("img")).toHaveLength(AVATARS_UNLOCKABLE.length - 1);
});

it("hosted review opens built challenges without completing or exposing missing content", () => {
  const curriculum = [{ id: "category", topics: [{ id: "topic", challenges: [1, 2, 3, 4].map(id => ({ id })) }] }];
  const progress = {};
  const isBuilt = (_, id) => id !== 4;
  const state = hostname => buildLockState({ curriculum, progress, isBuilt,
    bypassLocks: shouldBypassLocks({ DEV: false }, hostname) });
  expect(state(HOSTED_DEV_HOSTNAME)[0].topics[0].challenges[2].locked).toBe(false);
  expect(state("learnwithbix.com")[0].topics[0].challenges[2].locked).toBe(true);
  expect(state(HOSTED_DEV_HOSTNAME)[0].topics[0].challenges[3].missing).toBe(true);
  expect(progress).toEqual({});
});
