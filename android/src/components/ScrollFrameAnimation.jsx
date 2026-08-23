import { useEffect, useRef, useState, useCallback } from "react";
import { createScene, drawScene } from "./networkScene";

/**
 * ScrollFrameAnimation (Android / mobile build)
 * ---------------------------------------------------------------------
 * A full-page, fixed-position, scroll-scrubbed image-sequence renderer.
 * It mounts once (in App.jsx) as a background layer behind the entire
 * site — every section scrolls over it in normal document flow. Progress
 * through the frame sequence is driven by total page scroll (0 at the
 * very top of the document, 1 at the very bottom), not by any single
 * section's height, so the sequence plays continuously from the first
 * pixel of the page to the last.
 *
 * Keeps the mobile-specific tuning from the pinned version: eager frame
 * decoding, a snappier touch follow-speed, high-quality upscaling, and
 * touch-action: pan-y so the browser doesn't fight the scroll gesture.
 *
 * Props:
 *  - framesPath   folder containing frames, e.g. "frames/hero"
 *  - frameCount   total number of frames (real-image mode)
 *  - format       file extension, e.g. "webp" | "jpg" | "png"
 *  - reducedMotion  when true, renders a single static frame, no scroll loop
 */
export default function ScrollFrameAnimation({
  framesPath = null,
  frameCount = 0,
  format = "webp",
  reducedMotion = false,
  isTouch = false,
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const sceneRef = useRef(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(null);
  const dims = useRef({ w: 0, h: 0, dpr: 1 });

  const [ready, setReady] = useState(false);
  const [useRealFrames, setUseRealFrames] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Attempt to preload a real frame sequence; fall back to the procedural
  // scene if none is configured or the first frame fails to load.
  useEffect(() => {
    let cancelled = false;

    if (!framesPath || !frameCount) {
      sceneRef.current = createScene(1);
      setReady(true);
      return;
    }

    // Decode a frame eagerly so the browser rasterizes it off the main
    // thread ahead of time — avoids a visible stutter the first moment
    // each frame is drawn to canvas. Falls back to plain onload if the
    // browser doesn't support decode() or the decode fails.
    const markLoaded = (img, done) => {
      if (img.decode) {
        img.decode().then(done).catch(done);
      } else {
        done();
      }
    };

    const probe = new Image();
    probe.onload = () => {
      if (cancelled) return;
      const images = new Array(frameCount);
      let loaded = 0;
      images[0] = probe;
      const step = () => {
        loaded++;
        setLoadProgress(loaded / frameCount);
        if (loaded === frameCount && !cancelled) {
          imagesRef.current = images;
          setUseRealFrames(true);
          setReady(true);
        }
      };
      markLoaded(probe, step);
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = `${framesPath}/frame_${String(i + 1).padStart(4, "0")}.${format}`;
        img.onload = () => markLoaded(img, step);
        img.onerror = () => step();
        images[i] = img;
      }
    };
    probe.onerror = () => {
      if (cancelled) return;
      sceneRef.current = createScene(1);
      setReady(true);
    };
    probe.src = `${framesPath}/frame_0001.${format}`;

    return () => {
      cancelled = true;
    };
  }, [framesPath, frameCount, format]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    dims.current = { w, h, dpr };
  }, []);

  const drawRealFrame = useCallback((progress) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { w, h } = dims.current;
    const idx = Math.min(frameCount - 1, Math.round(progress * (frameCount - 1)));
    const img = imagesRef.current[idx];
    if (!img || !img.complete) return;
    ctx.clearRect(0, 0, w, h);
    const scale = Math.max(w / img.width, h / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }, [frameCount]);

  const drawFrame = useCallback((progress) => {
    if (useRealFrames) {
      drawRealFrame(progress);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas || !sceneRef.current) return;
    const ctx = canvas.getContext("2d");
    const { w, h } = dims.current;
    drawScene(ctx, sceneRef.current, progress, { width: w, height: h, lowFi: isTouch });
  }, [useRealFrames, drawRealFrame, isTouch]);

  // Static render for reduced-motion users: no scroll tracking, one settled frame.
  useEffect(() => {
    if (!reducedMotion || !ready) return;
    resize();
    drawFrame(0.55);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [reducedMotion, ready, resize, drawFrame]);

  // Main scroll-driven loop — progress is the fraction of the ENTIRE
  // document's scroll height, not any one section, so the frame sequence
  // spans from the top of the page to the bottom.
  useEffect(() => {
    if (reducedMotion || !ready) return;
    resize();

    // Touch scroll tends to move in short flicks, so a snappier follow
    // speed keeps the frame in sync with the finger instead of feeling
    // laggy; mouse-wheel scroll benefits from the slower, silkier ease.
    const followSpeed = isTouch ? 0.24 : 0.14;

    const computeTarget = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const total = doc.scrollHeight - window.innerHeight;
      targetRef.current = total <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / total));
    };

    const loop = () => {
      progressRef.current += (targetRef.current - progressRef.current) * followSpeed;
      if (Math.abs(progressRef.current - targetRef.current) < 0.0005) {
        progressRef.current = targetRef.current;
      }
      drawFrame(progressRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    computeTarget();
    drawFrame(targetRef.current);
    window.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("resize", computeTarget);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", computeTarget);
    };
  }, [ready, reducedMotion, resize, drawFrame, isTouch]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100svh] w-full overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ willChange: "transform" }}
      />
      {!reducedMotion && !ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="eyebrow flex items-center gap-3 text-mist">
            <span className="h-1 w-1 rounded-full bg-signal pulse-dot" />
            loading sequence {Math.round(loadProgress * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}
