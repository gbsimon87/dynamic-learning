import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import Challenge from '../../src/pages/curriculum/Challenge';
import Year6MathGame from '../../src/pages/skills/math/challenges/year6/Year6MathGame';
import Year6MathVisual from '../../src/pages/skills/math/challenges/year6/Year6MathVisual';
import { TOPIC_KEYS, buildYear6Math } from '../../src/data/challenges/year6Math/questions';
import { getLesson } from '../../src/data/lessons';

vi.mock('../../src/utils/speech',()=>({speak:()=>{},stopNarration:()=>{},speakAndWait:async()=>{},isNarrationSupported:()=>false}));
vi.mock('../../src/components/celebration/sound/player',async original=>({...await original(),playCue:()=>()=>{}}));
vi.mock('../../src/components/celebration/fx/effects',()=>({playEffect:()=>{}}));
// jsdom drives the reorder callback; pointer drag/layout need owner device review.
vi.mock('../../src/components/challenge/DragToOrder',()=>({default:({items,onReorder,disabled})=><div>{items.map(item=><button key={item.id} disabled={disabled} onClick={()=>onReorder([item,...items.filter(other=>other.id!==item.id)])}>Move {item.id} first</button>)}</div>}));

function solve(q) {
  if(q.kind==='choice') fireEvent.click(screen.getByRole('button',{name:String(q.answer),exact:true}));
  else if(q.kind==='number') fireEvent.change(screen.getByRole('textbox'),{target:{value:String(q.answer)}});
  else if(q.kind==='order') for(const id of [...q.answer].reverse()) fireEvent.click(screen.getByRole('button',{name:`Move ${id} first`}));
  else if(q.kind==='sort') for(const card of q.cards) {
    fireEvent.click(within(screen.getByRole('group',{name:'Cards to sort'})).getByRole('button',{name:card.label,exact:true}));
    fireEvent.click(screen.getByRole('button',{name:q.bins.find(b=>b.id===card.bin).label,exact:true}));
  }
  else throw new Error(`Unhandled ${q.kind}`);
}

for(const theme of ['light','dark']) for(const topic of TOPIC_KEYS) it(`${theme}: ${topic} completes all four pilot challenges once`,async()=>{
  document.body.classList.add(theme);
  vi.useFakeTimers();
  vi.spyOn(Math,'random').mockReturnValue(.375);
  try {
    for(let level=1;level<=4;level++) {
      const complete=vi.fn(),questions=buildYear6Math(topic,level,()=>.375);
      render(<Year6MathGame topic={topic} level={level} onComplete={complete}/>);
      for(const [i,q] of questions.entries()) {
        expect(screen.getByText(q.prompt)).toBeTruthy();
        if(i===0 && q.kind==='number') {
          for(let attempt=0;attempt<2;attempt++) {
            fireEvent.change(screen.getByRole('textbox'),{target:{value:String(q.answer+1)}});
            fireEvent.click(screen.getByRole('button',{name:'Check my answer'}));
            await act(async()=>vi.advanceTimersByTime(1000));
          }
          expect(screen.getByText(q.hint)).toBeTruthy();
          expect(complete).not.toHaveBeenCalled();
          expect(screen.getByText(q.prompt)).toBeTruthy();
        }
        solve(q);
        const check=screen.getByRole('button',{name:'Check my answer'});
        expect(check.disabled).toBe(false);
        fireEvent.click(check);
        expect(check.disabled).toBe(true);
        expect(complete).not.toHaveBeenCalled();
        await act(async()=>vi.advanceTimersByTime(1000));
      }
      expect(complete).toHaveBeenCalledTimes(1);
      expect(complete.mock.calls[0][0]).toHaveProperty('combos');
      cleanup();
    }
  } finally { vi.useRealTimers(); vi.restoreAllMocks(); document.body.classList.remove(theme); }
},20000);

it('the real loader opens each pilot slot on its own Bix lesson, then starts the game',async()=>{
  for(const topic of TOPIC_KEYS) for(let level=1;level<=4;level++) {
    render(<MemoryRouter initialEntries={[`/year/6/math/problem/number-number-and-place-value/${topic}/${level}`]}><Routes>
      <Route path="/year/:year/:subject/problem/:categoryId/:topicId/:challengeId" element={<Challenge onComplete={()=>{}}/>}/>
    </Routes></MemoryRouter>);
    const lesson=getLesson('math',6,topic,level);
    expect(await screen.findByRole('heading',{name:lesson.title})).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:/Let's go/}));
    expect(await screen.findByRole('button',{name:'Check my answer'})).toBeTruthy();
    cleanup();
  }
},20000);

it('place chart includes ten millions and number lines use only visible givens',()=>{
  render(<Year6MathVisual question={{visual:{type:'place6',digits:[1,0,0,0,0,0,0,0]}}}/>);
  expect(screen.getByRole('columnheader',{name:'Ten millions'})).toBeTruthy();
  expect(screen.getAllByRole('cell')).toHaveLength(8);
  cleanup();
  const q=buildYear6Math('negative-numbers-and-intervals',2,()=>.375)[0];
  const view=render(<Year6MathVisual question={q}/>);
  const before=view.container.innerHTML;
  view.rerender(<Year6MathVisual question={{...q,answer:999,hint:'secret'}}/>);
  expect(view.container.innerHTML).toBe(before);
  expect(view.container.querySelectorAll('circle')).toHaveLength(2);
});
