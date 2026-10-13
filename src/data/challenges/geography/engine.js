import { shuffle, order } from "../year1Math/shared.js";

export const GEOGRAPHY_TITLES = ["Explore", "Locate and read", "Use evidence", "Connect and explain"];
export const GEOGRAPHY_AGE = { notesWords: 60, sentenceWords: 16, rounds: 5, minBank: 7 };
/** Per-year limits from shared spec §3. Year 4 allows slightly longer notes and sentences. */
export const GEOGRAPHY_AGES = { 1: { notesWords: 30, sentenceWords: 10, rounds: 4, minBank: 6 }, 2: { notesWords: 45, sentenceWords: 12, rounds: 5, minBank: 7 }, 3: GEOGRAPHY_AGE, 4: { notesWords: 70, sentenceWords: 18, rounds: 5, minBank: 7 } };

/** Evidence is kept with its question, including the exact supporting lines and source IDs. */
export function buildGeographyTopic(topic) {
  return (level, rng) => {
    if (!Number.isInteger(level) || level < 1 || level > 4) throw new RangeError("Geography levels run from 1 to 4.");
    const lesson = topic.lessons[level - 1];
    const { rounds } = GEOGRAPHY_AGES[topic.year] ?? GEOGRAPHY_AGE;
    if (!Array.isArray(lesson?.bank) || lesson.bank.length < rounds) throw new Error(`Geography needs ${["four", "five"][rounds - 4] ?? rounds} question templates for a run.`);
    const questions = shuffle(rng, lesson.bank).slice(0, rounds).map((t) => {
      const common = { prompt: t.prompt, hint: t.hint, visual: t.visual, evidence: t.evidence, sources: t.sources };
      if (t.kind === "order") return { ...order(rng, t.prompt, t.labels), ...common, direction: "vertical" };
      if (t.kind === "sort") return { ...common, kind: "sort", bins: t.bins.map((label, i) => ({ id: `bin-${i}`, label })), cards: shuffle(rng, t.cards).map(([label, bin], i) => ({ id: `card-${i}`, label, bin: `bin-${bin}` })) };
      if (t.kind === "chart") return { ...common, ...t, options: shuffle(rng, t.options) };
      if (t.kind && t.kind !== "choice") throw new Error(`Unknown geography question kind: ${t.kind}`);
      return { ...common, kind: "choice", answer: t.answer, options: shuffle(rng, [t.answer, ...t.wrong]), variant: "wordy" };
    });
    return { notes: lesson.notes, questions, activity: topic.activity };
  };
}

