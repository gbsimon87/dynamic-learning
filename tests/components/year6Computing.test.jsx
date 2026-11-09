import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("../../src/utils/speech",()=>({speak:()=>{},stopNarration:()=>{},speakAndWait:async()=>{},isNarrationSupported:()=>false}));
vi.mock("../../src/components/celebration/sound/player",()=>({playCue:()=>()=>{},isMuted:()=>true,setMuted:()=>{},subscribe:()=>()=>{}}));
vi.mock("../../src/components/celebration/fx/effects",()=>({playEffect:()=>{}}));
afterEach(cleanup);

// Every built Year 6 Computing slot opens on Bix's notes, then its five rounds.
const games=import.meta.glob("../../src/pages/skills/computing/challenges/year6/*/*Challenge*.jsx",{eager:true});

it("every built Year 6 Computing challenge opens on Bix's notes and starts its rounds",()=>{
  expect(Object.keys(games)).toHaveLength(68);
  for(const {default:Challenge} of Object.values(games)) {
    const {unmount}=render(<MemoryRouter><Challenge onComplete={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("region",{name:"Bix's notes"})).toBeTruthy();
    fireEvent.click(screen.getByRole("button",{name:"Let's go!"}));
    expect(screen.getByText("Question 1 of 5")).toBeTruthy();
    unmount();
  }
},60000);
