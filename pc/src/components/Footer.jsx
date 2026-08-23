import { MessageCircle } from "lucide-react";
import FacebookGlyph from "./FacebookGlyph";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line section-glass-void py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-bone">Alamin Khan</p>
          <p className="text-sm text-mist">Professional Web Developer</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-bone">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/share/1MLdgYiYbU/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-signal hover:text-bone"
          >
            <FacebookGlyph size={15} />
          </a>
          <a
            href="https://wa.me/8801326251753"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-signal hover:text-bone"
          >
            <MessageCircle size={15} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-1 px-6 text-xs text-mist-dim md:flex-row md:justify-between">
        <span>© 2026 Alamin Khan. All rights reserved.</span>
        <span>Built with passion, precision & clean code.</span>
      </div>
    </footer>
  );
}
