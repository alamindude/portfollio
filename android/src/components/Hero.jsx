import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";
import FacebookGlyph from "./FacebookGlyph";
import useIsTouch from "../hooks/useIsTouch";
import useReducedMotion from "../hooks/useReducedMotion";

const FACEBOOK_URL = "https://www.facebook.com/share/1MLdgYiYbU/";
const WHATSAPP_URL = "https://wa.me/8801326251753";

export default function Hero() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const scrollHintRef = useRef(null);
  const contentRef = useRef(null);
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();

  // Subtle mouse-driven parallax on the headline block — desktop only,
  // skipped for touch devices and reduced-motion users. Kept intentionally
  // small so it reads as depth rather than distraction.
  useEffect(() => {
    if (isTouch || reducedMotion) return;
    const el = contentRef.current;
    if (!el) return;

    let raf = null;
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0)`;
      });
    };
    const reset = () => {
      el.style.transform = "translate3d(0, 0, 0)";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", reset);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", reset);
    };
  }, [isTouch, reducedMotion]);

  // The frame-sequence animation now lives at the App level and runs the
  // full length of the page, so Hero no longer drives it. Instead, the
  // hero text fades out over its own section height as the visitor
  // scrolls past it, the same way it used to when the animation was
  // pinned locally.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, -rect.top / vh));

      if (overlayRef.current) {
        const fadeStart = 0.3;
        const opacity = p < fadeStart ? 1 : Math.max(0, 1 - (p - fadeStart) / 0.55);
        overlayRef.current.style.opacity = opacity;
        overlayRef.current.style.transform = `translateY(${p * 50}px)`;
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = p < 0.05 ? 1 : Math.max(0, 1 - p / 0.2);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 md:px-16"
    >
      {/* radial vignette so text stays legible over the moving background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,rgba(5,5,5,0.12),rgba(5,5,5,0.9)_78%)]" />

      <div
        ref={overlayRef}
        className="relative z-10 flex h-full w-full flex-col justify-center"
      >
        <div
          ref={contentRef}
          className="mx-auto w-full max-w-6xl will-change-transform"
          style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1.5 glass"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="eyebrow text-mist">Available for new projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display max-w-3xl text-[13vw] font-extrabold leading-[0.95] tracking-tight text-bone sm:text-6xl md:text-7xl"
          >
            I Build Digital
            <br />
            Experiences That
            <br />
            <span className="text-gradient">Actually Work.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-lg text-base text-mist md:text-lg"
          >
            Since 2020, I've been building websites, web applications,
            e-commerce platforms, SaaS products and automation systems for
            clients worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              Let's Work Together
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-white/10"
            >
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex items-center gap-3"
          >
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-signal hover:text-bone"
            >
              <FacebookGlyph size={17} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-signal hover:text-bone"
            >
              <MessageCircle size={17} />
            </a>
          </motion.div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="eyebrow">Scroll to explore</span>
        <ChevronDown size={16} className="animate-bounce text-mist" />
      </div>
    </section>
  );
}
