/** A topic's rule, one sentence per numbered line in Bix's bubble. Pure. */
export function noteLines(rule = "") {
  return rule.match(/[^.!?]+[.!?]+(?=\s|$)/g)?.map((line) => line.trim()) ?? (rule ? [rule] : []);
}
