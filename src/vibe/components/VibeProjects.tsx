import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { type Project, projects } from "../../data/projects";
import { useFinePointer } from "../../hooks/useMediaQuery";
import Magnetic from "./Magnetic";

type Tab = "featured" | "others";

function ProjectCard({
  project,
  index,
  fine,
}: {
  project: Project;
  index: number;
  fine: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(imageRef, { amount: 0.6 });
  const [glitch, setGlitch] = useState(false);

  // Touch devices have no hover: fire the glitch once when the shot scrolls in
  useEffect(() => {
    if (fine || !inView) return;
    setGlitch(true);
    const t = window.setTimeout(() => setGlitch(false), 950);
    return () => window.clearTimeout(t);
  }, [inView, fine]);

  // Scroll-linked entrance: card tips forward from below like a page turning
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.55"],
  });
  const enterRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [fine ? 18 : 28, 0],
  );
  const enterScale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const enterOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  // Pointer tilt (desktop only)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(py, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const tiltY = useSpring(useTransform(px, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      style={{
        rotateX: enterRotate,
        scale: enterScale,
        opacity: enterOpacity,
        transformPerspective: 1200,
        transformOrigin: "50% 100%",
      }}
    >
      <motion.article
        ref={ref}
        className="v-glass v-spotlight v-spin-border relative rounded-3xl bg-[#0b0718]/60 p-4 sm:p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-10 items-center"
        style={{
          rotateX: fine ? tiltX : 0,
          rotateY: fine ? tiltY : 0,
          transformPerspective: 1000,
        }}
        onPointerMove={(e) => {
          if (!fine) return;
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          px.set(x);
          py.set(y);
          e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
          e.currentTarget.style.setProperty("--my", `${y * 100}%`);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {/* giant index number */}
        <span
          aria-hidden
          className={`v-display v-outline-text absolute -top-7 sm:-top-10 text-6xl sm:text-8xl font-extrabold pointer-events-none select-none ${
            reversed ? "right-4 sm:right-8" : "left-4 sm:left-8"
          }`}
        >
          {number}
        </span>

        {/* image */}
        <a
          ref={imageRef}
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Voir la démo de ${project.title}`}
          data-glitch={glitch ? "on" : "off"}
          className={`v-glitch group block rounded-2xl aspect-video ring-1 ring-white/10 ${
            reversed ? "md:order-2" : ""
          }`}
          style={{ "--img": `url(${project.imageUrl})` } as CSSProperties}
        >
          <img
            src={project.imageUrl}
            alt={`Capture d'écran du projet ${project.title}`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#05030d]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
          <span className="v-mono absolute bottom-3 left-3 text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-black/50 backdrop-blur text-white/80 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--v-lime)] animate-pulse" />
            live
          </span>
        </a>

        {/* content */}
        <div className="relative z-[2] flex flex-col gap-4 sm:gap-5">
          <h3 className="v-display text-2xl sm:text-4xl font-extrabold leading-none">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-[var(--v-muted)] leading-relaxed">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <motion.li
                key={tech}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="v-mono text-[11px] sm:text-xs px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-white/75"
              >
                {tech}
              </motion.li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl && (
              <Magnetic>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium hover:bg-white hover:text-[#0b0614] transition-colors"
                >
                  <FaGithub /> GitHub
                </a>
              </Magnetic>
            )}
            {project.demoUrl && (
              <Magnetic>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0b0614] shadow-[0_0_24px_-4px_rgba(196,181,253,0.7)]"
                  style={{
                    background:
                      "linear-gradient(100deg,#67e8f9,#c4b5fd 45%,#f9a8d4)",
                  }}
                >
                  Live Demo
                  <FaArrowRight className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-rotate-45" />
                </a>
              </Magnetic>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/** Outline title that fills with gradient as it crosses the viewport. */
function FillTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const clip = useTransform(
    scrollYProgress,
    (p) => `inset(0 ${100 - p * 100}% 0 0)`,
  );
  return (
    <h2
      ref={ref}
      className="v-display relative text-[13vw] sm:text-[12vw] lg:text-[9rem] font-extrabold leading-none tracking-tight"
    >
      <span className="v-outline-text">Projects</span>
      <motion.span
        aria-hidden
        className="v-gradient-text absolute inset-0"
        style={{ clipPath: clip }}
      >
        Projects
      </motion.span>
    </h2>
  );
}

export default function VibeProjects() {
  const fine = useFinePointer();
  const [tab, setTab] = useState<Tab>("featured");
  const visible = projects.filter((p) =>
    tab === "featured" ? p.featured : !p.featured,
  );

  return (
    <section className="relative px-4 sm:px-10 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 mb-14 sm:mb-20">
          <FillTitle />

          <div
            role="tablist"
            aria-label="Filtrer les projets"
            className="v-glass self-start sm:self-end flex rounded-full p-1.5"
          >
            {(["featured", "others"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`relative px-4 sm:px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                  tab === t
                    ? "text-[#0b0614]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="vibe-project-tab"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {t === "featured" ? "Featured" : "Other Projects"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="grid gap-16 sm:gap-24"
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
            transition={{ duration: 0.4 }}
          >
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                fine={fine}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
