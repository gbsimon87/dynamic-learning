// Controlled one-label/one-target placement. Unknown IDs and occupied targets
// are rejected. A move removes the old placement atomically.
export function placeDiagramLabel(previous, labelId, targetId, labels, targets) {
  if (!labels.some((label) => label.id === labelId)) return previous;
  if (targetId !== null && (!targets.some((target) => target.id === targetId) ||
    Object.entries(previous).some(([id, target]) => id !== labelId && target === targetId))) return previous;
  const next = { ...previous };
  if (targetId === null) delete next[labelId];
  else next[labelId] = targetId;
  return next;
}
