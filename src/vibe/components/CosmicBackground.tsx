import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const COLORS = ["#ffffff", "#ffffff", "#c4b5fd", "#a5f3fc", "#fbcfe8"];

/**
 * Fixed deep-space backdrop: parallax starfield (mouse on desktop, scroll
 * everywhere), drifting aurora blobs, a fading grid and film grain.
 */
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let stars: {
      x: number;
      y: number;
      depth: number;
      r: number;
      c: string;
      tw: number;
    }[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(260, (w * h) / 5500));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() ** 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          depth,
          r: 0.3 + depth * 1.5,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
          tw: Math.random() * Math.PI * 2,
        };
      });
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = (e.clientX / w - 0.5) * 2;
      pointer.ty = (e.clientY / h - 0.5) * 2;
    };

    const draw = (t: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const px = s.x - pointer.x * 30 * s.depth;
        let py =
          (s.y - scroll * (0.05 + s.depth * 0.25) - pointer.y * 30 * s.depth) %
          h;
        if (py < 0) py += h;
        const twinkle = reduceMotion
          ? 0.8
          : 0.55 + Math.sin(t * 0.0015 + s.tw) * 0.45;
        ctx.globalAlpha = twinkle * (0.35 + s.depth * 0.65);
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <div className="v-aurora v-aurora-1" />
      <div className="v-aurora v-aurora-2" />
      <div className="v-aurora v-aurora-3" />
      <div className="v-grid" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="v-grain" />
    </div>
  );
}
