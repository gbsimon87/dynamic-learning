import { editionIndex } from '../../shared/familyFridaySchedule.js';
import { familyFridayEdition as legacyEdition } from './familyFriday/v1.js';
import { curriculumEdition } from './familyFriday/v2.js';

// Select versions by their first Friday, never by today's build date. Retain
// old banks and algorithms so archived and shared editions stay stable.
export const CURRICULUM_FAMILY_FRIDAY = '2026-11-20';

export function familyFridayEdition(week) {
  const index = editionIndex(week);
  if (index === null) return null;
  return week < CURRICULUM_FAMILY_FRIDAY ? legacyEdition(week) : curriculumEdition(week, index);
}
