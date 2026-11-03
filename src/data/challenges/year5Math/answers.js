import { isYear4MathCorrect } from '../year4Math/answers.js';

/** Year 4's rules, plus tiles that build a decimal such as 3.45 (compared as a number). */
export function isYear5MathCorrect(question, response) {
  if (question.maths?.kind !== 'decimal') return isYear4MathCorrect(question, response);
  if (!Array.isArray(response) || new Set(response).size !== response.length) return false;
  const byId = new Map(question.tiles.map(tile => [tile.id, tile.label]));
  if (!response.every(id => byId.has(id))) return false;
  const text = response.map(id => byId.get(id)).join('');
  return /^\d+(\.\d+)?$/.test(text) && Number(text) === question.maths.value;
}
