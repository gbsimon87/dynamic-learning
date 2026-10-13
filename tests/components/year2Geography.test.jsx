import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { YEAR2_GEOGRAPHY_BUILDERS, YEAR2_GEOGRAPHY_TOPICS } from "../../src/data/challenges/geography/year2/index";
import Year2GeographyGame from "../../src/pages/skills/geography/challenges/year2/Year2GeographyGame";
import GeographyVisual from "../../src/components/challenge/geography/GeographyVisual";
import Credits from "../../src/pages/credits/Credits";
import manifest from "../../src/assets/geography/manifest.json";
import { DataRound } from "../../src/components/challenge/data/DataChallenge";
import { buildGeographyTopic } from "../../src/data/challenges/geography/engine";

const narration = vi.hoisted(() => ({ enabled: false, spoken: [] }));
vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async text => { narration.spoken.push(text); }, isNarrationSupported: () => narration.enabled }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));
// jsdom has no drag geometry. This isolates ordering state; actual browser drag/keyboard review is pending.
vi.mock("../../src/components/challenge/DragToOrder", () => ({ default: ({ items, onReorder, disabled }) => <div>{items.map(i => <button key={i.id} disabled={disabled} onClick={() => onReorder([i, ...items.filter(j => j.id !== i.id)])}>Move {i.id} first</button>)}</div> }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); narration.enabled = false; narration.spoken = []; });
const show = ui => render(<MemoryRouter>{ui}</MemoryRouter>);
const modules = import.meta.glob("../../src/pages/skills/geography/challenges/year2/*/*Challenge*.jsx", { eager: true });

