/**
 * The swap point.
 *
 * Every consumer imports the store from here — `import { store } from "../data/store"` —
 * and never from a concrete implementation. Both drivers implement the *same*
 * interface (same method names, same signatures, same document shapes, all
 * async), which is why every method in localStorageStore.js is async even
 * though localStorage is not:
 *
 *   ./localStorageStore.js  browser-only, no server, data lives in this browser
 *   ./apiStore.js           HTTP + cookie session, data lives in MongoDB
 *
 * HOW TO SWAP
 * -----------
 * Set `VITE_USE_API=true` in `.env` (or in the hosting provider's environment)
 * and rebuild. Anything else — unset, "false", "0" — keeps the current
 * localStorage behaviour, so the default is always the one that works with no
 * backend running. See `.env.example` and `docs/DEPLOYMENT.md`.
 *
 * Note this is a *build-time* switch: Vite inlines `import.meta.env.VITE_USE_API`
 * at build time, so flipping it requires a rebuild, not just a restart. Both
 * modules are imported unconditionally and the choice is a plain ternary, which
 * keeps it simple and lets either driver be reached from a test.
 */
import { store as localStore } from "./localStorageStore.js";
import { store as apiStore } from "./apiStore.js";

// `import.meta.env` is undefined outside Vite (e.g. `node --test`), hence the ?.
const USE_API = import.meta.env?.VITE_USE_API === "true";

// localStorage unless VITE_USE_API === "true"
export const store = USE_API ? apiStore : localStore;
