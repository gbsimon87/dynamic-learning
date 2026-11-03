// Models are derived only from information already visible in the question.
// Deliberately do not read answer, alternatives, bin assignments or hints.
const NUM = "(?:[0-9]{1,3}(?:,[0-9]{3})+|[0-9]+)(?:\\.[0-9]+)?";
const value = text => Number(text.replaceAll(",", ""));

export function mathQuestionModel({ prompt = "", equation, kind, items }) {
  const text = [prompt, ...[equation ?? []].flat()].join(" ");
  const fractions = [...text.matchAll(/(?<![\d/?.])(?:(\d+)\s+)?(\d+)\/(\d+)(?![\d/])/g)]
    .map(([label, whole, n, d]) => ({ label, n: Number(whole ?? 0) * Number(d) + Number(n), d: Number(d) }))
    .filter(f => f.d >= 2 && f.d <= 20 && f.n >= 0 && f.n <= f.d * 4);
  const unique = fractions.filter((f, i) => fractions.findIndex(other => other.label === f.label) === i);
  if (unique.length && unique.length <= 4) return { type: "fractions", fractions: unique };

  const comparison = prompt.match(new RegExp(`(?:greater|smaller|larger):?\\s+(${NUM})\\s+or\\s+(${NUM})|(${NUM})\\s+___\\s+(${NUM})`, "i"));
  if (comparison) return { type: "places", numbers: comparison.slice(1).filter(Boolean) };
  if (kind === "order" && items?.length <= 5 && items?.every(item => new RegExp(`^${NUM}$`).test(item.label))) {
    return { type: "places", numbers: items.map(item => item.label) };
  }

  const rounded = prompt.match(new RegExp(`^Round\\s+(${NUM})\\s+to\\s+(?:the\\s+)?(?:nearest\\s+)?(whole(?: number)?|10|100|1000|10,000|100,000|1 decimal place)\\.?(?:$|\\s)`, "i"));
  if (rounded) {
    const n = value(rounded[1]), step = /^whole/i.test(rounded[2]) ? 1 : rounded[2] === "1 decimal place" ? .1 : value(rounded[2]);
    const low = Number((Math.floor((n + 1e-10) / step) * step).toFixed(6));
    return { type: "rounding", n, low, high: Number((low + step).toFixed(6)) };
  }

  const calculation = text.match(new RegExp(`(?:^|\\s)(${NUM})\\s*([+−×÷])\\s*(${NUM})\\s*=\\s*\\?`));
  if (calculation) {
    const a = value(calculation[1]), b = value(calculation[3]), op = calculation[2];
    if (op === "×" && [a, b].every(n => Number.isInteger(n) && n >= 1 && n <= 12)) return { type: "array", rows: a, columns: b };
    if ((op === "+" || op === "−") && a > 0 && b > 0 && (op === "+" || a >= b)) return { type: "parts", a, b, op };
    if (op === "÷" && a > 0 && Number.isInteger(b) && b >= 2 && b <= 12) return { type: "share", total: a, groups: b };
    if ((op === "×" || op === "÷") && [10, 100, 1000].includes(b)) return { type: "places", numbers: [calculation[1]] };
  }
  return null;
}

/** Root terms must be explicitly quoted in the supplied context, not inferred
 * from the completed word. The diagram leaves the task's new word unknown.
 */
export function wordPartsModel({ text = "", visualKind }) {
  if (visualKind !== "wordParts" && !/\b(root|prefix|suffix|word family)\b/i.test(text)) return null;
  const parts = [...text.matchAll(/[‘“']([a-z]+)[’”']/gi)].map(match => match[1]);
  return parts.length ? [...new Set(parts)].slice(0, 4) : null;
}

/** The supplied Year 4 key, read as a chain of yes/no questions. Refuse any
 * unsupported format rather than inventing a route or selecting a branch.
 */
export function classificationKeyModel(text = "") {
  if (!text.startsWith("Use this key: ")) return null;
  const rest = text.slice("Use this key: ".length);
  const branches = [...rest.matchAll(/([^?.]+\?) Yes → ([^.]+)\. No → /g)];
  if (!branches.length) return null;
  const consumed = branches.map(match => match[0]).join("");
  if (!rest.startsWith(consumed)) return null;
  const last = rest.slice(consumed.length).match(/^([a-z ]+)\.$/i);
  return last ? { branches: branches.map(([, question, yes]) => ({ question: question.trim(), yes })), no: last[1] } : null;
}

/** One numeric result column has one unit and can share a bar-chart scale.
 * Mixed-unit/multiple-column tables retain their authored table instead.
 */
export function resultsChartModel(table) {
  if (table?.headings?.length !== 2 || !Array.isArray(table.rows) || table.rows.length < 2 || table.rows.length > 8) return null;
  if (!table.rows.every(row => row.length === 2 && typeof row[1] === "number" && Number.isFinite(row[1]) && row[1] >= 0)) return null;
  if (new Set(table.rows.map(row => row[0])).size !== table.rows.length) return null;
  const max = Math.max(...table.rows.map(row => row[1]));
  const step = Math.max(1, 10 ** Math.floor(Math.log10(Math.max(1, max / 5))));
  const niceStep = [1, 2, 5, 10].map(n => n * step).find(n => n * 8 >= max) ?? step * 10;
  return { unit: table.headings[1], bars: table.rows.map(([label, value]) => ({ label, value })), step: niceStep };
}
