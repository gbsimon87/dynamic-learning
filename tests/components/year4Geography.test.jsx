import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { YEAR4_GEOGRAPHY_BUILDERS } from "../../src/data/challenges/geography/year4/index";
import Year4GeographyGame from "../../src/pages/skills/geography/challenges/year4/Year4GeographyGame";
import GeographyVisual from "../../src/components/challenge/geography/GeographyVisual";

const narration=vi.hoisted(()=>({enabled:false,spoken:[]}));
vi.mock("../../src/utils/speech",()=>({speak:()=>{},stopNarration:()=>{},speakAndWait:async(text)=>{narration.spoken.push(text);},isNarrationSupported:()=>narration.enabled}));
vi.mock("../../src/components/celebration/sound/player",()=>({playCue:()=>()=>{},isMuted:()=>true,setMuted:()=>{},subscribe:()=>()=>{}}));
vi.mock("../../src/components/celebration/fx/effects",()=>({playEffect:()=>{}}));
// jsdom lacks drag geometry; browser verification uses the actual keyboard controls.
vi.mock("../../src/components/challenge/DragToOrder",()=>({default:({items,onReorder,disabled})=><div>{items.map(i=><button key={i.id} disabled={disabled} onClick={()=>onReorder([i,...items.filter(j=>j.id!==i.id)])}>Move {i.id} first</button>)}</div>}));
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.useRealTimers();document.body.classList.remove("dark");narration.enabled=false;narration.spoken=[];});
const show=ui=>render(<MemoryRouter>{ui}</MemoryRouter>);
const modules=import.meta.glob("../../src/pages/skills/geography/challenges/year4/*/*Challenge*.jsx",{eager:true});

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

for(const [topicId,build] of Object.entries(YEAR4_GEOGRAPHY_BUILDERS)) it(`${topicId}: all four runs, retries, hints, notes state and completion payload`,async()=>{
  vi.useFakeTimers();vi.spyOn(Math,"random").mockReturnValue(.375);
  for(const level of [1,2,3,4]) {
    document.body.classList.toggle("dark",level%2===0);
    const done=vi.fn(),expected=build(level,()=>.375).questions;
    const {unmount}=show(<Year4GeographyGame topicId={topicId} level={level} onComplete={done} />);
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


const visual=(type,extra={})=>({type,title:"Evidence",alt:"A full text equivalent.",lines:["Evidence line"],...extra});

it("the map explorer switches views and a thematic layer without hiding the text equivalent",()=>{
  const v=visual("explorer",{views:[{id:"overview",label:"Overview",view:"world",extentText:"the world",markers:[{id:"A",label:"Brazil",point:[-53,-10]}]},{id:"detail",label:"Detail",view:"southAmerica",extentText:"South America",markers:[{id:"A",label:"Brasilia",point:[-47.93,-15.78]}]}],layers:[{id:"rain",label:"Rainfall layer",legend:"Dark dots show wetter places.",markers:[{id:"R",label:"Wet place",point:[-60,-3]}]}]});
  show(<GeographyVisual visual={v} />);
  const overview=screen.getByRole("button",{name:"Map view: Overview"}),detail=screen.getByRole("button",{name:"Map view: Detail"}),layer=screen.getByRole("button",{name:"Map layer: Rainfall layer"});
  expect(overview.getAttribute("aria-pressed")).toBe("true");expect(layer.getAttribute("aria-pressed")).toBe("false");
  expect(screen.getByText(/Layer off/)).toBeTruthy();
  fireEvent.click(detail);expect(detail.getAttribute("aria-pressed")).toBe("true");expect(screen.getByText(/Extent: South America/)).toBeTruthy();
  fireEvent.click(layer);expect(layer.getAttribute("aria-pressed")).toBe("true");expect(screen.getByText(/Dark dots show wetter places/)).toBeTruthy();
  expect(screen.getByText("Evidence line")).toBeTruthy();
});

it("rivers, day and night, land use, tables and tenths grids each draw with their equivalent",()=>{
  const cases=[
    visual("river",{variant:"features",letters:true}),
    visual("river",{variant:"processes"}),
    visual("daynight",{points:[{label:"Place A",lon:30},{label:"Place B",lon:-60}]}),
    visual("landuse",{cells:["HHF","HIF"],key:[{code:"H",label:"Homes"},{code:"F",label:"Farmland"},{code:"I",label:"Industry"}]}),
    visual("table",{caption:"Example data",columns:["Month","Place"],rows:[["Jan","4°C, 100 mm rain"]]}),
    visual("grid",{origin:[23,41],size:2,tenths:true,markers:[{id:"T",label:"Tree",point:[23.3,41.6]}]}),
    visual("map",{view:"uk",rivers:["Thames","Severn"],markers:[{id:"A",label:"London",point:[-0.12,51.51]}]}),
    visual("map",{view:"washington",rivers:["Columbia"],markers:[{id:"A",label:"Seattle",point:[-122.33,47.61]}]}),
  ];
  for(const v of cases) {
    const {container,unmount}=show(<GeographyVisual visual={v} />);
    expect(container.querySelector("svg, table")).toBeTruthy();
    expect(screen.getByText("Evidence line")).toBeTruthy();
    unmount();
  }
  const {container}=show(<GeographyVisual visual={cases[5]} />);
  expect(container.querySelectorAll(".geo-tenth-line").length).toBe(36);
});

it("paired dated sources draw each source with its own type and title",()=>{
  const land=(title)=>visual("landuse",{title,cells:["HF"],key:[{code:"H",label:"Homes"},{code:"F",label:"Farm"}]});
  const {container}=show(<GeographyVisual visual={visual("record",{maps:[land("Example 1990"),land("Example 2020")]})} />);
  expect(screen.getByText("Example 1990")).toBeTruthy();expect(screen.getByText("Example 2020")).toBeTruthy();
  expect(container.querySelectorAll(".geo-paired-maps svg").length).toBe(2);
});

it("the Year 4 fieldwork run shows its optional grown-up card",()=>{
  vi.spyOn(Math,"random").mockReturnValue(.375);
  show(<Year4GeographyGame topicId="local-fieldwork-enquiry" level={1} onComplete={vi.fn()} />);
  expect(screen.getByText(/With a grown-up/)).toBeTruthy();
});

it("every cited Year 4 source resolves in the on-screen Sources panel",()=>{
  const q=YEAR4_GEOGRAPHY_BUILDERS["washington-state"](1,()=>.375).questions[0];
  const {container}=show(<GeographyVisual visual={q.visual} sources={q.sources} />);
  expect(screen.queryByText("Source unavailable")).toBeNull();
  expect(container.querySelectorAll(".geo-sources a").length+container.querySelectorAll(".geo-sources li").length).toBeGreaterThan(0);
});

it("no Year 4 question shows an unavailable source",()=>{
  for(const [id,build] of Object.entries(YEAR4_GEOGRAPHY_BUILDERS)) for(const level of [1,2,3,4]) for(const q of build(level,()=>.375).questions) {
    const {unmount}=show(<GeographyVisual visual={q.visual} sources={q.sources} />);
    expect(screen.queryByText("Source unavailable"),`${id}/${level}`).toBeNull();
    unmount();
  }
},30000);
