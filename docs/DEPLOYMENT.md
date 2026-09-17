# Deployment — Render + MongoDB Atlas

One Render Web Service serves both the built React app and the `/api` routes.
That is deliberate: the session is an HTTP-only cookie, and same-origin means no
CORS and no third-party-cookie problems. Do not split it into a static site plus
a separate API service.

Prerequisites: an Atlas cluster, a Render account, this repo on GitHub with
`render.yaml` committed.

---

## 1. Create the Render service

Blueprint (preferred — reads `render.yaml`):

1. Render dashboard → **New** → **Blueprint**.
2. Pick this repo and the `main` branch. Render reads `render.yaml`.
3. It prompts for the two secret env vars (§2). Fill them in and apply.

Manual, if you'd rather not use the Blueprint — create a **Web Service** with:

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Build command | `npm ci --include=dev && npm run build` |
| Start command | `node server/index.js` |
| Health check path | `/` |

`npm ci` (not `npm install`) so the build matches `package-lock.json`.

⚠️ **`--include=dev` is required and must not be dropped.** `NODE_ENV=production`
is set on this service (the server needs it at runtime for `secure` cookies), and
npm omits devDependencies whenever `NODE_ENV=production`. Vite is a devDependency,
so a plain `npm ci` installs 149 packages instead of 181, leaving no `vite` binary
and failing the build with:

```
vite build
sh: 1: vite: not found
==> Build failed
```

This already happened once, on 2026-09-17. If you ever see that error again, this
flag is the first thing to check.

---

## 2. Environment variables

Set these in Render → your service → **Environment**. `.env.example` lists the
same set with placeholders.

| Variable | Value | Where to get it |
| --- | --- | --- |
| `MONGODB_URI` | `mongodb+srv://…` | Atlas → your cluster → **Connect** → **Drivers** → Node.js. Copy the string, replace `<username>`/`<password>` with a database user's credentials, and append the database name after the host. URL-encode any special characters in the password (`@` → `%40`). |
| `SESSION_SECRET` | a long random string | Generate one: `openssl rand -base64 48`. Rotating it invalidates every session, i.e. signs everyone out. |
| `VITE_USE_API` | `true` | See §4. |
| `NODE_VERSION` | `22.11.0` | Pinned in `render.yaml`. |
| `NODE_ENV` | `production` | Makes the server serve the built `dist/` and set the cookie `Secure` flag. |
| `PORT` | — | **Do not set.** Render injects it; `server/index.js` reads `process.env.PORT`. |

`MONGODB_URI` and `SESSION_SECRET` are declared `sync: false` in `render.yaml`,
which means Render prompts for them and stores them in its dashboard. They are
never committed. Nothing about them is prefixed `VITE_`, so they stay server-side
— anything named `VITE_*` is inlined into the public JS bundle.

The database user needs read/write on the app's database only. Atlas → **Database
Access** → Add New Database User → built-in role *Read and write to any database*,
or a custom role scoped to the one database.

---

## 3. Atlas Network Access

Atlas rejects connections from IPs that aren't allow-listed, so a fresh deploy
will fail to connect until this is done. Atlas → **Network Access** → **Add IP
Address**.

Two options:

- **Render's outbound IPs (preferred).** Render → your service → **Connect** →
  *Outbound* lists the static outbound IP addresses for your region. Add each one
  as its own entry. They are stable per region, but re-check them if you move the
  service to a different region.
- **`0.0.0.0/0`.** Allows connections from anywhere. It works immediately and is
  the common shortcut, but the trade-off is real: your cluster's only remaining
  protection is the database username and password. Anyone who obtains
  `MONGODB_URI` can connect from any machine on the internet. With the outbound
  IPs allow-listed, a leaked URI is far less useful. Use `0.0.0.0/0` only if you
  accept that, and prefer to narrow it later.

Changes take a minute or two to apply. If the service logs a connection timeout
right after deploying, this is usually why.

---

## 4. Flip `VITE_USE_API` to go live

`src/data/store/index.js` chooses the driver:

```js
// localStorage unless VITE_USE_API === "true"
export const store = USE_API ? apiStore : localStore;
```

Vite inlines `import.meta.env.VITE_USE_API` at **build** time. So:

- Setting `VITE_USE_API=true` in Render's environment and restarting does
  **nothing** — you must trigger a new build. Render rebuilds on an env var
  change, but if in doubt use **Manual Deploy → Clear build cache & deploy**.
- Locally, changing `.env` needs a `npm run dev` restart.

Default is `false` everywhere, so the app keeps working with no server at all.

**One-way door for existing data:** accounts and progress created under
`localStorage` do not move to MongoDB. Flipping the flag presents an empty app
that needs a fresh signup. The pre-accounts `mathProgress_year2` key stays in the
browser untouched (`migrateLegacyProgress.js` never deletes it), but it only
migrates into the first child profile created *in that browser under the
localStorage driver*. Don't flip this on a browser holding progress you care
about without copying it out first.

### Running against the API locally

```bash
# terminal 1
MONGODB_URI=... SESSION_SECRET=... node server/index.js   # listens on :3001
# terminal 2
npm run dev                                               # :5173
```

`vite.config.js` proxies `/api` → `http://localhost:3001`, so the browser sees
one origin and the session cookie works. Set `VITE_USE_API=true` in `.env` first.

---

## 5. Verify it worked

In order — each step rules out the previous layer:

1. **Service is up.** Open the Render URL. The app loads.
2. **API is reachable.** `curl -i https://<your-app>.onrender.com/api/auth/me`
   → `401 {"error":"NOT_SIGNED_IN"}`. A 401 here is *success*: it means Express
   is running and routing. A 404 means the app is served but `/api` isn't
   mounted; a 502 means the server didn't start (check Render → Logs).
3. **Database is connected.** Sign up with a throwaway email. If Atlas Network
   Access (§3) is wrong, this hangs then errors — the logs will show a MongoDB
   connection timeout.
4. **Session persists.** Reload the page while signed in. You should stay signed
   in. If you're bounced to the login page, the cookie isn't sticking — check
   `NODE_ENV=production` (the cookie needs `Secure` over HTTPS) and that you're
   not hitting a different hostname than the one you signed in on.
5. **Data really landed in Atlas.** Atlas → **Browse Collections**. Expect a
   `parents` document with your email and a `passwordHash` — never a plaintext
   password.
6. **Progress round-trips.** Create a child profile, complete one curriculum
   challenge, then reload. The completion survives. Open the same URL in a
   private window, sign in, and the progress is there too — that is the proof it
   is in MongoDB and not in this browser.

## Free tier: the first request is slow

Render's free tier spins the service down after ~15 minutes idle. The next
request has to boot the container and reconnect to Atlas, so it can take 30–60
seconds and may look like the app has hung. Subsequent requests are normal. If
that is a problem, move to a paid instance type — pinging it on a schedule just
burns the free tier's monthly hours.
