// In-memory reference-data cache only; learner progress is never stored here.
// One bounded load survives route changes and StrictMode remounts so they cannot
// duplicate requests. Completed data lasts until the browser reloads.
export function createFlagCountriesStore({
  fetchPage = (...args) => fetch(...args),
  apiKey = '',
  timeoutMs = 8000,
  pageDelayMs = 120,
} = {}) {
  let snapshot = { countries: [], loading: false, error: null };
  let pending = null;
  let complete = false;
  const listeners = new Set();
  const publish = (changes) => {
    snapshot = { ...snapshot, ...changes };
    listeners.forEach((listener) => listener());
  };

  async function load() {
    publish({ loading: true, error: null });
    const collected = new Map(snapshot.countries.map((country) => [country.name, country]));
    try {
      let offset = 0;
      for (let page = 0; page < 20; page += 1) {
        const url = new URL('https://api.restcountries.com/countries/v5');
        if (apiKey) url.searchParams.set('api-key', apiKey);
        url.searchParams.set('response_fields', 'names.common,flag.url_png,continents');
        url.searchParams.set('limit', '100');
        url.searchParams.set('offset', String(offset));
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        let payload;
        try {
          const response = await fetchPage(url.toString(), { signal: controller.signal });
          if (!response.ok) throw new Error('Flags request failed.');
          payload = await response.json();
        } finally {
          clearTimeout(timer);
        }
        const records = payload?.data?.objects;
        if (!Array.isArray(records) || records.length === 0) {
          throw new Error('No flags returned.');
        }
        for (const country of records) {
          const name = country?.names?.common;
          const flag = country?.flag?.url_png;
          if (typeof name !== 'string' || !name.trim() || typeof flag !== 'string') continue;
          try {
            if (new URL(flag).protocol !== 'https:') continue;
          } catch { continue; }
          collected.set(name.trim(), {
            name: name.trim(), flag, alt: `Flag of ${name.trim()}`,
            continents: Array.isArray(country.continents) ? country.continents : [],
          });
        }
        publish({ countries: [...collected.values()] });
        if (!payload.data.meta?.more) {
          if (collected.size < 4) throw new Error('Not enough flags returned.');
          complete = true;
          return;
        }
        // Advance by the actual response size, even if the API caps the limit.
        offset += records.length;
        await new Promise((resolve) => setTimeout(resolve, pageDelayMs));
      }
      throw new Error('Flags pagination did not finish.');
    } catch {
      publish({ error: 'Unable to load all flags. Please try again.' });
    } finally {
      publish({ loading: false });
    }
  }

  const start = () => {
    if (pending || complete) return pending;
    pending = load().finally(() => { pending = null; });
    return pending;
  };
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
    start,
    retry: start,
  };
}

export const flagCountriesStore = createFlagCountriesStore({
  apiKey: import.meta.env.VITE_REST_COUNTRIES_API_KEY,
});
