import { type MutableRefObject, useEffect, useRef } from "react";

interface Props {
  /** 0 → stars drift, 1 → full hyperspace. Read every frame. */
  intensity: MutableRefObject<number>;
  palette: string[];
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  c: string;
}

/**
 * Hyperspace tunnel: stars rush from the centre towards the viewer,
 * stretching into streaks as intensity grows.
 */
export default function WarpCanvas({ intensity, palette }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;
    let speed = 0.002;

    const spawn = (s?: Star): Star => {
      const star = s ?? ({} as Star);
      star.x = (Math.random() - 0.5) * w;
      star.y = (Math.random() - 0.5) * h;
      star.z = Math.random() * w;
      star.pz = star.z;
      star.c = palette[Math.floor(Math.random() * palette.length)];
      return star;
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(700, (w * h) / 2600));
      stars = Array.from({ length: count }, () => spawn());
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const target = 0.004 + intensity.current * 0.06;
      speed += (target - speed) * 0.05;
      const cx = w / 2;
      const cy = h / 2;

      // translucent fill leaves motion trails
      ctx.fillStyle = `rgba(5, 3, 13, ${0.35 - intensity.current * 0.15})`;
      ctx.fillRect(0, 0, w, h);

      ctx.lineCap = "round";
      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed * w;
        if (s.z < 1) {
          spawn(s);
          continue;
        }
        const sx = (s.x / s.z) * w * 0.5 + cx;
        const sy = (s.y / s.z) * w * 0.5 + cy;
        const px = (s.x / s.pz) * w * 0.5 + cx;
        const py = (s.y / s.pz) * w * 0.5 + cy;
        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
          spawn(s);
          continue;
        }
        const size = Math.max(0.4, (1 - s.z / w) * 2.6);
        ctx.strokeStyle = s.c;
        ctx.globalAlpha = Math.min(1, (1 - s.z / w) * 1.4);
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    ctx.fillStyle = "#05030d";
    ctx.fillRect(0, 0, w, h);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, palette]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
