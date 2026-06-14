# Arıkan Aydınlatma — Dual-Brand Portal

A Next.js 14 (App Router) site for **Arıkan Aydınlatma** (Antalya), built as a
dual-brand portal:

- **`/`** — Full-screen split-screen brand selector portal
- **`/magaza`** — Arıkan Aydınlatma retail store (Red-White editorial)
- **`/exclusive`** — Arıkan Exclusive architectural studio (Black-Gold minimalist)
- **`/admin`** — Hidden, password-protected PDF catalog manager (`noindex`)

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS v3 · Framer Motion · lucide-react

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Fonts

Brand A uses **Marcellus** + **Jost**; Brand B uses **Cormorant** +
**Montserrat**. All four are loaded via a Google Fonts `@import` at the top of
[`app/globals.css`](app/globals.css) and exposed as Tailwind families
(`font-marcellus`, `font-jost`, `font-cormorant`, `font-montserrat`).
Marcellus has a single upright weight (no true italic/bold) — keep headings
upright rather than adding `italic`/`font-bold`, which the browser would fake.

## Images

Photographic slots render through [`app/components/SmartImage.tsx`](app/components/SmartImage.tsx).
When no `src` is provided it draws a themed gradient placeholder; pass a real
photo URL (e.g. an Unsplash/CDN link — `images.unsplash.com` is already
allow-listed in [`next.config.mjs`](next.config.mjs)) and it renders an
optimized `next/image`. Swap placeholders for real photos by supplying `src`.

## Admin panel

The admin route is **never linked** from the public site — reach it directly:

1. Visit `/admin` and enter the password from `ADMIN_PASSWORD`.
2. On success a `admin_session` cookie is set (via a Server Action) and you are
   redirected to `/admin/panel`.
3. Upload PDF catalogs, toggle their public visibility, or remove them.

Auth is enforced by [`middleware.ts`](middleware.ts), which guards
`/admin/panel/*` and `/api/admin/*`.

### Catalog data flow

No database is needed — catalogs are a few PDFs plus a small JSON index. Storage
backend is selected automatically in [`lib/katalog.ts`](lib/katalog.ts):

| Environment | PDFs | Index (manifest) |
|-------------|------|------------------|
| **Local dev** (no `BLOB_READ_WRITE_TOKEN`) | `public/kataloglar/` | `data/katalog-manifest.json` |
| **Vercel** (`BLOB_READ_WRITE_TOKEN` set)   | Vercel Blob | `katalog-manifest.json` in Blob |

Endpoints:

- `GET /api/katalog` — public; returns **active** catalogs only.
- `GET/POST/DELETE/PATCH /api/admin/kataloglar` — auth; list / register / remove / toggle.
- `POST /api/admin/upload` — auth; **filesystem mode only** (server-side upload).
- `POST /api/admin/blob-token` — auth; mints a token so the browser uploads the
  PDF **directly to Blob** (sidesteps the ~4.5 MB serverless body limit).

### Deploying to Vercel

1. Push the repo and import it in Vercel.
2. In the project's **Storage** tab, create a **Blob** store and connect it —
   this auto-injects `BLOB_READ_WRITE_TOKEN`.
3. Add env vars: `ADMIN_PASSWORD` (a strong secret) and `NEXT_PUBLIC_USE_BLOB=1`.
4. Redeploy. The admin panel now uploads catalogs straight to Blob; the public
   site reads them via `/api/katalog`. No server maintenance, no database.

## Routes

| Route | Rendering | Notes |
|-------|-----------|-------|
| `/` | Static | Split-screen portal |
| `/magaza` | Static | Retail store |
| `/exclusive` | Static | Studio portfolio |
| `/admin` | Dynamic | Login (reads cookie) |
| `/admin/panel` | Dynamic | Catalog manager |
| `/api/*` | Dynamic | Catalog endpoints |
