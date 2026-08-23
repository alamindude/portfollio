# Alamin Khan — Portfolio (Android / Mobile Version)

A premium, dark, cinematic developer portfolio built with **React + Vite +
Tailwind CSS v4 + Framer Motion**. This is the **mobile/Android build** —
a companion to the PC version, tuned for touch scrolling and phone-size
viewports.

## Run it locally

```bash
npm install
npm run dev        # local dev server
npm run build       # production build -> dist/
npm run preview     # preview the production build
```

Requires Node.js 18+.

## What's different from the PC version

- **Hero frame sequence**: 80 portrait (1080×1920) frames instead of 240.
  Both counts are spread across the *entire page's* scroll, not just the
  hero, so the mobile build simply advances through fewer frames over
  the same total scroll distance — the scrub still feels tight instead
  of dragging.
- **Touch-tuned scroll follow**: `ScrollFrameAnimation.jsx` uses a
  snappier easing speed when `isTouch` is true, so the frame tracks a
  finger flick instead of feeling laggy behind it.
- **Eager frame decoding**: each frame is run through `img.decode()`
  before being marked loaded, so the browser rasterizes it ahead of time
  instead of stuttering on first paint.
- **Smoother upscale**: canvas context uses high-quality image smoothing
  when the portrait frames are scaled to cover the viewport.
- **`touch-action: pan-y`** on the fixed canvas wrapper so the browser
  doesn't fight the scroll gesture.

## Project structure

```
src/
  components/
    ScrollFrameAnimation.jsx   full-page fixed background, scroll-scrubbed frame player
    networkScene.js            procedural placeholder scene (fallback)
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

An 80-frame photo sequence (`public/frames/hero/frame_0001.jpg` …
`frame_0080.jpg`) plays as a **fixed full-page background** — mounted
once in `App.jsx`, sitting behind every section. Progress through the
sequence is driven by scroll position across the **entire page** (0 at
the very top, 1 at the very bottom), not just the hero, so the frames
advance continuously as you scroll from Hero all the way down to the
footer. Every section renders on top of it with a translucent/glass
background (`.section-glass` / `.section-glass-void` / `.card-glass` in
`index.css`) so the animation stays visible throughout. If a frame ever
fails to load, the component falls back to the procedural node-network
placeholder automatically, so the page never breaks.

### To replace the frame sequence later

1. Export your sequence as numbered images: `frame_0001.jpg`,
   `frame_0002.jpg`, ... `frame_00NN.jpg` (webp/jpg/png all supported).
2. Drop them in `public/frames/hero/`, replacing the existing ones.
3. In `src/App.jsx`, update the `<ScrollFrameAnimation />` `frameCount`
   prop to match. There's no `pinVh`/`mobilePinVh` any more — the
   sequence always spans the full page scroll automatically.
