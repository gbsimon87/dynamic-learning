/** A child document from an already-normalised profile (normaliseNewChildren). */
export function newChildDoc(parentId, child) {
  return {
    parentId,
    name: child.name,
    avatar: child.avatar ?? null,
    colour: child.colour ?? null,
    yearGroup: child.yearGroup ?? null,
    subjects: Array.isArray(child.subjects) ? child.subjects : [],
    createdAt: new Date().toISOString(),
  };
}
