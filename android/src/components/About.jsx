import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden section-glass py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow"
        >
          About
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display mt-3 max-w-2xl text-3xl font-bold leading-snug text-bone md:text-4xl"
        >
          Hi, I'm Alamin Khan — a professional web developer and freelancer
          focused on building modern, reliable and practical digital
          solutions.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-mist md:text-lg"
        >
          <p>
            I started learning web development in 2017 and spent several
            years building my foundation through hands-on learning and real
            projects. Since 2020, I've been working professionally with
            clients and businesses, helping turn ideas into functional
            websites, applications, e-commerce platforms, SaaS products and
            automation systems.
          </p>
          <p>
            Today, I work with a small 5-person development team, allowing us
            to move quickly while maintaining a strong focus on testing and
            quality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
