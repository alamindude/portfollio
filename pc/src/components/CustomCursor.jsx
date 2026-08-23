import { useEffect, useRef } from "react";

export default function CustomCursor({ isTouch, reducedMotion }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const target = e.target.closest("a, button, [role='button']");
      if (ringRef.current) {
        ringRef.current.style.width = target ? "44px" : "28px";
        ringRef.current.style.height = target ? "44px" : "28px";
        ringRef.current.style.borderColor = target
          ? "rgba(110,86,255,0.8)"
          : "rgba(255,255,255,0.35)";
      }
    };

    let raf;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "auto";
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone"
      />
      <div
        ref={ringRef}
        style={{ width: 28, height: 28 }}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color] duration-200"
      />
    </div>
  );
}
