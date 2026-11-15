// The choices Arithmetic Practice offers, shared with Space Arithmetic so both
// games ask the same kinds of questions (see generateQuestion.js).
import { OPERATIONS } from './generateQuestion.js';

export { OPERATIONS };
export const OPERATION_SIGNS = { addition: '+', subtraction: '−', multiplication: '×', division: '÷' };
export const OPERATION_LABELS = { addition: 'Addition', subtraction: 'Subtraction', multiplication: 'Multiplication', division: 'Division' };
export const OPERAND_CHOICES = [2, 3, 4];
export const RANGE_PRESETS = [10, 20, 50, 100];
export const VALUE_FLOOR = 1;
export const VALUE_CEILING = 100;
// What the learner looks for: the answer to a calculation (3 + 4 = ?), or the
// calculation that makes an answer (? = 7, see generateReverseQuestion).
export const FIND_CHOICES = [
  { id: 'answer', label: 'Find the answer', example: '3 + 4 = ?' },
  { id: 'sum', label: 'Find the sum', example: '? = 7' },
];
export const DEFAULT_PRACTICE_SETTINGS = { types: ['addition'], mixOperations: false, operands: 2, min: VALUE_FLOOR, max: 10, find: 'answer' };

/** Toggle one operation, keeping at least one; mixing needs two or more. */
export function withOperationToggled(prev, operation) {
  const types = prev.types.includes(operation) ? prev.types.filter(t => t !== operation) : [...prev.types, operation];
  if (types.length === 0) return prev;
  return { ...prev, types, mixOperations: types.length < 2 ? false : prev.mixOperations };
}
// Both sliders share one track; clamp in state, never via a reactive DOM min.
export const withMin = (prev, min) => ({ ...prev, min, max: Math.max(prev.max, min) });
export const withMax = (prev, max) => ({ ...prev, max, min: Math.min(prev.min, max) });
