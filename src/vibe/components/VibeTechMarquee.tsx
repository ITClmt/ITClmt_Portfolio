import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { type Tech, techs } from "../../data/techs";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Infinite row that speeds up, reverses and skews with scroll velocity.
 * Content is rendered four times and wrapped at -25% for a seamless loop, even on ultrawide screens.
 */
function VelocityRow({
  items,
  baseVelocity,
}: {
  items: Tech[];
  baseVelocity: number;
}) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [-4, 0, 4],
    {
      clamp: false,
    },
  );
  const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [12, 0, -12]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap">
      <motion.div
        className="flex shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4"
        style={{ x, skewX }}
      >
        {[...items, ...items, ...items, ...items].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group bg-white/[0.04] border border-white/10 flex items-center gap-2.5 sm:gap-3 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 transition-[border-color,box-shadow,transform] duration-300 hover:border-fuchsia-400/60 hover:shadow-[0_0_30px_-4px_rgba(232,121,249,0.6)] hover:-translate-y-1"
            data-cursor
          >
            <tech.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/70 group-hover:text-white transition-colors" />
            <span className="text-sm sm:text-base font-medium text-white/80 group-hover:text-white">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function VibeTechMarquee() {
  const half = Math.ceil(techs.length / 2);
  return (
    <section aria-label="Technologies" className="relative py-16 sm:py-24">
      <div className="px-5 sm:px-10 max-w-6xl mx-auto mb-8 sm:mb-10 flex items-end justify-between gap-4">
        <h2 className="v-display text-3xl sm:text-5xl font-extrabold">
          Stack<span className="v-gradient-text">.</span>
        </h2>
        <p className="v-mono text-[11px] sm:text-xs text-white/40 text-right">
          {"// scroll faster →"}
          <br />
          it reacts
        </p>
      </div>
      <div className="relative -rotate-2 space-y-3 sm:space-y-4 py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <VelocityRow items={techs.slice(0, half)} baseVelocity={-1.2} />
        <VelocityRow items={techs.slice(half)} baseVelocity={1.2} />
      </div>
    </section>
  );
}
