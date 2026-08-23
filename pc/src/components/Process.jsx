import { motion } from "framer-motion";

const STEPS = [
  { n: "01", title: "Discover", body: "Understand the client's requirements, goals and target audience." },
  { n: "02", title: "Plan", body: "Define the technology, architecture, UI and development roadmap." },
  { n: "03", title: "Build", body: "Develop the website/application with clean, scalable code." },
  { n: "04", title: "Test", body: "Perform responsive, functional and end-to-end testing." },
  { n: "05", title: "Deliver", body: "Deploy the final product and provide the required support/documentation." },
];

export default function Process() {
  return (
    <section id="process" className="relative section-glass py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-xl"
        >
          <span className="eyebrow">Process</span>
          <h2 className="font-display mt-3 text-4xl font-bold text-bone md:text-5xl">
            How a project moves from idea to launch.
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-signal via-signal-2 to-cyan/60 md:block"
          />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-signal/50 bg-charcoal font-mono text-sm text-signal-2">
                {s.n}
              </div>
              <h3 className="font-display text-lg font-semibold text-bone">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
