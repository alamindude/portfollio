import { motion } from "framer-motion";
import {
  Globe, ShoppingCart, LayoutDashboard, Workflow, Braces,
  Bot, Terminal, MessageSquare, Send, Gamepad2, Sparkles,
} from "lucide-react";
import FacebookGlyph from "./FacebookGlyph";
import TiltCard from "./TiltCard";
import useIsTouch from "../hooks/useIsTouch";

const SERVICES = [
  { icon: Globe, title: "Custom Website Development", body: "Modern, responsive and conversion-focused websites built specifically around the client's requirements." },
  { icon: ShoppingCart, title: "E-commerce Development", body: "Complete e-commerce solutions with modern UI, product management, payment integrations and scalable architecture." },
  { icon: LayoutDashboard, title: "SaaS & Managed Web Applications", body: "Custom SaaS platforms, dashboards, management systems and business-oriented web applications." },
  { icon: Workflow, title: "Automation", body: "Custom automation systems that reduce repetitive work and improve productivity." },
  { icon: Braces, title: "Node.js / React.js Development", body: "Modern frontend and backend applications using the JavaScript/TypeScript ecosystem." },
  { icon: Terminal, title: "Python Bots", body: "Custom Python-based automation and bot solutions." },
  { icon: Bot, title: "Node.js Bots", body: "Fast and scalable bots and automation systems using Node.js." },
  { icon: MessageSquare, title: "WhatsApp Bots", body: "Custom WhatsApp automation and business workflow solutions." },
  { icon: FacebookGlyph, title: "Facebook Bots", body: "Custom Facebook automation and messaging solutions." },
  { icon: Send, title: "Telegram Bots", body: "Telegram bots for automation, business workflows and custom functionality." },
  { icon: Gamepad2, title: "Discord Bots", body: "Custom Discord bots for communities, automation and integrations." },
  { icon: Sparkles, title: "And much more...", body: "If it can be built for the web, there's a good chance it's in scope — get in touch to talk specifics." },
];

export default function Services() {
  const isTouch = useIsTouch();

  return (
    <section id="services" className="relative overflow-hidden section-glass-void py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-signal/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full bg-cyan/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-xl"
        >
          <span className="eyebrow">Services</span>
          <h2 className="font-display mt-3 text-4xl font-bold text-bone md:text-5xl">
            What I can build for you.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <TiltCard
                isTouch={isTouch}
                className="glass group h-full rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_0_50px_-14px_rgba(110,86,255,0.45)]"
              >
                <s.icon
                  size={22}
                  className="text-signal-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan"
                  strokeWidth={1.6}
                />
                <h3 className="font-display mt-4 text-lg font-semibold text-bone">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
