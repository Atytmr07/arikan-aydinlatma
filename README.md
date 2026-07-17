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
| **Local dev** (no `FIREBASE_*` vars) | `public/kataloglar/` | `data/katalog-manifest.json` |
| **Production** (`FIREBASE_*` vars set) | Firebase Storage | `katalog-manifest.json` in the bucket (private) |

Endpoints:

- `GET /api/katalog` — public; returns **active** catalogs only.
- `GET/POST/DELETE/PATCH /api/admin/kataloglar` — auth; list / register / remove / toggle.
- `POST /api/admin/upload` — auth; **filesystem mode only** (server-side upload).
- `POST /api/admin/upload-url` — auth; mints a signed URL so the browser uploads
  the PDF **directly to Firebase Storage** (sidesteps the ~4.5 MB serverless
  body limit). Public download links use Firebase download tokens, so no
  Storage security-rule changes are needed — default (deny-all) rules are fine.

### Firebase setup (one-time)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
   and upgrade it to the **Blaze** plan (required for Storage; usage stays free
   within the ~5 GB no-cost quota).
2. Enable **Storage** (Build → Storage → Get started). Note the bucket name,
   e.g. `my-project.firebasestorage.app`.
3. Create a service-account key: Project settings → Service accounts →
   **Generate new private key**. The JSON contains `project_id`,
   `client_email`, and `private_key`.
4. Allow browser uploads (CORS) — in [Cloud Shell](https://console.cloud.google.com/)
   run once (upload `scripts/cors.json` first, or paste its content):

   ```sh
   gcloud storage buckets update gs://MY_BUCKET --cors-file=cors.json
   ```

### Deploying to Vercel

1. Push the repo and import it in Vercel.
2. Add env vars: `ADMIN_PASSWORD` (a strong secret), `NEXT_PUBLIC_USE_FIREBASE=1`,
   and the four values from the service-account JSON: `FIREBASE_PROJECT_ID`,
   `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (paste the whole key,
   including the `\n` sequences), `FIREBASE_STORAGE_BUCKET`.
3. Redeploy. The admin panel now uploads catalogs straight to Firebase Storage;
   the public site reads them via `/api/katalog`. No server maintenance, no
   database.

## Routes

| Route | Rendering | Notes |
|-------|-----------|-------|
| `/` | Static | Split-screen portal |
| `/magaza` | Static | Retail store |
| `/exclusive` | Static | Studio portfolio |
| `/admin` | Dynamic | Login (reads cookie) |
| `/admin/panel` | Dynamic | Catalog manager |
| `/api/*` | Dynamic | Catalog endpoints |
