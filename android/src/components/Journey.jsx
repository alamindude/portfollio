import { motion } from "framer-motion";

const STEPS = [
  {
    year: "2017",
    title: "Where it started",
    body: "Started learning web development under freelancer Nasim — HTML, CSS, JavaScript and practical, hands-on problem solving.",
  },
  {
    year: "2017–2020",
    title: "Building the foundation",
    body: "Several years of continuous learning and practice, sharpening web development skills through real-world projects.",
  },
  {
    year: "2020",
    title: "Turning professional",
    body: "Started working professionally as a web developer and freelancer, taking on real client work.",
  },
  {
    year: "2020–Present",
    title: "Where it's going",
    body: "Hundreds of projects across custom websites, e-commerce, SaaS, automation, bots and web applications — with modern frameworks and solid backend systems.",
  },
];

export default function Journey() {
  return (
    <section className="relative section-glass-void py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="eyebrow">My journey</span>
          <h2 className="font-display mt-3 text-4xl font-bold text-bone md:text-5xl">
            Since 2017.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-line md:left-[3px]" />
          <div className="flex flex-col gap-14">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative pl-10"
              >
                <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-signal bg-void md:h-[7px] md:w-[7px] md:translate-x-[3.5px] md:translate-y-[3px]" />
                <div className="font-mono text-xs uppercase tracking-widest text-signal-2">
                  {step.year}
                </div>
                <h3 className="font-display mt-2 text-xl font-semibold text-bone md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-lg text-mist">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
