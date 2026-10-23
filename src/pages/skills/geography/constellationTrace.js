/** Follow catalogue edges exactly, lifting the pencil at branches. */
export function traceSteps(lines) {
  const steps = [];
  lines.forEach(([from, to], index) => {
    if (steps.at(-1)?.id !== from) steps.push({ id: from, lines: index });
    steps.push({ id: to, lines: index + 1 });
  });
  return steps;
}
