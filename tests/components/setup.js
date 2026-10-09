import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Node 25's storage globals can shadow jsdom's accessors. Use isolated,
// synchronous Web Storage shims for these component tests.
function storage() {
  const memory = new Map();
  return { getItem: (key) => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, String(value)),
    removeItem: (key) => memory.delete(key), clear: () => memory.clear() };
}
vi.stubGlobal("localStorage", storage());
vi.stubGlobal("sessionStorage", storage());
Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, value: () => {} });

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});
