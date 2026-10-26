// Signposts out past each system's edge, pointing the real way to every other
// system (#108/#109). Built from the registry's positions, so a new system
// gets its signs everywhere automatically. No Three.js here; the scene module
// systemSignposts.js draws them.
import { tripDestination } from "./registry.js";

// How far beyond the edge a sign stands.
export const SIGN_OFFSET = 30;

/** One sign per other system: `{ id, targetId, label, position, direction, home }`. */
export function signpostsFor(currentId, entries, edgeRadius) {
    if (!entries.some((entry) => entry.id === currentId)) return [];
    const r = edgeRadius + SIGN_OFFSET;
    return entries.filter((entry) => entry.id !== currentId).map((entry) => {
        const { direction, distanceLy } = tripDestination(currentId, entry.id, entries);
        return {
            id: `sign:${entry.id}`,
            targetId: entry.id,
            home: Boolean(entry.home),
            label: entry.home ? `Home — ${entry.phrase}` : `${entry.name} — ${Math.round(distanceLy)} light-years this way`,
            direction,
            position: { x: direction.x * r, y: direction.y * r, z: direction.z * r },
        };
    });
}
