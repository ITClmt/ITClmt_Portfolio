import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useDimension } from "../context/DimensionContext";
import { useFinePointer } from "../hooks/useMediaQuery";
import { preloadVibe } from "../vibe/preload";

// Deterministic PRNG so the galaxy looks the same on every render
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ARM_COLORS = ["#fde4ff", "#f9a8d4", "#c084fc", "#818cf8", "#67e8f9"];

function buildGalaxy() {
  const rand = mulberry32(42);
  const dots: { x: number; y: number; r: number; o: number; c: string }[] = [];
  const arms = 3;
  const perArm = 46;
  for (let k = 0; k < arms; k++) {
    for (let i = 0; i < perArm; i++) {
      const t = i / perArm;
      const angle = (k * 2 * Math.PI) / arms + t * 3.4;
      const radius = 3 + t * 44;
      const jitter = (rand() - 0.5) * (1.5 + t * 7);
      dots.push({
        x: 50 + Math.cos(angle) * radius + jitter,
        y: 50 + Math.sin(angle) * radius + jitter,
        r: 0.5 + (1 - t) * 1.5 * rand() + 0.3,
        o: 1 - t * 0.55,
        c: ARM_COLORS[Math.min(ARM_COLORS.length - 1, Math.floor(t * 5))],
      });
    }
  }
  for (let i = 0; i < 28; i++) {
    const a = rand() * Math.PI * 2;
    const r = 8 + rand() * 40;
    dots.push({
      x: 50 + Math.cos(a) * r,
      y: 50 + Math.sin(a) * r,
      r: 0.3 + rand() * 0.6,
      o: 0.35 + rand() * 0.6,
      c: "#ffffff",
    });
  }
  return dots;
}

const IDLE_SPEED = 0.012; // deg per ms
const HOVER_SPEED = 0.34;

export default function GalaxyToggle() {
  const { dimension, jump, phase } = useDimension();
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dots = useMemo(buildGalaxy, []);

  // Rotation is integrated frame by frame so speeding up never "jumps"
  const galaxyRot = useMotionValue(0);
  const ringRot = useTransform(galaxyRot, (r) => -r * 0.55);
  const speed = useRef(IDLE_SPEED);
  const charging = phase === "covering";

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const targetSpeed = charging
      ? HOVER_SPEED * 3
      : hovered
        ? HOVER_SPEED
        : IDLE_SPEED * (finePointer ? 1 : 4);
    speed.current += (targetSpeed - speed.current) * 0.06;
    galaxyRot.set(galaxyRot.get() + speed.current * Math.min(delta, 64));
  });

  const scale = useSpring(1, { stiffness: 300, damping: 18 });

  const label =
    dimension === "vibe" ? "CLASSIC ✦ CLASSIC ✦ " : "VIBECODE ✦ VIBECODE ✦ ";

  const handleClick = () => {
    preloadVibe();
    const rect = buttonRef.current?.getBoundingClientRect();
    jump(
      rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : undefined,
    );
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onHoverStart={() => {
        preloadVibe();
        setHovered(true);
        scale.set(1.14);
      }}
      onHoverEnd={() => {
        setHovered(false);
        scale.set(1);
      }}
      onTapStart={() => scale.set(0.88)}
      onTap={() => scale.set(hovered ? 1.14 : 1)}
      onTapCancel={() => scale.set(1)}
      initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.3 }}
      aria-label={
        dimension === "vibe"
          ? "Revenir à la version classique du portfolio"
          : "Passer à la version vibecode du portfolio"
      }
      title={
        dimension === "vibe"
          ? "Back to reality"
          : "Enter the vibecode dimension"
      }
      className="fixed top-2.5 left-2.5 sm:top-3 sm:left-3 z-[60] w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <motion.span style={{ scale }} className="absolute inset-0 block">
        {/* soft halo */}
        <motion.span
          aria-hidden
          className="galaxy-halo absolute -inset-4 rounded-full pointer-events-none"
          animate={{
            opacity: hovered || charging ? 1 : 0.35,
            scale: hovered || charging ? 1.15 : 0.85,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* galaxy disk */}
        <span className="galaxy-disk absolute inset-[16%] rounded-full overflow-hidden">
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ rotate: galaxyRot }}
          >
            <defs>
              <radialGradient id="galaxy-core">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="18%" stopColor="#ffe4f6" />
                <stop offset="45%" stopColor="#f472b6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </radialGradient>
              <filter
                id="galaxy-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="0.8" />
              </filter>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="26"
              fill="url(#galaxy-core)"
              opacity="0.55"
            />
            <g filter="url(#galaxy-glow)">
              {dots.map((d, i) => (
                <circle
                  key={i}
                  cx={d.x}
                  cy={d.y}
                  r={d.r}
                  fill={d.c}
                  opacity={d.o}
                />
              ))}
            </g>
            {dots
              .filter((_, i) => i % 5 === 0)
              .map((d, i) => (
                <circle
                  key={`s${i}`}
                  cx={d.x}
                  cy={d.y}
                  r={d.r * 0.45}
                  fill="#fff"
                />
              ))}
            <circle cx="50" cy="50" r="7" fill="url(#galaxy-core)" />
          </motion.svg>
        </span>

        {/* orbiting label */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full overflow-visible"
          style={{ rotate: ringRot }}
        >
          <defs>
            <path
              id="galaxy-label-path"
              d="M50,50 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
            />
            <linearGradient id="galaxy-label-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <text
            fontSize="12"
            fontWeight="800"
            fill={dimension === "vibe" ? "#f5f3ff" : "url(#galaxy-label-grad)"}
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            <textPath
              href="#galaxy-label-path"
              textLength={2 * Math.PI * 43 - 2}
              lengthAdjust="spacing"
            >
              {label}
            </textPath>
          </text>
        </motion.svg>
      </motion.span>
    </motion.button>
  );
}
