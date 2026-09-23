import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const PHRASE = "LET'S BUILD SOMETHING ✦ ";

export default function VibeFooter() {
  const reduceMotion = useReducedMotion();
  return (
    <footer className="relative mt-10 border-t border-white/10 overflow-hidden">
      <Link
        to="/contact"
        className="v-footer-link group block py-10 sm:py-16"
        aria-label="Me contacter"
      >
        <motion.div
          aria-hidden
          className="flex whitespace-nowrap w-max"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="v-footer-word v-display text-5xl sm:text-8xl font-extrabold pr-6"
            >
              {PHRASE}
            </span>
          ))}
        </motion.div>
        <span className="v-mono mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/50 group-hover:text-white transition-colors">
          get in touch
          <span className="inline-block transition-transform group-hover:translate-x-2">
            →
          </span>
        </span>
      </Link>
      <p className="v-mono text-center pb-8 text-[11px] text-white/35">
        © {new Date().getFullYear()} Clément Andreani — Tous droits réservés.
        {" // "}crafted in another dimension
      </p>
    </footer>
  );
}
