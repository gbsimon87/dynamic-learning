import { PRETEND_SHORTCUT } from "./beyondDestinations.js";

// Text for Space ripples (#94), shared by the card, the page and tests.
// Checked against LIGO's GW150914 announcement (see docs/SOLAR_SYSTEM_IDEAS.md).
export const SPACE_RIPPLES_FACTS = [
  'Space can stretch and squeeze, a bit like jelly. When two black holes spin together, they make ripples in space.',
  'In 2015, special machines on Earth called LIGO felt ripples like these. They had travelled for more than a billion years to reach us.',
  'The ripple was tiny. It squeezed the machine by much less than the width of an atom.',
];
export const SPACE_RIPPLES_PICTURE = "This is a picture to help us imagine. Real space ripples are invisible, and we've sped them up.";
export const SPACE_RIPPLES_PRETEND = PRETEND_SHORTCUT;
export const SPACE_RIPPLES_LINE = [...SPACE_RIPPLES_FACTS, SPACE_RIPPLES_PICTURE].join(' ');
// Bix's invitation on arrival.
export const SPACE_RIPPLES_ARRIVAL_LINE = 'Two black holes are spinning together. Press Bring them together to see space wobble!';
