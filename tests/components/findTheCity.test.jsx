import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import cities from "../../src/data/cities.json";
import FindTheCity from "../../src/pages/skills/geography/FindTheCity";

// Leaflet needs real layout; the game only needs to hear a tap on the map.
const map = vi.hoisted(() => ({ click: null }));
vi.mock("react-leaflet", () => {
  const stub = { flyTo: () => {}, flyToBounds: () => {}, getSize: () => ({ x: 1200 }), invalidateSize: () => {}, getContainer: () => document.body };
  return {
    MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
    TileLayer: () => null,
    Polyline: ({ children }) => <div data-testid="line">{children}</div>,
    CircleMarker: ({ children }) => <div>{children}</div>,
    Tooltip: ({ children }) => <span>{children}</span>,
    useMap: () => stub,
    useMapEvents: (handlers) => { map.click = handlers.click; return null; },
  };
});
vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => () => {} }));

beforeEach(() => { map.click = null; });
afterEach(() => vi.restoreAllMocks());

const play = () => render(<MemoryRouter><FindTheCity /></MemoryRouter>);
const shown = () => cities.find((c) => c.name === document.querySelector(".ftc-city").textContent);
const tap = ([lat, lng]) => act(() => map.click({ latlng: { lat, lng } }));

it("starts on a city straight away, with no start screen", () => {
  play();
  expect(screen.queryByText(/start game/i)).toBeNull();
  expect(shown()).toBeTruthy();
  expect(screen.getByRole("link", { name: /back to skills/i })).toBeTruthy();
});

it("scores a tap on the city, shows the result and moves on only when asked", () => {
  play();
  const city = shown();
  tap(city.coordinates);

  expect(document.querySelector(".ftc-result").textContent).toMatch(new RegExp(`You found ${city.name}`));
  expect(document.querySelector(".ftc-score-found b").textContent).toBe("1");

  // A second tap on the same city is ignored.
  tap(city.coordinates);
  expect(document.querySelector(".ftc-score-found b").textContent).toBe("1");

  fireEvent.click(screen.getByRole("button", { name: /next city/i }));
  expect(document.querySelector(".ftc-result")).toBeNull();
  expect(screen.getByText(/tap the map where it is/i)).toBeTruthy();
});

it("says so when the tap is far away and does not score it", () => {
  play();
  const city = shown();
  const [lat, lng] = city.coordinates;
  tap([-lat, lng > 0 ? lng - 150 : lng + 150]);

  expect(document.querySelector(".ftc-result").textContent).toMatch(/Not quite/);
  expect(document.querySelector(".ftc-score-found b").textContent).toBe("0");
});

it("reveals the country on request", () => {
  play();
  const city = shown();
  fireEvent.click(screen.getByRole("button", { name: /hint/i }));
  expect(screen.getByText(new RegExp(`is in ${city.country}`))).toBeTruthy();
});

it("plays every city once, then offers another go", () => {
  play();
  const seen = new Set();
  for (let i = 0; i < cities.length; i++) {
    const city = shown();
    seen.add(city.name);
    tap(city.coordinates);
    fireEvent.click(screen.getByRole("button", { name: /next city/i }));
  }
  expect(seen.size).toBe(cities.length);
  expect(screen.getByText(`All ${cities.length} cities done!`)).toBeTruthy();

  fireEvent.click(screen.getByRole("button", { name: /play again/i }));
  expect(document.querySelector(".ftc-score-found b").textContent).toBe("0");
  expect(shown()).toBeTruthy();
});
