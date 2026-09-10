/**
 * Ranking for the Solar System body search.
 *
 * Kept free of Three.js and React so it can be unit tested with `node --test`.
 * Callers pass plain descriptors — `{ id, name, kind, parentName }` — and look
 * the matched ids back up against their own scene objects.
 */

export const MAX_SEARCH_RESULTS = 8;

// Lower sorts first: a name that starts with the query beats one that merely
// contains it, and a planet beats one of its moons.
const matchTier = (name, needle) => (name.startsWith(needle) ? 0 : 1);
const kindTier = (kind) => (kind === "planet" ? 0 : 1);

export function matchBodies(bodies, query, limit = MAX_SEARCH_RESULTS) {
    const needle = typeof query === "string" ? query.trim().toLowerCase() : "";
    if (!needle) return [];

    return bodies
        .map((body) => ({ body, name: body.name.toLowerCase() }))
        .filter(({ name }) => name.includes(needle))
        .sort((a, b) =>
            matchTier(a.name, needle) - matchTier(b.name, needle) ||
            kindTier(a.body.kind) - kindTier(b.body.kind) ||
            a.name.localeCompare(b.name))
        .slice(0, limit)
        .map(({ body }) => body);
}
