/**
 * What an information card knows about something a child can discover in any world.
 * @typedef {object} Discovery
 * @property {string} id
 * @property {string} name
 * @property {string} eyebrow   Small label above the name, e.g. "Habitat".
 * @property {string} factsNoun Used in "Show reef facts" while orbiting.
 * @property {string} summary   One sentence linking what the child sees to one idea.
 * @property {string} [honesty] Where the scene simplifies the real world.
 * @property {string[]} meta    Short tags shown in Discover.
 * @property {{label: string, value: string, compare?: string}[]} stats
 * @property {string[]} facts   At least two; the first two show, the rest fold away.
 * @property {string[]} closer  Look closer paragraphs, also read aloud.
 * @property {string} [narration] Tour story.
 * @property {string[]} [sources] Where each fact was checked.
 */

const text = value => typeof value === 'string' && value.trim() !== '';

/** Lists what is missing or malformed; an empty list means the card can show it. */
export function validateDiscovery(discovery) {
  const problems = [];
  for (const field of ['id', 'name', 'eyebrow', 'factsNoun', 'summary']) {
    if (!text(discovery?.[field])) problems.push(`${field} is required`);
  }
  if (!Array.isArray(discovery?.meta)) problems.push('meta must be a list');
  if (!Array.isArray(discovery?.facts) || discovery.facts.length < 2 || !discovery.facts.every(text)) problems.push('facts needs at least two entries');
  if (!Array.isArray(discovery?.closer) || !discovery.closer.every(text)) problems.push('closer must be a list of paragraphs');
  if (!Array.isArray(discovery?.stats) || !discovery.stats.every(stat => text(stat?.label) && text(stat?.value))) problems.push('stats need a label and a value');
  return problems;
}
