import { isCorrect } from '../questionKinds.js';

// Small arithmetic parser for authored maths tiles. Never execute answer text.
// Returning null keeps incomplete expressions and zero division retryable.
export function expressionValue(text) {
  if (/\d\s+\d/.test(String(text))) return null;
  const source = String(text).replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-').replace(/\s/g, '');
  if (!source || source.length > 512) return null;
  const tokens = source.match(/\d+(?:\.\d+)?|[()+\-*/]/g) ?? [];
  if (tokens.join('') !== source || tokens.length > 64) return null;
  let index = 0;
  function atom() {
    const token = tokens[index++];
    if (token === '(') {
      const value = sum();
      if (tokens[index++] !== ')') throw new Error('Unclosed bracket');
      return value;
    }
    if (!/^\d+(?:\.\d+)?$/.test(token ?? '')) throw new Error('Missing number');
    return Number(token);
  }
  function product() {
    let value = atom();
    while (tokens[index] === '*' || tokens[index] === '/') {
      const operation = tokens[index++], next = atom();
      value = operation === '*' ? value * next : value / next;
    }
    return value;
  }
  function sum() {
    let value = product();
    while (tokens[index] === '+' || tokens[index] === '-') {
      const operation = tokens[index++], next = product();
      value = operation === '+' ? value + next : value - next;
    }
    return value;
  }
  try {
    const value = sum();
    return index === tokens.length && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

export function isYear4MathCorrect(question, response) {
  if (!question.maths) return isCorrect(question, response);
  if (!Array.isArray(response) || new Set(response).size !== response.length) return false;
  const byId = new Map(question.tiles.map(tile => [tile.id, tile.label]));
  if (!response.every(id => byId.has(id))) return false;
  if (question.maths.kind === 'digits') {
    const digits = response.map(id => byId.get(id)).join('');
    return /^\d+$/.test(digits) && Number(digits) === question.maths.value;
  }
  if (response.length !== question.tiles.length) return false;
  const text = response.map(id => byId.get(id)).join(' ');
  const equal = (a, b) => a !== null && b !== null && Math.abs(a - b) < 1e-9;
  if (question.maths.kind === 'equation') {
    const sides = text.split('=');
    return sides.length === 2 && equal(expressionValue(sides[0]), expressionValue(sides[1]));
  }
  return equal(expressionValue(text), question.maths.value);
}
