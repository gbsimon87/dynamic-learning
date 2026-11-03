import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { noteLines } from "../../src/components/challenge/adventure/noteLines";

vi.mock("../../src/utils/speech",()=>({speak:()=>{},stopNarration:()=>{},speakAndWait:async()=>{},isNarrationSupported:()=>false}));
vi.mock("../../src/components/celebration/sound/player",()=>({playCue:()=>()=>{},isMuted:()=>true,setMuted:()=>{},subscribe:()=>()=>{}}));
vi.mock("../../src/components/celebration/fx/effects",()=>({playEffect:()=>{}}));
afterEach(cleanup);

// Every Year 5 subject authored as data opens on Bix's notes, then the rounds.
const games=import.meta.glob("../../src/pages/skills/{science,art,music,design,pe,wellbeing,french,computing}/challenges/year5/*/*Challenge1.jsx",{eager:true});

it("every Year 5 data-subject topic opens on Bix's notes and starts its rounds",()=>{
  expect(Object.keys(games)).toHaveLength(125);
  for(const {default:Challenge} of Object.values(games)) {
    const {unmount}=render(<MemoryRouter><Challenge onComplete={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("region",{name:"Bix's notes"})).toBeTruthy();
    fireEvent.click(screen.getByRole("button",{name:"Let's go!"}));
    expect(screen.getByText("Question 1 of 5")).toBeTruthy();
    expect(document.activeElement.className).toBe("challenge-title");
    unmount();
  }
},60000);

it("splits a rule into one line per sentence",()=>{
  expect(noteLines("A stave has five lines. The spaces spell FACE.")).toEqual(["A stave has five lines.","The spaces spell FACE."]);
  expect(noteLines("No full stop")).toEqual(["No full stop"]);
  expect(noteLines()).toEqual([]);
});
