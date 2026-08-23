import { motion } from "framer-motion";
import { MessageCircleHeart, ShieldCheck, Users, Rocket, Wallet } from "lucide-react";

const POINTS = [
  { icon: MessageCircleHeart, title: "Friendly Communication", body: "Development should be easy to understand. I communicate clearly and work closely with clients throughout the project." },
  { icon: ShieldCheck, title: "Quality Focused", body: "Thoroughly tested before delivery, with a strong focus on minimizing bugs and ensuring reliability." },
  { icon: Users, title: "Team-Based Development", body: "I work with a 5-person development team, allowing projects to be handled efficiently and tested from multiple perspectives." },
  { icon: Rocket, title: "Fast Delivery", body: "A structured workflow and team-based development let us complete projects efficiently while maintaining quality." },
  { icon: Wallet, title: "Competitive Pricing", body: "Professional development services at competitive and affordable rates." },
];

export default function WhyChooseMe() {
  return (
    <section className="relative overflow-hidden section-glass-void py-28">
      <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-xl"
        >
          <span className="eyebrow">Why work with me</span>
          <h2 className="font-display mt-3 text-4xl font-bold text-bone md:text-5xl">
            Why clients choose me.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group card-glass p-7 transition-colors hover:bg-white/5"
            >
              <p.icon
                size={20}
                className="text-signal-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan"
                strokeWidth={1.6}
              />
              <h3 className="font-display mt-5 text-base font-semibold text-bone">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
