import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { YEAR3_GEOGRAPHY_BUILDERS } from "../../src/data/challenges/geography/year3/index";
import Year3GeographyGame from "../../src/pages/skills/geography/challenges/year3/Year3GeographyGame";
import GeographyVisual from "../../src/components/challenge/geography/GeographyVisual";
import Credits from "../../src/pages/credits/Credits";
import manifest from "../../src/assets/geography/manifest.json";
import { seededRng } from "../../src/data/challenges/questionKinds";

const narration=vi.hoisted(()=>({enabled:false,spoken:[]}));
vi.mock("../../src/utils/speech",()=>({speak:()=>{},stopNarration:()=>{},speakAndWait:async(text)=>{narration.spoken.push(text);},isNarrationSupported:()=>narration.enabled}));
vi.mock("../../src/components/celebration/sound/player",()=>({playCue:()=>()=>{},isMuted:()=>true,setMuted:()=>{},subscribe:()=>()=>{}}));
vi.mock("../../src/components/celebration/fx/effects",()=>({playEffect:()=>{}}));
// jsdom lacks drag geometry; browser verification uses the actual keyboard controls.
vi.mock("../../src/components/challenge/DragToOrder",()=>({default:({items,onReorder,disabled})=><div>{items.map(i=><button key={i.id} disabled={disabled} onClick={()=>onReorder([i,...items.filter(j=>j.id!==i.id)])}>Move {i.id} first</button>)}</div>}));
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.useRealTimers();document.body.classList.remove("dark");narration.enabled=false;narration.spoken=[];});
const show=ui=>render(<MemoryRouter>{ui}</MemoryRouter>);
const modules=import.meta.glob("../../src/pages/skills/geography/challenges/year3/*/*Challenge*.jsx",{eager:true});

it("requested narration follows the remaining choices after a hint",async()=>{
  narration.enabled=true;vi.spyOn(Math,"random").mockReturnValue(.375);
  const q=YEAR3_GEOGRAPHY_BUILDERS["counties-cities-and-regions"](1,()=>.375).questions[0];
  show(<Year3GeographyGame topicId="counties-cities-and-regions" level={1} onComplete={vi.fn()} />);
  fireEvent.click(screen.getByRole("button",{name:"Let's explore!"}));
  const wrong=q.options.find(v=>v!==q.answer);
  for(let i=0;i<2;i++) {fireEvent.click(screen.getByRole("button",{name:wrong,exact:true}));fireEvent.click(screen.getByRole("button",{name:"Check my answer"}));}
  expect(screen.queryByRole("button",{name:wrong,exact:true})).toBeNull();
  await act(async()=>fireEvent.click(screen.getByRole("button",{name:/Read it to me/})));
  expect(narration.spoken.at(-1)).toContain(q.answer);
  expect(narration.spoken.at(-1)).not.toContain(wrong);
});

it("read-aloud follows the child's reordered cards",async()=>{
  narration.enabled=true;vi.spyOn(Math,"random").mockReturnValue(.375);
  const q=YEAR3_GEOGRAPHY_BUILDERS["the-water-cycle"](3,()=>.375).questions[0];
  show(<Year3GeographyGame topicId="the-water-cycle" level={3} onComplete={vi.fn()} />);
  fireEvent.click(screen.getByRole("button",{name:"Let's explore!"}));
  const moved=q.items.at(-1);
  fireEvent.click(screen.getByRole("button",{name:`Move ${moved.id} first`}));
  await act(async()=>fireEvent.click(screen.getByRole("button",{name:/Read it to me/})));
  const order=[moved,...q.items.filter(i=>i!==moved)].map(i=>i.label).join("; ");
  expect(narration.spoken.at(-1)).toContain(order);
});

it("read-aloud follows cards moved into sorting headings",async()=>{
  narration.enabled=true;vi.spyOn(Math,"random").mockImplementation(seededRng(3));
  const topicId="surveying-local-land-use";
  const q=YEAR3_GEOGRAPHY_BUILDERS[topicId](1,seededRng(3)).questions[0],card=q.cards[0],bin=q.bins[0];
  show(<Year3GeographyGame topicId={topicId} level={1} onComplete={vi.fn()} />);
  fireEvent.click(screen.getByRole("button",{name:"Let's explore!"}));
  fireEvent.click(within(screen.getByRole("group",{name:"Cards to sort"})).getByRole("button",{name:card.label,exact:true}));
  fireEvent.click(screen.getByRole("button",{name:bin.label,exact:true}));
  await act(async()=>fireEvent.click(screen.getByRole("button",{name:/Read it to me/})));
  expect(narration.spoken.at(-1)).toContain(`${bin.label}: ${card.label}`);
  expect(narration.spoken.at(-1).split("Headings:")[0]).not.toContain(card.label);
});

