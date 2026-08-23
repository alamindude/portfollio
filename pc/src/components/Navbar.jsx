import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a
            href="#home"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-sm font-medium text-bone glass"
          >
            AK
          </a>

          <nav
            className={`hidden items-center gap-1 rounded-full px-2 py-2 md:flex transition-all duration-500 ${
              scrolled ? "glass" : "border border-transparent"
            }`}
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-mist transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-void transition-transform hover:scale-105 md:inline-block"
          >
            Let's Talk
          </a>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-bone md:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-void/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-mono text-sm text-mist">AK / menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-bone"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 pt-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-line py-4 font-display text-3xl font-medium text-bone"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
