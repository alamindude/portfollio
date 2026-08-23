# Alamin Khan — Portfolio

A premium, dark, cinematic developer portfolio built with **React + Vite + Tailwind CSS v4 + Framer Motion**, per the master prompt spec.

## Run it locally

```bash
npm install
npm run dev        # local dev server
npm run build       # production build -> dist/
npm run preview     # preview the production build
```

Requires Node.js 18+.

## Project structure

```
src/
  components/
    ScrollFrameAnimation.jsx   full-page fixed background, scroll-scrubbed frame player
    networkScene.js            procedural placeholder scene (see below)
    Hero.jsx, Navbar.jsx, Stats.jsx, Journey.jsx, About.jsx,
    Services.jsx, TechStack.jsx, WhyChooseMe.jsx, Process.jsx,
    Projects.jsx, Contact.jsx, Footer.jsx, CustomCursor.jsx,
    ScrollProgress.jsx, TiltCard.jsx, FacebookGlyph.jsx
  hooks/
    useReducedMotion.js, useIsTouch.js
  index.css                    design tokens (colors, fonts) + global styles
  App.jsx, main.jsx
```

## About the hero animation

A real 240-frame photo sequence (`public/frames/hero/frame_0001.jpg`
… `frame_0240.jpg`) plays as a **fixed full-page background** — mounted
once in `App.jsx`, sitting behind every section. Progress through the
sequence is driven by scroll position across the **entire page** (0 at
the very top, 1 at the very bottom), not just the hero, so the frames
advance continuously as you scroll from Hero all the way down to the
footer. Every section renders on top of it with a translucent/glass
background (`.section-glass` / `.section-glass-void` / `.card-glass` in
`index.css`) so the animation stays visible throughout instead of being
hidden behind solid panels. If a frame ever fails to load, the component
falls back to the procedural node-network placeholder automatically, so
the page never breaks.

This is the **PC version**. A separate Android/mobile build (lighter
frame count, touch-tuned) lives alongside it in `../android/`.

### To replace the frame sequence later

1. Export your sequence as numbered images: `frame_0001.jpg`,
   `frame_0002.jpg`, ... `frame_00NN.jpg` (webp/jpg/png all supported).
2. Drop them in `public/frames/hero/`, replacing the existing ones.
3. In `src/App.jsx`, update the `<ScrollFrameAnimation />` props:

```jsx
<ScrollFrameAnimation
  framesPath="frames/hero"
  frameCount={240}      // your actual frame count
  format="jpg"
  reducedMotion={reducedMotion}
  isTouch={isTouch}
/>
```

There's no `pinVh`/`mobilePinVh` to configure any more — the sequence
always spans the full page scroll automatically, however long the page
happens to be.

That's it — the component auto-detects real frames (it probes for
`frame_0001`) and switches from the procedural scene to your images with no
other code changes. Everything else (smoothing, reverse-scroll,
resize handling, reduced-motion fallback, loading indicator) already works
for both modes.

Tips for a good sequence: 90-150 frames is usually enough for a smooth
4-6 second scroll reveal; keep each frame under ~150KB (webp) so mobile
stays fast; the component covers the canvas (crop-to-fill), so export at a
consistent aspect ratio close to widescreen.

## Content still marked as placeholder

- Project showcase (4 slots) — replace names, cover images, tags and
  descriptions with real case studies in `src/components/Projects.jsx`.
- OG share image — add a real `public/og-image.jpg` (1200x630).

## Notes

- Respects `prefers-reduced-motion` throughout (hero, cursor, floating badges).
- Custom cursor and card tilt effects are automatically disabled on touch devices.
- Contact/WhatsApp links point to the number and Facebook page from the brief —
  double check these before launch.
