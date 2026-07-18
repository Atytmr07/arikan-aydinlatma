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

No database and **no service-account key** — catalogs are a few PDFs plus a
small JSON index (`katalog-manifest.json`), both stored in **Firebase Storage**.
Everything runs through the Firebase **Web SDK** ([`lib/firebaseClient.ts`](lib/firebaseClient.ts)):

- **Reads** are public (Storage Rules `allow read: if true`). The manifest and
  PDFs are served via token-free media URLs. `GET /api/katalog` (and
  `GET /api/manifest`) fetch the manifest server-side and return JSON.
- **Writes** (upload / delete / toggle) happen in the browser via the Web SDK,
  gated by **Firebase Auth** — only the signed-in admin (by UID) can write.

The Firebase web config in `lib/firebaseClient.ts` is **public by design** (it
ships in the client bundle); security comes from Storage Rules + Auth, not from
hiding it.

### Firebase setup (one-time)

1. Create a project and upgrade to the **Blaze** plan (required for Storage;
   stays free within the ~5 GB / 100 GB-egress no-cost quota).
2. Enable **Storage** (Build → Storage → Get started).
3. Enable **Authentication → Email/Password**, then add one admin user
   (Authentication → Users → Add user). This is the panel login. Copy its **UID**.
4. Storage → **Rules** → publish:

   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null
                      && request.auth.uid == "PASTE_ADMIN_UID";
       }
     }
   }
   ```

5. Put the web config values into [`lib/firebaseClient.ts`](lib/firebaseClient.ts)
   (Project settings → General → your web app).

### Deploying to Vercel

Just push and import — **no environment variables needed** for storage. The admin
signs in at `/admin` with the Firebase email/password; uploads go straight to
Firebase Storage from the browser. No server maintenance, no database, no keys.

## Routes

| Route | Rendering | Notes |
|-------|-----------|-------|
| `/` | Static | Split-screen portal |
| `/magaza` | Static | Retail store |
| `/exclusive` | Static | Studio portfolio |
| `/admin` | Static | Firebase Auth login + catalog manager (client-gated) |
| `/api/katalog` | Dynamic | Public — active catalogs |
| `/api/manifest` | Dynamic | Full manifest for the admin panel |
