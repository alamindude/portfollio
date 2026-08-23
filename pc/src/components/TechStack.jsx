import { motion } from "framer-motion";

const TECH = [
  "HTML", "CSS", "JavaScript", "Java", "React", "React.js", "Node.js",
  "Vue.js", "Docker", "MySQL", "Python", "Git", "REST API", "JSON", "SQL",
];

function Row({ items, reverse = false, duration = 32 }) {
  // Render the list twice back-to-back so the marquee can loop seamlessly
  // from -50% back to 0 with no visible seam.
  const loop = [...items, ...items];
  return (
    <div className="marquee-row relative overflow-hidden">
      <div
        className={`marquee-track flex w-max gap-3 py-1.5 ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="glass shrink-0 rounded-xl border-line px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-signal/60 hover:text-signal-2"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const half = Math.ceil(TECH.length / 2);
  const rowA = TECH.slice(0, half);
  const rowB = TECH.slice(half);

  return (
    <section id="skills" className="relative overflow-hidden section-glass py-28">
      {/* ambient glow, echoes the accent orbs used elsewhere */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-signal/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-cyan/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <span className="eyebrow">Tech stack</span>
            <h2 className="font-display mt-3 text-4xl font-bold text-bone md:text-5xl">
              Technologies I work with.
            </h2>
          </div>
          <span className="font-mono text-sm text-mist">20+ technologies, languages & tools</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col gap-4"
      >
        {/* soft edge fade so the marquee reads as infinite, not clipped */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void to-transparent md:w-32" />

        <Row items={rowA} duration={30} />
        <Row items={rowB} reverse duration={34} />
      </motion.div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-track {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-track--reverse {
          animation-name: marqueeReverse;
        }
        .marquee-row:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
