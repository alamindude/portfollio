import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { value: 6, suffix: "+", label: "Years", sub: "Experience in web development" },
  { value: 450, suffix: "+", label: "Projects", sub: "Projects worked on across the team" },
  { value: 5, suffix: "", label: "Developers", sub: "Members on the development team" },
  { value: 20, suffix: "+", label: "Technologies", sub: "Technologies & languages used" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-extrabold text-bone md:text-6xl">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-line section-glass py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-l border-line pl-5"
            >
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-2 font-mono text-xs uppercase tracking-widest text-signal-2">
                {s.label}
              </div>
              <p className="mt-1 text-sm text-mist">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