it("all 56 Year 2 wrapper paths open notes and a five-round run", () => {
  expect(Object.keys(modules)).toHaveLength(56);
  for (const { default: Challenge } of Object.values(modules)) {
    const { unmount } = show(<Challenge onComplete={vi.fn()} />);
    expect(screen.getByRole("region", { name: "Bix's field notes" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
    expect(screen.getByText("Question 1 of 5")).toBeTruthy();
    expect(document.activeElement.className).toBe("challenge-title");
    unmount();
  }
}, 30000);

it("Year 2 map questions show four directions and an explicit rotated north arrow", () => {
  const bank = YEAR2_GEOGRAPHY_TOPICS["compass-directions-and-routes"];
  const { unmount } = show(<GeographyVisual visual={bank.lessons[0].notes.visual} />);
  expect(screen.getByRole("img").textContent).toContain("North");
  expect(screen.getByRole("img").textContent).not.toContain("NE");
  expect(screen.getByRole("img").textContent).not.toContain("Eastings");
  unmount();
  const { container } = show(<GeographyVisual visual={bank.lessons[1].bank[4].visual} />);
  expect(screen.getByRole("img").getAttribute("aria-label")).toContain("North is right");
  expect(container.querySelector(".geo-north path").getAttribute("d")).toContain("M-22,0 L0,0");
  expect(screen.getByRole("list", { name: "Map key" }).textContent).toContain("Start");
  expect(screen.getByRole("list", { name: "Map key" }).textContent).toContain("Tree");
});

it("sort retries show a hint and notes reopening preserves the child's placements", () => {
  vi.spyOn(Math, "random").mockReturnValue(.375);
  const q = YEAR2_GEOGRAPHY_BUILDERS["symbols-and-map-keys"](3, () => .375).questions[0];
  const done = vi.fn();
  show(<Year2GeographyGame topicId="symbols-and-map-keys" level={3} onComplete={done} />);
  fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
  for (const card of q.cards) {
    fireEvent.click(within(screen.getByRole("group", { name: "Cards to sort" })).getByRole("button", { name: card.label, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: q.bins[0].label, exact: true }));
  }
  for (let miss = 0; miss < 2; miss++) fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
  expect(screen.getByText("Question 1 of 5")).toBeTruthy();
  expect(document.querySelector(".challenge-hint")).toBeTruthy();
  const before = document.querySelector(".sort-bins").textContent;
  fireEvent.click(screen.getByRole("button", { name: "📖 Bix's field notes" }));
  fireEvent.click(screen.getByRole("button", { name: "Back to my question" }));
  expect(document.querySelector(".sort-bins").textContent).toBe(before);
  expect(done).not.toHaveBeenCalled();
});

it("each bundled Year 2 photograph retains its equivalent and retry after failure", () => {
  for (const image of ["whitby-harbour", "whitby-aerial", "peramu-homes", "peramu-building"]) {
    const a = manifest.images[image];
    const { unmount } = show(<GeographyVisual visual={{ type: "photo", title: a.title, alt: a.alt, lines: [], image }} />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("status").textContent).toContain(a.alt);
    fireEvent.click(screen.getByRole("button", { name: "Try the picture again" }));
    expect(screen.getByRole("img").getAttribute("src")).toContain("geo_retry=1");
    unmount();
  }
});

it("Year 2 photo licences and conversion notes are linked in credits", () => {
  const { container } = show(<Credits />);
  for (const id of ["whitby-harbour", "whitby-aerial", "peramu-homes", "peramu-building"]) {
    const a = manifest.images[id], li = container.querySelector(`#geography-${id}`);
    expect(li.textContent).toContain(a.creator);
    expect(li.textContent).toContain(a.adapted);
    expect(within(li).getByRole("link", { name: a.licence }).getAttribute("href")).toBe(a.licenceUrl);
  }
});

it("notes and question narration are available on request, including labelled weather choices", async () => {
  narration.enabled = true;
  vi.spyOn(Math, "random").mockReturnValue(.375);
  show(<Year2GeographyGame topicId="weather-records" level={1} onComplete={vi.fn()} />);
  expect(narration.spoken).toHaveLength(0);
  fireEvent.click(screen.getByRole("button", { name: /Read Bix's field notes/ }));
  await act(async () => {});
  expect(narration.spoken.at(-1)).toContain("Weather describes");
  fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
  await act(async () => fireEvent.click(screen.getByRole("button", { name: /Read it to me/ })));
  expect(narration.spoken.at(-1)).toContain("Choices:");
  fireEvent.click(screen.getByRole("button", { name: /Read the evidence/ }));
  await act(async () => {});
  expect(narration.spoken.at(-1)).toContain("sunny");
});

for(const [topicId,build] of Object.entries(YEAR2_GEOGRAPHY_BUILDERS)) it(`${topicId}: all four runs, retries, hints, notes state and completion payload`,async()=>{
  vi.useFakeTimers();vi.spyOn(Math,"random").mockReturnValue(.375);
  for(const level of [1,2,3,4]) {
    document.body.classList.toggle("dark",level%2===0);
    const done=vi.fn(),expected=build(level,()=>.375).questions;
    const {unmount}=show(<Year2GeographyGame topicId={topicId} level={level} onComplete={done} />);
    fireEvent.click(screen.getByRole("button",{name:"Let's explore!"}));
    for(const [index,q] of expected.entries()) {
      expect(screen.getByText(`Question ${index+1} of 5`)).toBeTruthy();
      const check=()=>fireEvent.click(screen.getByRole("button",{name:"Check my answer"}));
      if(q.kind==="choice"||q.kind==="chart") {
        if(index===0) {
          for(let miss=0;miss<2;miss++) {fireEvent.click(screen.getByRole("button",{name:String(q.options.find(v=>v!==q.answer)),exact:true}));check();}
          expect(screen.getByText("Question 1 of 5")).toBeTruthy();
          expect(document.querySelector(".challenge-hint")).toBeTruthy();
          expect(done).not.toHaveBeenCalled();
        }
        const answer=screen.getByRole("button",{name:String(q.answer),exact:true});
        fireEvent.click(answer);
        fireEvent.click(screen.getByRole("button",{name:"📖 Bix's field notes"}));
        expect(screen.getByRole("region",{name:"Bix's field notes"})).toBeTruthy();
        fireEvent.click(screen.getByRole("button",{name:"Back to my question"}));
        expect(answer.getAttribute("aria-pressed")).toBe("true");
        expect(document.activeElement.textContent).toBe("📖 Bix's field notes");
      } else if(q.kind==="sort") {
        for(const card of q.cards) {
          fireEvent.click(within(screen.getByRole("group",{name:"Cards to sort"})).getByRole("button",{name:card.label,exact:true}));
          fireEvent.click(screen.getByRole("button",{name:q.bins.find(b=>b.id===card.bin).label,exact:true}));
        }
      } else if(q.kind==="order") {
        for(const id of [...q.answer].reverse()) fireEvent.click(screen.getByRole("button",{name:`Move ${id} first`}));
      }
      check();await act(async()=>vi.advanceTimersByTime(1000));
    }
    expect(done).toHaveBeenCalledTimes(1);expect(done.mock.calls[0][0]).toHaveProperty("combos");
    await act(async()=>vi.advanceTimersByTime(2000));expect(done).toHaveBeenCalledTimes(1);
    unmount();
  }
},30000);

it("every authored template renders its evidence and accepts the correct control response", () => {
  let count = 0;
  for (const topic of Object.values(YEAR2_GEOGRAPHY_TOPICS)) for (const [index, lesson] of topic.lessons.entries()) for (const template of lesson.bank) {
    const bank = [template, ...lesson.bank.filter(q => q !== template).slice(0, 4)];
    const lessons = topic.lessons.map((l, i) => i === index ? { ...l, bank } : l);
    const q = buildGeographyTopic({ ...topic, lessons })(index + 1, () => .375).questions.find(q => q.prompt === template.prompt);
    const submit = vi.fn();
    const { unmount } = show(<DataRound question={q} submit={submit} locked={false} hint={false} renderVisual={q => <GeographyVisual visual={q.visual} sources={q.sources} />} />);
    expect(screen.getByText(q.prompt, { exact: true })).toBeTruthy();
    expect(document.querySelector(".geo-description").textContent).toContain(q.visual.alt);
    const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    if (q.kind === "choice") {
      expect(screen.getByRole("button", { name: "Check my answer" }).disabled).toBe(true);
      fireEvent.click(screen.getByRole("button", { name: q.options.find(v => v !== q.answer), exact: true }));
      check(); expect(submit).toHaveBeenLastCalledWith(false);
      fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
    } else if (q.kind === "sort") {
      for (const card of q.cards) {
        fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
        fireEvent.click(screen.getByRole("button", { name: q.bins.find(bin => bin.id === card.bin).label, exact: true }));
      }
    } else if (q.kind === "order") {
      check(); expect(submit).toHaveBeenLastCalledWith(false);
      for (const id of [...q.answer].reverse()) fireEvent.click(screen.getByRole("button", { name: `Move ${id} first` }));
    }
    check(); expect(submit).toHaveBeenLastCalledWith(true);
    unmount(); count++;
  }
  expect(count).toBe(403);
}, 60000);

it("invalid or inherited topic identifiers and invalid levels show a safe fallback without completion", () => {
  const done = vi.fn();
  for (const topicId of ["missing", "constructor", "__proto__", "toString", '<img src=x onerror="alert(1)">', undefined]) {
    const { container, unmount } = show(<Year2GeographyGame topicId={topicId} level={1} onComplete={done} />);
    expect(screen.getByRole("status").textContent).toContain("could not open");
    expect(screen.getByRole("link").getAttribute("href")).toBe("/curriculum/year/2/geography");
    expect(container.querySelector("img,script")).toBeNull(); unmount();
  }
  for (const level of [0, 5, "1", 1.5, NaN, Infinity]) {
    const { unmount } = show(<Year2GeographyGame topicId="weather-records" level={level} onComplete={done} />);
    expect(screen.getByRole("status")).toBeTruthy(); unmount();
  }
  expect(done).not.toHaveBeenCalled();
});

it("changing Year 2 topic or slot starts fresh and cancels the outgoing success timer", async () => {
  vi.useFakeTimers(); vi.spyOn(Math, "random").mockReturnValue(.375);
  const done = vi.fn();
  const { rerender } = show(<Year2GeographyGame topicId="weather-records" level={1} onComplete={done} />);
  fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
  for (const [index, q] of YEAR2_GEOGRAPHY_BUILDERS["weather-records"](1, () => .375).questions.entries()) {
    fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    if (index < 4) await act(async () => vi.advanceTimersByTime(1000));
  }
  rerender(<MemoryRouter><Year2GeographyGame topicId="weather-records" level={2} onComplete={done} /></MemoryRouter>);
  await act(async () => vi.advanceTimersByTime(2000));
  expect(done).not.toHaveBeenCalled();
  expect(screen.getByRole("region", { name: "Bix's field notes" })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
  expect(screen.getByText("Question 1 of 5")).toBeTruthy();
  rerender(<MemoryRouter><Year2GeographyGame topicId="uk-places-and-landscapes" level={2} onComplete={done} /></MemoryRouter>);
  expect(screen.getByRole("region", { name: "Bix's field notes" })).toBeTruthy();
});

it("unmounting during the last success pause never completes an abandoned Year 2 run", async () => {
  vi.useFakeTimers(); vi.spyOn(Math, "random").mockReturnValue(.375);
  const done = vi.fn();
  const { unmount } = show(<Year2GeographyGame topicId="weather-records" level={1} onComplete={done} />);
  fireEvent.click(screen.getByRole("button", { name: "Let's explore!" }));
  for (const [index, q] of YEAR2_GEOGRAPHY_BUILDERS["weather-records"](1, () => .375).questions.entries()) {
    fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    if (index < 4) await act(async () => vi.advanceTimersByTime(1000));
  }
  unmount(); await act(async () => vi.advanceTimersByTime(2000));
  expect(done).not.toHaveBeenCalled();
});

it("Year 2 descriptions name key shapes and omit north arrows for unoriented sketches", () => {
  const q = YEAR2_GEOGRAPHY_TOPICS["making-a-simple-map"].lessons[2].bank[0];
  const { unmount } = show(<GeographyVisual visual={q.visual} />);
  expect(screen.getByRole("list", { name: "Map key" }).textContent).toContain("Building (Roofed square)");
  expect(document.querySelector(".geo-description").textContent).toContain("Water, Wavy lines");
  unmount();
  const pair = YEAR2_GEOGRAPHY_TOPICS["aerial-views-and-landmarks"].lessons[2].notes.visual;
  const sketch = pair.maps.find(v => v.type === "ks1");
  const { container } = show(<GeographyVisual visual={sketch} />);
  expect(container.querySelector(".geo-north")).toBeNull();
  expect(screen.getByText(/No compass orientation is assigned/)).toBeTruthy();
});

it("Year 2 map labels and evidence render HTML payloads as literal text", () => {
  const original = YEAR2_GEOGRAPHY_TOPICS["symbols-and-map-keys"].lessons[1].notes.visual;
  const payload = '<img src=x onerror="alert(1)"><script>alert(2)</script>';
  const visual = { ...original, title: payload, alt: payload, lines: [payload], features: original.features.map(f => ({ ...f, label: payload })) };
  const { container } = show(<GeographyVisual visual={visual} sources={["constructor", "__proto__", "https://outside.example/asset"]} />);
  expect(container.textContent).toContain(payload);
  expect(container.querySelector("img, script")).toBeNull();
  expect(screen.queryByRole("link")).toBeNull();
});