const words = (s) => String(s).split(/\s+/).filter(Boolean).length;
const list = (value) => Array.isArray(value) ? value : [];
const text = (value) => typeof value === "string" && value.trim().length > 0;
const pair = (value) => Array.isArray(value) && value.length === 2 && value.every(Number.isFinite);
const owns = (registry, id) => typeof id === "string" && registry != null && Object.hasOwn(registry, id);
const visualTypes = new Set(["record", "photo", "map", "globe", "grid", "plan", "coordinates", "flow", "mountain", "volcano", "fault", "compass", "climate", "table", "river", "daynight", "landuse", "explorer", "ks1", "y1"]);
const Y1_ARTS = new Set(["cards", "scene", "uk", "world", "globe", "views", "grid", "compass", "viewpoint", "weather", "outside", "seasons"]);
const mapViews = new Set(["world", "uk", "europe", "italy", "campania", "lake", "northAmerica", "southAmerica", "washington"]);
export function lintGeographyTopic(topic, sources, assets) {
  const age = GEOGRAPHY_AGES[topic?.year] ?? GEOGRAPHY_AGE;
  const errors = [];
  const need = (ok, message) => { if (!ok) errors.push(message); };
  const checkVisual = (v, at) => {
    need(visualTypes.has(v?.type) && text(v?.alt) && text(v?.title), `${at}: missing visual or equivalent, or unknown visual type`);
    need(Array.isArray(v?.lines) && v.lines.every(text), `${at}: visual needs evidence lines`);
    if (!v || typeof v !== "object") return;
    for (const field of ["maps", "markers", "route", "referenceLines", "points", "boundaries"]) {
      if (v[field] !== undefined) need(Array.isArray(v[field]), `${at}: ${field} must be an array`);
    }
    if (v.image || v.type === "photo") need(owns(assets, v.image), `${at}: unknown image ${v.image}`);
    if (v.type === "map") {
      need(mapViews.has(v.view), `${at}: unknown map view ${v.view}`);
      need(Array.isArray(v.markers), `${at}: map needs markers`);
      for (const p of [...list(v.markers).map(m => m?.point), ...list(v.boundaries).flatMap(list)]) {
        need(pair(p) && Math.abs(p[0]) <= 180 && Math.abs(p[1]) <= 90, `${at}: invalid map coordinates`);
      }
    }
    if (v.type === "ks1") {
      need(["plan", "compass", "scene"].includes(v.variant), `${at}: unknown KS1 visual`);
      need(["up", "right"].includes(v.north), `${at}: KS1 needs explicit orientation`);
      const features = list(v.features);
      need(Array.isArray(v.features) && new Set(features.map(f => f?.code)).size === features.length, `${at}: KS1 needs unique features`);
      for (const f of features) need(text(f?.label) && text(f?.code) && ["house", "shop", "tree", "water", "path", "gate", "jetty"].includes(f?.symbol) && [f?.x, f?.y].every(n => Number.isFinite(n) && n >= 0 && n <= 4), `${at}: invalid KS1 feature`);
      for (const segment of list(v.paths)) need(Array.isArray(segment) && segment.length === 4 && segment.every(n => Number.isFinite(n) && n >= 0 && n <= 4), `${at}: invalid KS1 path`);
    }
    if (v.type === "y1") {
      need(Y1_ARTS.has(v.art), `${at}: unknown Year 1 picture ${v.art}`);
      const codes = [...list(v.items), ...list(v.features), ...list(v.key)].map(i => i?.code).filter(Boolean);
      need(new Set(codes).size === codes.length, `${at}: Year 1 picture repeats a letter`);
      for (const m of list(v.markers)) need(pair(m?.point) && Math.abs(m.point[0]) <= 180 && Math.abs(m.point[1]) <= 90, `${at}: invalid Year 1 map marker`);
    }
    if (["grid", "plan"].includes(v.type)) {
      const size = v.size ?? 3;
      need(pair(v.origin) && v.origin.every(n => n >= 0 && n < 100) && Number.isInteger(size) && size > 0 && size <= 10, `${at}: invalid grid dimensions`);
      for (const p of [...list(v.route), ...list(v.markers).map(m => m?.point)]) {
        need(pair(p) && pair(v.origin) && p.every((n, i) => n >= v.origin[i] && n <= v.origin[i] + size), `${at}: point outside grid`);
      }
    }
    if (v.tenths !== undefined) need(v.tenths === true && ["grid", "plan"].includes(v.type), `${at}: tenths belongs on a grid`);
    if (v.window !== undefined) need(pair(v.window?.origin) && Number.isInteger(v.window?.size) && v.window.size > 0 && v.window.origin.every((n, i) => n >= v.origin[i] && n + v.window.size <= v.origin[i] + (v.size ?? 3)), `${at}: window must sit inside the grid`);
    if (v.type === "map" && v.rivers !== undefined) need(Array.isArray(v.rivers) && v.rivers.every(text), `${at}: rivers must be names`);
    if (v.type === "table") {
      need(text(v.caption) && list(v.columns).length > 1 && v.columns.every(text), `${at}: table needs a caption and columns`);
      need(list(v.rows).length > 0 && v.rows.every(r => Array.isArray(r) && r.length === v.columns.length && r.every(x => text(x) || Number.isFinite(x))), `${at}: table rows must match its columns`);
    }
    if (v.type === "river") need(["features", "processes", "route"].includes(v.variant), `${at}: unknown river variant`);
    if (v.type === "daynight") for (const p of list(v.points)) need(text(p?.label) && Number.isFinite(p?.lon) && Math.abs(p.lon) <= 180, `${at}: invalid day/night point`);
    if (v.type === "landuse") {
      const keys = list(v.key).map(k => k?.code);
      need(keys.length > 0 && list(v.key).every(k => text(k?.code) && k.code.length === 1 && text(k?.label)) && new Set(keys).size === keys.length, `${at}: landuse needs a key`);
      need(list(v.cells).length > 0 && v.cells.every(r => typeof r === "string" && r.length === v.cells[0].length && [...r].every(ch => keys.includes(ch))), `${at}: landuse cells must use key codes`);
    }
    if (v.type === "explorer") {
      need(list(v.views).length >= 2 && v.views.every(w => text(w?.id) && text(w?.label) && mapViews.has(w?.view) && Array.isArray(w?.markers) && w.markers.every(m => text(m?.id) && text(m?.label) && pair(m?.point))), `${at}: explorer needs at least two views`);
      need(new Set(list(v.views).map(w => w?.id)).size === list(v.views).length, `${at}: duplicate explorer view`);
      need(list(v.views).every(w => text(w?.extentText)), `${at}: explorer views need extent text`);
      const layerMarkers = list(v.layers).flatMap(l => list(l?.markers));
      for (const w of list(v.views)) need(new Set([...list(w?.markers), ...layerMarkers].map(m => m?.id)).size === list(w?.markers).length + layerMarkers.length, `${at}: explorer marker ids repeat across a view and its layer`);
      need(list(v.layers).length > 0 && v.layers.every(l => text(l?.id) && text(l?.label) && text(l?.legend) && Array.isArray(l?.markers) && l.markers.every(m => text(m?.id) && text(m?.label) && pair(m?.point))), `${at}: explorer needs a thematic layer`);
    }
    if (v.markers) {
      const markers = list(v.markers);
      need(new Set(markers.map(m => m?.id)).size === markers.length, `${at}: duplicate marker`);
      for (const m of markers) need(text(m?.id) && text(m?.label) && pair(m?.point), `${at}: invalid marker`);
    }
    if (v.type === "coordinates") need(pair(v.point) && v.point.every(n => Math.abs(n) <= 40), `${at}: point outside practice coordinates`);
    if (v.type === "globe") {
      for (const p of [...list(v.referenceLines), ...list(v.points)]) need(Number.isFinite(p?.lat) && Math.abs(p.lat) <= 90, `${at}: invalid latitude`);
    }
    if (v.type === "flow") need(list(v.steps).length > 0 && v.steps.every(text), `${at}: flow needs steps`);
    if (v.type === "climate") {
      need(list(v.rows).length > 0, `${at}: climate needs rows`);
      for (const row of list(v.rows)) need(text(row?.month) && [row?.lake, row?.naples].every(r => Number.isFinite(r?.temperatureC) && Number.isFinite(r?.rainfallMm) && r.rainfallMm >= 0), `${at}: invalid climate row`);
    }
    for (const m of list(v.maps)) checkVisual(m, at);
  };
  need(Array.isArray(topic?.lessons) && topic.lessons.length === 4, "needs four lessons");
  for (const [i, lesson] of list(topic?.lessons).entries()) {
    const at = `slot ${i + 1}`;
    const lines = list(lesson?.notes?.lines), bank = list(lesson?.bank);
    need(lines.length > 0 && lines.every(text), `${at}: notes need sentences`);
    need(words(lines.join(" ")) <= age.notesWords, `${at}: notes exceed ${age.notesWords} words`);
    for (const line of lines) need(words(line) <= age.sentenceWords, `${at}: long notes sentence: ${line}`);
    checkVisual(lesson?.notes?.visual, `${at} notes`);
    need(bank.length >= age.minBank, `${at}: needs ${age.minBank} templates`);
    need(new Set(bank.map(q => q?.prompt)).size === bank.length, `${at}: duplicate prompt`);
    for (const q of bank) {
      if (!q || typeof q !== "object") { need(false, `${at}: invalid question`); continue; }
      need(text(q.prompt) && words(q.prompt) <= age.sentenceWords, `${at}: missing or long prompt: ${q.prompt}`);
      need(text(q.hint) && words(q.hint) <= age.sentenceWords, `${at}: missing or long hint`);
      need(list(q.evidence).length && list(q.sources).length, `${at}: missing evidence or sources`);
      for (const id of list(q.sources)) {
        need(owns(sources, id), `${at}: unknown source ${id}`);
        if (owns(sources, id) && sources[id]?.url) need(/^https:\/\//.test(sources[id].url), `${at}: source URL must use HTTPS`);
      }
      const visible = [...list(q.visual?.lines), ...(q.visual?.alt ? [q.visual.alt] : [])].join(" ");
      for (const phrase of list(q.evidence)) need(text(phrase) && visible.includes(phrase), `${at}: evidence not visible: ${phrase}`);
      checkVisual(q.visual, at);
      need(!q.kind || ["choice", "sort", "order", "chart"].includes(q.kind), `${at}: unknown question kind ${q.kind}`);
      if (!q.kind || q.kind === "choice") {
        const choices = [q.answer, ...list(q.wrong)];
        need(list(q.wrong).length === 2, `${at}: needs three choices`);
        need(new Set(choices).size === 3, `${at}: duplicate choices`);
        for (const s of choices) need((text(s) || Number.isFinite(s)) && words(s) <= age.sentenceWords, `${at}: missing or long option`);
      } else if (q.kind === "order") {
        need(list(q.labels).length >= 2 && q.labels.every(text) && new Set(q.labels).size === q.labels.length, `${at}: order needs distinct labels`);
      } else if (q.kind === "sort") {
        need(list(q.bins).length >= 2 && q.bins.every(text) && new Set(q.bins).size === q.bins.length, `${at}: sort needs distinct bins`);
        need(list(q.cards).length >= 2, `${at}: sort needs cards`);
        for (const card of list(q.cards)) need(Array.isArray(card) && text(card[0]) && Number.isInteger(card[1]) && card[1] >= 0 && card[1] < list(q.bins).length, `${at}: invalid sort card or bin`);
      } else if (q.kind === "chart") {
        const options = list(q.options), rows = list(q.chart?.rows);
        need(options.length === 3 && new Set(options).size === 3 && options.includes(q.answer), `${at}: chart needs three choices including its answer`);
        need(q.chart?.type === "bar" && rows.length > 0 && rows.every(r => text(r?.label) && Number.isFinite(r?.value) && r.value >= 0), `${at}: chart needs valid bar rows`);
      }
    }
  }
  return errors;
}
