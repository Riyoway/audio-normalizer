# Deploying the web app to `audio-normalizer.riyo.me`

The web app is a fully static, client-side SPA (no backend), so it deploys to any
static host. These steps use **Vercel** with the domain managed at **お名前.com /
Value Domain**.

The repo root already contains [`vercel.json`](./vercel.json), which tells Vercel to
build only the web workspace:

```json
{
  "buildCommand": "npm run build:web",
  "outputDirectory": "packages/web/dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

So there is almost nothing to configure in the dashboard.

---

## 1. Import the repo into Vercel (auto-deploy on every push)

1. Go to <https://vercel.com/new>.
2. **Import Git Repository** → `Riyoway/audio-normalizer`.
3. Vercel reads `vercel.json` automatically. Leave **Root Directory = `./`** (repo
   root — required so the npm workspace + `@audio-normalizer/core` resolve).
   - Build Command: `npm run build:web` (already set)
   - Output Directory: `packages/web/dist` (already set)
4. Click **Deploy**. You'll get a `*.vercel.app` URL within ~1 minute.

> Alternative (one-off CLI deploy): from the repo root run `vercel --prod`. The
> dashboard import is preferred because it redeploys automatically on every
> `git push`.

## 2. Add the custom domain in Vercel

1. Project → **Settings → Domains → Add**.
2. Enter `audio-normalizer.riyo.me`.
3. Vercel detects it's a subdomain and shows a **CNAME target** — usually:

   ```
   cname.vercel-dns.com
   ```

   (Use whatever value Vercel displays.)

## 3. Add the DNS record at お名前.com / Value Domain

In the DNS record settings for `riyo.me`, add **one CNAME record**:

| Type  | Host / ホスト名     | Value / VALUE          | TTL  |
| ----- | ------------------- | ---------------------- | ---- |
| CNAME | `audio-normalizer`  | `cname.vercel-dns.com` | 3600 |

Notes:
- Enter only the subdomain label (`audio-normalizer`), **not** the full
  `audio-normalizer.riyo.me`, in the host field.
- This requires `riyo.me` to be using お名前.com's own name servers (the default
  "お名前.com DNS" / Value Domain DNS). If you point name servers elsewhere, add the
  CNAME there instead.
- お名前.com DNS changes can take a little while (often <1 hour) to propagate.

## 4. Done

Once the CNAME resolves, Vercel issues an HTTPS certificate automatically and
`https://audio-normalizer.riyo.me` goes live. Every push to `main` redeploys it.

### Verify DNS from the terminal

```bash
nslookup audio-normalizer.riyo.me
# should eventually resolve via cname.vercel-dns.com
```
