# Flag Finder loading

The game previously fetched every 25-country page sequentially, with a 120ms
pause between pages, before rendering its first question. Roughly 254 records
meant about eleven requests. Requests had no timeout. React StrictMode remounts
could also start duplicate loads, and leaving/revisiting the route fetched again.

The game now requests `limit=100` (supported on the free plan), normally reducing
that to three requests. It publishes each page immediately and starts playing
once four distinct flag-bearing countries are ready. The remaining pages expand
the country and continent pools in the background without resetting the active
question, score, selection, or 1.5-second feedback timer.

A shared memory store deduplicates overlapping loads and reuses the dataset for
the lifetime of the page. Its bounded background load deliberately continues if
the learner leaves the route, so returning can reuse it. It writes no storage
and does not touch learner progress. Each request, including JSON parsing, has
an eight-second abort timeout. Failed pages preserve playable data and expose a
retry; retries merge by country name. Offsets advance by the actual response
size so server-side page caps do not skip countries. The 120ms inter-page pause
and a 20-page safety cap remain.

The first question still depends on the first usable API page and its flag
image. Browser reloads clear the memory cache. No local fallback dataset or
offline flag assets are introduced.

Reference: https://restcountries.com/docs/countries#list (100-record free-plan
limit). Loading regressions are covered in `tests/components/flagFinder.test.jsx`.
Browser checks use intercepted responses, with external network access blocked,
to verify early play, stable feedback, continent switches, and cached revisits.
Live timing with the configured API key was not performed because automatic
approval review rejected sending that credential.
