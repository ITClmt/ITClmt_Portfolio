import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useFinePointer } from "../../hooks/useMediaQuery";
import Magnetic from "../components/Magnetic";
import ScrambleText from "../components/ScrambleText";

const CVS = {
  normal: {
    label: "Normal",
    image: "/CV_Clement_Andreani.webp",
    pdf: "/CV_Clement_Andreani.pdf",
    download: "CV_Clément_Andreani_dev.pdf",
  },
  inter: {
    label: "International",
    image: "/CV_DEV_EN_Clement_Andreani_inter.webp",
    pdf: "/CV_DEV_EN_Clement_Andreani_inter.pdf",
    download: "CV_Clément_Andreani_inter.pdf",
  },
} as const;

type CvType = keyof typeof CVS;

export default function VibeCv() {
  useEffect(() => {
    document.title = "CV — Clément Andreani | Développeur Full Stack";
  }, []);

  const fine = useFinePointer();
  const [cvType, setCvType] = useState<CvType>("normal");
  const cv = CVS[cvType];

  // hologram tilt
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useSpring(useTransform(py, [0, 1], [5, -5]), {
    stiffness: 150,
    damping: 18,
  });
  const rotY = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 150,
    damping: 18,
  });
  const glare = useTransform(
    px,
    (x) =>
      `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.35) ${x * 100}%, transparent 80%)`,
  );

  return (
    <main className="min-h-[100svh] px-4 sm:px-10 pt-28 sm:pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <p className="v-mono text-xs text-white/40 mb-3">{"// resume.exe"}</p>
        <h1 className="v-display text-[10vw] sm:text-[9vw] md:text-7xl font-extrabold leading-[0.95] mb-8">
          <ScrambleText text="Curriculum" duration={700} />
          <br />
          <span className="v-gradient-text">
            <ScrambleText text="Vitae." delay={250} duration={600} />
          </span>
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div
            className="v-glass flex rounded-full p-1.5"
          >
            {(Object.keys(CVS) as CvType[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={cvType === key}
                onClick={() => setCvType(key)}
                className={`relative px-4 sm:px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                  cvType === key
                    ? "text-[#0b0614]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {cvType === key && (
                  <motion.span
                    layoutId="vibe-cv-switch"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(100deg,#67e8f9,#c4b5fd 45%,#f9a8d4)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{CVS[key].label}</span>
              </button>
            ))}
          </div>

          <Magnetic>
            <a
              href={cv.pdf}
              download={cv.download}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#0b0614] font-semibold text-sm shadow-[0_0_40px_-8px_rgba(255,255,255,0.7)] hover:shadow-[0_0_50px_-4px_rgba(244,114,182,0.9)] transition-shadow"
            >
              <FaDownload className="transition-transform group-hover:translate-y-0.5 group-hover:animate-bounce" />
              Download CV
            </a>
          </Magnetic>
        </div>

        {/* hologram frame */}
        <motion.div
          className="relative"
          style={{
            rotateX: fine ? rotX : 0,
            rotateY: fine ? rotY : 0,
            transformPerspective: 1400,
          }}
          onPointerMove={(e) => {
            if (!fine) return;
            const r = e.currentTarget.getBoundingClientRect();
            px.set((e.clientX - r.left) / r.width);
            py.set((e.clientY - r.top) / r.height);
          }}
          onPointerLeave={() => {
            px.set(0.5);
            py.set(0.5);
          }}
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
            style={{
              background:
                "conic-gradient(from 180deg,#22d3ee,#8b5cf6,#f472b6,#fb923c,#22d3ee)",
            }}
          />
          <div className="v-spin-border v-scan relative rounded-2xl p-2 sm:p-3 bg-[#0b0614]/80">
            <AnimatePresence mode="wait">
              <motion.img
                key={cv.image}
                src={cv.image}
                alt="CV de Clément Andreani, Développeur Full Stack"
                className="relative w-full rounded-xl"
                initial={{
                  opacity: 0,
                  rotateY: -70,
                  filter: "blur(10px) hue-rotate(90deg)",
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  filter: "blur(0px) hue-rotate(0deg)",
                }}
                exit={{
                  opacity: 0,
                  rotateY: 70,
                  filter: "blur(10px) hue-rotate(-90deg)",
                }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ transformPerspective: 1200 }}
              />
            </AnimatePresence>
            {fine && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
                style={{ background: glare }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
