import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import ScrambleText from "../components/ScrambleText";

const EMAIL = "andreani.clement@gmail.com";

function ContactCard({
  href,
  icon: Icon,
  title,
  value,
  external,
  index,
}: {
  href: string;
  icon: IconType;
  title: string;
  value: string;
  external?: boolean;
  index: number;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group v-glass v-spin-border v-spotlight relative block rounded-3xl bg-[#0b0718]/60 p-6 sm:p-8 overflow-hidden"
      initial={{ opacity: 0, y: 40, rotateX: 30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 0.3 + index * 0.12,
        type: "spring",
        stiffness: 120,
        damping: 16,
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      style={{ transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div className="flex items-start justify-between mb-10 sm:mb-14">
        <span className="grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-[#0b0614] transition-colors duration-300">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </span>
        <FaArrowRight className="w-5 h-5 text-white/40 -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-300" />
      </div>
      <p className="v-mono text-xs text-white/40 mb-1">{`0${index + 1} / ${title.toLowerCase()}`}</p>
      <h2 className="v-display text-2xl sm:text-3xl font-extrabold mb-1">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-[var(--v-muted)] break-all">
        {value}
      </p>
    </motion.a>
  );
}

export default function VibeContact() {
  useEffect(() => {
    document.title = "Contact — Clément Andreani | Développeur Full Stack";
  }, []);

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <main className="min-h-[100svh] px-4 sm:px-10 pt-28 sm:pt-32 pb-20 flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex-1">
        <p className="v-mono text-xs text-white/40 mb-3">{"// open channel"}</p>
        <h1 className="v-display text-[15vw] sm:text-8xl font-extrabold leading-[0.9] mb-6">
          <ScrambleText text="Let's" duration={500} />
          <br />
          <span className="v-gradient-text">
            <ScrambleText text="talk_" delay={200} duration={600} />
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--v-muted)] max-w-md mb-10 sm:mb-14">
          A project, an opportunity or just a quick hello — my inbox is open.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <ContactCard
            index={0}
            href={`mailto:${EMAIL}`}
            icon={FaEnvelope}
            title="Email"
            value={EMAIL}
          />
          <ContactCard
            index={1}
            href="https://www.linkedin.com/in/clm-andreani"
            icon={FaLinkedin}
            title="LinkedIn"
            value="Clément Andreani"
            external
          />
        </div>

        <motion.button
          type="button"
          onClick={copyEmail}
          className="v-mono mt-8 mx-auto flex items-center gap-2 text-xs sm:text-sm px-4 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileTap={{ scale: 0.94 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "ok" : "copy"}
              className="flex items-center gap-2"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {copied ? (
                <>
                  <FaCheck className="text-[var(--v-lime)]" /> copied to
                  clipboard
                </>
              ) : (
                <>
                  <FaCopy /> copy email
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </main>
  );
}
