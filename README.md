# Alamin Khan — Portfolio (PC + Android, auto-routed)

One project, two builds, automatic device routing. A cinematic
frame-by-frame scroll animation runs as a fixed background across the
**entire page** (not just the hero) — desktop visitors get the full
240-frame sequence, phone/tablet visitors get the lighter, touch-tuned
80-frame version — no manual switching needed.

## Quick start

```bash
npm install
npm run build
npm start
```

Then open **http://localhost:3000** — it detects your device and sends
you to the right build automatically.

- Force the desktop build: http://localhost:3000/pc/
- Force the mobile build: http://localhost:3000/android/
- Skip the redirect while testing: http://localhost:3000/?nogate=pc or `?nogate=android`

## What each command does

- **`npm install`** — installs dependencies for both the `pc/` and
  `android/` sub-projects (this is an npm workspaces monorepo, so one
  install covers both).
- **`npm run build`** — builds `pc/` and `android/` with Vite, then runs
  `scripts/assemble.js` to combine both builds plus the device-router
  page into a single `dist/` folder:
  ```
  dist/
    index.html     ← router (detects device, redirects)
    pc/             ← desktop build
    android/        ← mobile build
  ```
- **`npm start`** — runs `scripts/serve.js`, a small built-in static
  server (no extra dependencies) that serves `dist/` on port 3000.

## Project layout

```
pc/         desktop React app (240-frame scroll hero, hover cursor, etc.)
android/    mobile React app (80-frame scroll hero, touch-tuned scroll)
router/     index.html that does the device detection + redirect
scripts/    assemble.js (build step) and serve.js (npm start server)
```

Each of `pc/` and `android/` is a normal, independent Vite project — see
their own `README.md` for details on editing components, replacing the
hero frame sequence, etc. You can also work on either one alone:

```bash
npm run dev:pc        # desktop dev server
npm run dev:android   # mobile dev server
```

## Deploying to real hosting

For actual production hosting (cPanel, Hostinger, Netlify, etc.), upload
the contents of `dist/` to your web root after running `npm run build`.
No Node server is required on the host — everything in `dist/` is static
HTML/CSS/JS/images. `npm start` here is just for local preview.

## Deploying to Cloudflare Pages (via GitHub)

1. Push this repo to GitHub (the root `.gitignore` already excludes
   `node_modules` and `dist`, so only source files get committed).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages →
   Connect to Git**, and pick this repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Root directory: leave as `/` (unless this repo lives in a
     subfolder of a bigger repo)
4. Cloudflare's build image defaults to a very old Node.js version.
   This repo already pins a modern one via the `.node-version` file
   (currently `22`), so Pages picks it up automatically — no extra
   config needed.
5. Deploy. Cloudflare will run `npm install` (covers both `pc/` and
   `android/` via workspaces), then `npm run build`, then serve the
   resulting `dist/` folder — same output as testing locally with
   `npm start`.
6. Once you have your real domain (a `*.pages.dev` one or a custom
   domain attached in Cloudflare), update the placeholder domain
   (`https://alaminkhan.dev`) in `router/robots.txt` and
   `router/sitemap.xml` to match, then push again to redeploy.

## How the device routing works

`router/index.html` checks the visitor's User-Agent and pointer type
(touch vs mouse) the instant the page loads, before anything renders,
and redirects to `pc/` or `android/`. Both sub-builds also carry the
same guard in their own `index.html`, so even a direct link straight
into the wrong version bounces to the right one. Both `pc/index.html`
and `android/index.html` are marked `noindex` with a canonical link
back to `/`, so search engines only index the root domain instead of
treating the two device variants as duplicate pages.

## Notes

- There is no project-showcase section — it was removed rather than
  shipped with placeholder demo content. Add one back whenever you
  have real case studies to show.