it("all 64 geography wrapper paths open notes and a five-round run",()=>{
  expect(Object.keys(modules)).toHaveLength(64);
  for(const {default:Challenge} of Object.values(modules)) {
    const {unmount}=show(<Challenge onComplete={vi.fn()} />);
    expect(screen.getByRole("region",{name:"Bix's field notes"})).toBeTruthy();
    fireEvent.click(screen.getByRole("button",{name:"Let's explore!"}));
    expect(screen.getByText("Question 1 of 5")).toBeTruthy();
    expect(document.activeElement.className).toBe("challenge-title");
    unmount();
  }
},30000);

for(const [topicId,build] of Object.entries(YEAR3_GEOGRAPHY_BUILDERS)) it(`${topicId}: all four runs, retries, hints, notes state and completion payload`,async()=>{
  vi.useFakeTimers();vi.spyOn(Math,"random").mockReturnValue(.375);
  for(const level of [1,2,3,4]) {
    document.body.classList.toggle("dark",level%2===0);
    const done=vi.fn(),expected=build(level,()=>.375).questions;
    const {unmount}=show(<Year3GeographyGame topicId={topicId} level={level} onComplete={done} />);
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

it("photo failure preserves the evidence equivalent and offers retry",()=>{
  const q=YEAR3_GEOGRAPHY_BUILDERS["the-lake-district"](1,()=>.375).questions[0];
  show(<GeographyVisual visual={q.visual} sources={q.sources} />);
  const originalUrl=screen.getByRole("img").getAttribute("src");
  fireEvent.error(screen.getByRole("img"));
  expect(screen.getByText(/The picture could not load/)).toBeTruthy();
  expect(screen.getByText(manifest.images["lake-sheep"].alt)).toBeTruthy();
  fireEvent.click(screen.getByRole("button",{name:"Try the picture again"}));
  expect(screen.getByRole("img")).toBeTruthy();
  expect(screen.getByRole("img").getAttribute("src")).toBe(`${originalUrl}?geo_retry=1`);
});

it("unknown or inherited image and source IDs preserve the text equivalent without fetching a URL",()=>{
  for(const image of ["missing","constructor","__proto__","https://outside.example/image.webp"]) {
    const visual={type:"photo",title:"Evidence",image,alt:"A complete description",lines:["Evidence line"]};
    const {unmount}=show(<GeographyVisual visual={visual} sources={["constructor"]} />);
    expect(screen.getByRole("status").textContent).toContain(visual.alt);
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Evidence line")).toBeTruthy();
    unmount();
  }
});

it("evidence text stays literal HTML and unknown map references retain the description",()=>{
  const payload='<img src=x onerror="alert(1)"><script>alert(2)</script>';
  const visual={type:"map",view:"constructor",title:payload,alt:payload,lines:[payload]};
  const {container}=show(<GeographyVisual visual={visual} />);
  expect(screen.getByRole("status").textContent).toContain(payload);
  expect(container.querySelector("img, script")).toBeNull();
});

it("a failed photo does not hide a different photo when the visual changes",()=>{
  const visual={type:"photo",title:"Evidence",image:"lake-sheep",alt:"Description",lines:[]};
  const {rerender}=show(<GeographyVisual visual={visual} />);
  fireEvent.error(screen.getByRole("img"));
  rerender(<MemoryRouter><GeographyVisual visual={{...visual,image:"naples-port"}} /></MemoryRouter>);
  expect(screen.getByRole("img").getAttribute("src")).toContain("naples-port");
  expect(screen.queryByRole("status")).toBeNull();
});

it("OS map failures preserve the grid and retry with a fresh bundled URL",()=>{
  const q=YEAR3_GEOGRAPHY_BUILDERS["four-figure-grid-references"](3,()=>.375).questions[0];
  const {container}=show(<GeographyVisual visual={q.visual} />);
  const image=container.querySelector("svg image"),originalUrl=image.getAttribute("href");
  fireEvent.error(image);
  expect(screen.getByRole("status").textContent).toContain(q.visual.alt);
  expect(screen.getByRole("img",{name:q.visual.alt})).toBeTruthy();
  fireEvent.click(screen.getByRole("button",{name:"Try the map again"}));
  expect(container.querySelector("svg image").getAttribute("href")).toBe(`${originalUrl}?geo_retry=1`);
});

it("the OS extract exposes its actual key and the equivalent grid boundaries",()=>{
  const q=YEAR3_GEOGRAPHY_BUILDERS["four-figure-grid-references"](3,()=>.375).questions[0];
  show(<GeographyVisual visual={q.visual} sources={q.sources} />);
  expect(screen.getByRole("img",{name:q.visual.alt})).toBeTruthy();
  expect(screen.getByRole("img",{name:manifest.images["os-water-key"].alt})).toBeTruthy();
  expect(screen.getByRole("img",{name:manifest.images["os-land-key"].alt})).toBeTruthy();
});

it("credits include every geography asset with its source and licence",()=>{
  const {container}=show(<Credits />);
  for(const [id,a] of Object.entries(manifest.images)) {
    const li=container.querySelector(`#geography-${id}`);
    expect(li.textContent).toContain(a.attribution);
    expect(within(li).getByRole("link",{name:a.licence}).getAttribute("href")).toBe(a.licenceUrl);
  }
});
