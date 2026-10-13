// Shared helpers for the Year 4 Maths builders. Every builder receives its random source.
import { shuffle } from '../english/shared.js';
export { shuffle };

export const TITLES = ['Explore the rule', 'Find the pattern', 'Build and arrange', 'Solve a problem'];
export const int = (rng, low, high) => low + Math.floor(rng() * (high - low + 1));
export const pick = (rng, values) => values[int(rng, 0, values.length - 1)];
export const choice = (prompt, answer, wrong, rng, extra = {}) => ({
  kind: 'choice', prompt, answer,
  options: shuffle([...new Set([answer, ...wrong])], rng), ...extra,
});
export const number = (prompt, answer, extra = {}) => ({ kind: 'number', prompt, answer, maxDigits: 6, ...extra });
export const near = (prompt, answer, rng, extra = {}) => choice(prompt, answer,
  [answer + 1, Math.max(0, answer - 1), answer + 10].filter(n => n !== answer), rng, extra);
export const order = (prompt, values, rng, format = String, extra = {}) => {
  const sorted = [...new Set(values)].sort((a,b) => a-b).map((value,i) => ({ id: String(i), label: format(value), value }));
  let items = shuffle(sorted, rng);
  if (items.every((item,i) => item.id === sorted[i].id)) items = [...items.slice(1), items[0]];
  return { kind: 'order', prompt, items, answer: sorted.map(item => item.id), ...extra };
};
export const build = (prompt, labels, rng, extra = {}) => ({ kind: 'build', prompt, rule: 'Use all the tiles.',
  tiles: shuffle(labels.map((label,i) => ({ id: String(i), label })), rng),
  answer: labels.join(' '), maths: labels.includes('=') ? { kind: 'equation' } : extra.maths, ...extra });
export const sort = (prompt, bins, cards, extra = {}) => ({ kind: 'sort', prompt,
  bins: bins.map(id => ({ id, label: id })),
  cards: cards.map(([label,bin],i) => ({ id: String(i), label, bin })), ...extra });
export const sequence = (start, step, prompt, extra = {}) => ({ kind: 'sequence', prompt,
  terms: Array.from({length:5},(_,i) => start+i*step), gaps:[2,4], maxDigits:6, ...extra });
export const decimal = n => (n / 100).toFixed(2);
export function roman(n) {
  let result = '';
  for (const [value,symbol] of [[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]) {
    while (n >= value) { result += symbol; n -= value; }
  }
  return result;
}
export const column = (a,b,op) => ({ type:'column', a, b, op });
export const fractionWrong = (n,d) => [`${n+1}/${d}`,`${n}/${d+1}`,`${n+2}/${d}`];
export const grid = (width,height,cells) => ({type:'squares',width,height,cells});
export const allCells = (w,h) => Array.from({length:w*h},(_,i) => [i%w,Math.floor(i/w)]);
export const pointOptions = (x,y) => [`(${x}, ${y})`,`(${y}, ${x})`,`(${x+1}, ${y})`,`(${x}, ${y+1})`];
export const position = (prompt,x,y,points = [],extra = {}) => ({kind:'choice',prompt, answer:`(${x}, ${y})`,
  options: [...new Set(pointOptions(x,y))], visual:{ type:'coordinates', points }, ...extra });
export const plot = (prompt,x,y,points = [],extra = {}) => ({...position(prompt,x,y,points,extra),
  options: allCells(6,6).map(([a,b])=>`(${a}, ${b})`), interaction:'plot'});
