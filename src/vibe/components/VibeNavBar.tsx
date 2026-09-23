import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", index: "01" },
  { to: "/cv", label: "CV", index: "02" },
  { to: "/contact", label: "Contact", index: "03" },
];

/** Floating glass pill; slides away when scrolling down, back when scrolling up. */
export default function VibeNavBar() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 160);
  });

  return (
    <motion.nav
      className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-end sm:justify-center pointer-events-none pl-[72px] pr-3 sm:px-24"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <ul className="v-glass v-blur pointer-events-auto flex items-center gap-1 rounded-full p-1.5 shadow-[0_8px_40px_-12px_rgba(139,92,246,0.6)]">
        {LINKS.map((link) => {
          const active = pathname === link.to;
          return (
            <li key={link.to} className="relative">
              <NavLink
                to={link.to}
                className={`relative z-10 flex items-baseline gap-1.5 px-3 sm:px-5 py-2 text-sm sm:text-[15px] font-medium rounded-full transition-colors ${
                  active ? "text-[#0b0614]" : "text-white/70 hover:text-white"
                }`}
              >
                <span
                  className={`v-mono text-[9px] hidden sm:inline ${active ? "text-[#0b0614]/60" : "text-white/35"}`}
                >
                  {link.index}
                </span>
                {link.label}
              </NavLink>
              {active && (
                <motion.span
                  layoutId="vibe-nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(100deg,#67e8f9,#c4b5fd 45%,#f9a8d4)",
                    boxShadow: "0 0 24px rgba(196,181,253,0.55)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
