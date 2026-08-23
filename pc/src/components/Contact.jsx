import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/8801326251753";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden section-glass-void py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-signal/20 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow"
        >
          Get in touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="font-display mt-4 text-4xl font-extrabold leading-tight text-bone md:text-6xl"
        >
          Have an idea?
          <br />
          <span className="text-gradient">Let's build it.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="mx-auto mt-6 max-w-lg text-mist"
        >
          Whether you need a modern website, e-commerce platform, SaaS
          application or custom automation, let's turn your idea into
          something real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-bone px-7 py-4 text-sm font-medium text-void transition-transform hover:scale-105"
          >
            Start a Project
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-bone transition-colors hover:bg-white/10"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-16 w-fit border-t border-line pt-8"
        >
          <p className="font-display text-lg font-semibold text-bone">Alamin Khan</p>
          <p className="text-sm text-mist">Professional Web Developer</p>
          <p className="mt-3 font-mono text-sm text-mist-dim">+880 1326‑251753</p>
        </motion.div>
      </div>
    </section>
  );
}
