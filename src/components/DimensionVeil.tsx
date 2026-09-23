import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDimension } from "../context/DimensionContext";
import ScrambleText from "../vibe/components/ScrambleText";
import WarpCanvas from "./WarpCanvas";

const TO_VIBE_PALETTE = ["#22d3ee", "#a78bfa", "#f472b6", "#ffffff", "#fde68a"];
const TO_CLASSIC_PALETTE = ["#ffffff", "#e5e7eb", "#c4b5fd", "#a5f3fc"];

const EASE = [0.76, 0, 0.24, 1] as const;

function circle(radius: number, x: number, y: number) {
  return `circle(${radius}px at ${x}px ${y}px)`;
}

/**
 * Full-screen portal played between the two dimensions.
 * It grows out of the galaxy button, holds a hyperspace jump while the
 * site is swapped underneath, then collapses into the centre of the screen.
 */
export default function DimensionVeil() {
  const { phase, target, origin, onCovered, onRevealed } = useDimension();
  const reduceMotion = useReducedMotion();
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const intensity = useRef(0);

  useEffect(() => {
    intensity.current =
      phase === "covering" ? 0.35 : phase === "swapping" ? 1 : 0.1;
  }, [phase]);

  if (phase === "idle") return null;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const fullRadius = Math.hypot(
    Math.max(origin.x, w - origin.x),
    Math.max(origin.y, h - origin.y),
  );
  const toVibe = target === "vibe";

  const closed = reduceMotion
    ? { opacity: 0 }
    : { clipPath: circle(0, origin.x, origin.y) };
  const open = reduceMotion
    ? { opacity: 1 }
    : { clipPath: circle(fullRadius + 20, origin.x, origin.y) };
  const collapsed = reduceMotion
    ? { opacity: 0 }
    : { clipPath: circle(0, w / 2, h / 2) };

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="vibe-font fixed inset-0 z-[100] bg-[#05030d] overflow-hidden"
      initial={closed}
      animate={phase === "revealing" ? collapsed : open}
      transition={{
        duration: reduceMotion ? 0.3 : phase === "revealing" ? 0.95 : 0.85,
        ease: EASE,
      }}
      onAnimationComplete={() => {
        if (phaseRef.current === "covering") onCovered();
        else if (phaseRef.current === "revealing") onRevealed();
      }}
    >
      {!reduceMotion && (
        <WarpCanvas
          intensity={intensity}
          palette={toVibe ? TO_VIBE_PALETTE : TO_CLASSIC_PALETTE}
        />
      )}

      {/* nebula tint + vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: toVibe
            ? "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25), transparent 55%), radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.85))"
            : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.85))",
        }}
      />

      {/* the portal core — a light that swells at the jump */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "40vmin",
          height: "40vmin",
          background: toVibe
            ? "radial-gradient(circle, rgba(255,255,255,0.9), rgba(244,114,182,0.5) 25%, rgba(139,92,246,0.25) 45%, transparent 70%)"
            : "radial-gradient(circle, #fff, rgba(255,255,255,0.4) 35%, transparent 70%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === "swapping"
            ? { scale: [0.6, 1.4, 1], opacity: [0.6, 1, 0.8] }
            : phase === "revealing"
              ? { scale: 4, opacity: 0 }
              : { scale: 0.5, opacity: 0.5 }
        }
        transition={{
          duration: phase === "revealing" ? 0.8 : 0.6,
          ease: "easeOut",
        }}
      />

      {/* caption */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <motion.p
          className="v-mono text-[10px] sm:text-xs tracking-[0.4em] text-white/60 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === "revealing" ? 0 : 1, y: 0 }}
          transition={{
            delay: phase === "revealing" ? 0 : 0.35,
            duration: 0.3,
          }}
        >
          {toVibe
            ? "// DIMENSION SHIFT INITIATED"
            : "// RESTORING BASELINE REALITY"}
        </motion.p>
        <motion.h2
          className="v-display font-extrabold text-[9vw] sm:text-6xl md:text-7xl leading-none text-white"
          style={{ textShadow: "0 0 30px rgba(168,85,247,0.7)" }}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
          animate={
            phase === "revealing"
              ? { opacity: 0, scale: 1.6, filter: "blur(16px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ delay: phase === "covering" ? 0.3 : 0, duration: 0.5 }}
        >
          <ScrambleText
            text={toVibe ? "VIBECODE" : "CLASSIC"}
            delay={350}
            duration={700}
          />
        </motion.h2>

        {/* loading bar */}
        <motion.div
          className="mt-6 h-[2px] w-40 sm:w-56 bg-white/10 overflow-hidden rounded-full"
          animate={{ opacity: phase === "revealing" ? 0 : 1 }}
        >
          <motion.div
            className="h-full"
            style={{
              background: "linear-gradient(90deg,#22d3ee,#a855f7,#f472b6)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: phase === "covering" ? "55%" : "100%" }}
            transition={{
              duration: phase === "covering" ? 0.85 : 0.6,
              ease: EASE,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
