import data from "../../../../assets/geography/records/year4-climate-2001-2025.json" with { type: "json" };
import { visual } from "./authoring.js";

// NASA POWER climatology (MERRA-2, 2001–2025) for selected places; see scripts/geography-assets/.
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** Place ids: manaus quito aswan seattle spokane regina yellowknife utqiagvik ambleside naples buenosaires ottawa. */
export const place = (id) => { if (!Object.hasOwn(data.places, id)) throw new Error(`No climate record for ${id}`); return data.places[id]; };
export const text = (id, i) => `${place(id).months[i].t}°C, ${place(id).months[i].r} mm rain`;
/** Monthly table for 2–4 places. `months` picks month indexes (default all twelve). The alt text carries every cell. */
export function climateTable(ids, { title = "Monthly climate records", months = MONTHS.map((_, i) => i) } = {}) {
  const names = ids.map((id) => `${place(id).name}, ${place(id).country} (data height ${place(id).elevationM} m)`);
  const rows = months.map((i) => [MONTHS[i], ...ids.map((id) => text(id, i))]);
  const alt = `${title}. ${rows.map((r) => `${r[0]}: ${ids.map((id, j) => `${place(id).name} ${r[j + 1]}`).join("; ")}.`).join(" ")}`;
  return visual("table", title, alt, ["NASA POWER climate summary (model grid cells), 2001–2025; rounded values, a place's typical month.", ...ids.map((id) => `${place(id).name}: ${place(id).lat.toFixed(1)}° ${place(id).lat < 0 ? "S" : "N"}, data height ${place(id).elevationM} m above sea level (average for the grid cell, not the town centre).`)], {
    caption: "Typical monthly temperature (°C) and rainfall (mm). Summaries of model grid cells, not whole-region averages.", columns: ["Month", ...names], rows,
  });
}
