import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "../../hooks/useMediaQuery";
import ScrambleText from "./ScrambleText";

const NAME = "CLÉMENT";
const ROLES = [
  "Full Stack Developer",
  "TypeScript lover",
  "API architect",
  "Pixel pusher",
  "Vibe coder",
];

function RoleCarousel() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom h-[1.2em]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROLES[index]}
          className="v-gradient-text font-bold whitespace-nowrap"
          initial={{ y: "110%", rotateX: -80, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-110%", rotateX: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Each letter drops in, then reacts to the pointer (desktop) or waves (touch). */
function GiantName({ fine }: { fine: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <h1
      className="v-display flex flex-wrap font-extrabold leading-[0.85] tracking-tight text-[17vw] sm:text-[10vw] xl:text-[8.5rem] select-none"
      aria-label="Clément"
    >
      {NAME.split("").map((ch, i) => [
        // Syne is very wide: on phones the name breaks editorial-style (CLÉ / MENT)
        i === 3 && (
          <span key="break" aria-hidden className="basis-full h-0 sm:hidden" />
        ),
        <motion.span
          key={i}
          aria-hidden
          className="inline-block v-gradient-text pt-[0.18em] -mt-[0.18em]"
          style={{ animationDelay: `${-i * 0.35}s` }}
          initial={{ y: "80%", opacity: 0, rotate: -12, filter: "blur(10px)" }}
          animate={
            !fine && !reduceMotion
              ? {
                  y: ["0%", "-8%", "0%"],
                  opacity: 1,
                  rotate: 0,
                  filter: "blur(0px)",
                }
              : { y: "0%", opacity: 1, rotate: 0, filter: "blur(0px)" }
          }
          transition={
            !fine && !reduceMotion
              ? {
                  y: {
                    duration: 2.4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1.6 + i * 0.12,
                    ease: "easeInOut",
                  },
                  default: {
                    duration: 0.7,
                    delay: 0.15 + i * 0.06,
                    ease: [0.2, 0.8, 0.2, 1],
                  },
                }
              : {
                  duration: 0.7,
                  delay: 0.15 + i * 0.06,
                  ease: [0.2, 0.8, 0.2, 1],
                }
          }
          whileHover={
            fine
              ? {
                  y: "-14%",
                  scaleY: 1.12,
                  rotate: i % 2 ? 6 : -6,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }
              : undefined
          }
        >
          {ch}
        </motion.span>,
      ])}
    </h1>
  );
}

export default function VibeHero() {
  const fine = useFinePointer();
  const ref = useRef<HTMLElement>(null);
  const [colorPhoto, setColorPhoto] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  // 3D tilt of the whole title block, following the mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-1, 1], [8, -8]), {
    stiffness: 120,
    damping: 20,
  });
  const rotY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), {
    stiffness: 120,
    damping: 20,
  });

  return (
    <header
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center px-5 sm:px-10 pt-28 pb-24"
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        if (!fine) return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      <motion.div
        className="max-w-6xl w-full mx-auto"
        style={{
          opacity: fade,
          rotateX: fine ? rotX : 0,
          rotateY: fine ? rotY : 0,
        }}
      >
        <div className="flex items-end justify-between gap-4 mb-2 sm:mb-0">
          <div className="min-w-0">
            <motion.p
              className="v-mono text-xs sm:text-sm text-white/60 mb-4 sm:mb-6 flex flex-wrap items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[var(--v-lime)]">~/clement</span>
              <span className="text-white/30">$</span>
              <a
                href="mailto:andreani.clement@gmail.com"
                className="v-caret hover:text-white transition-colors break-all"
              >
                <ScrambleText
                  text="andreani.clement@gmail.com"
                  delay={300}
                  duration={1100}
                />
              </a>
            </motion.p>
            <motion.p
              className="v-mono text-lg sm:text-2xl text-white/80 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Hi, I&apos;m
            </motion.p>
          </div>

          {/* morphing avatar */}
          <motion.div
            className="shrink-0"
            style={{ scale: photoScale, rotate: photoRotate }}
          >
            <motion.button
              type="button"
              aria-label="Afficher la photo en couleur"
              onClick={() => setColorPhoto((c) => !c)}
              onHoverStart={() => fine && setColorPhoto(true)}
              onHoverEnd={() => fine && setColorPhoto(false)}
              className="relative block w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44"
              initial={{ opacity: 0, scale: 0.3, rotate: -40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: 0.9,
              }}
            >
              <span className="v-blob-ring absolute -inset-1.5 opacity-90" />
              <span className="v-blob absolute inset-0 overflow-hidden bg-[#0b0614]">
                <img
                  src="/profile-clement-andreani.png"
                  alt="Clément Andreani, Développeur Full Stack"
                  className="w-full h-full object-cover transition-[filter,transform] duration-700"
                  style={{
                    filter: colorPhoto ? "none" : "grayscale(1) contrast(1.1)",
                    transform: colorPhoto ? "scale(1.08)" : "scale(1)",
                  }}
                />
              </span>
              <motion.span
                className="v-mono absolute -bottom-2 -right-2 sm:-right-6 text-[10px] px-2 py-1 rounded-full bg-[var(--v-lime)] text-[#0b0614] font-bold"
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {fine ? "hover me" : "tap me"}
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        <motion.div style={{ y: nameY }}>
          <GiantName fine={fine} />
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 text-2xl sm:text-4xl md:text-5xl font-light leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <span className="text-white/40">I&apos;m a </span>
          <br className="sm:hidden" />
          <RoleCarousel />
        </motion.div>

        <motion.p
          className="mt-6 max-w-xl text-base sm:text-lg text-[var(--v-muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Feel free to explore my portfolio and reach out&nbsp;!
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: fade }}
      >
        <span className="v-mono text-[10px] tracking-[0.35em] text-white/50">
          SCROLL
        </span>
        <span className="relative block w-px h-12 bg-white/15 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent to-[var(--v-cyan)]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 1.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </span>
      </motion.div>
    </header>
  );
}
