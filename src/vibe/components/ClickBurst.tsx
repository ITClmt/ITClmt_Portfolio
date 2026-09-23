import { useEffect } from "react";

const COLORS = ["#22d3ee", "#a78bfa", "#f472b6", "#fb923c", "#bef264"];

/**
 * Every tap / click spawns a shockwave ring and a handful of sparks.
 * On touch screens this replaces hover feedback; animations run on the
 * compositor through the Web Animations API, so it stays cheap.
 */
export default function ClickBurst() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:95;overflow:hidden";
    document.body.appendChild(layer);

    const onDown = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      const touch = e.pointerType !== "mouse";

      const ring = document.createElement("span");
      ring.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;border:2px solid ${COLORS[Math.floor(Math.random() * COLORS.length)]};`;
      layer.appendChild(ring);
      ring
        .animate(
          [
            { transform: "scale(1)", opacity: 1 },
            { transform: `scale(${touch ? 9 : 6})`, opacity: 0 },
          ],
          { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" },
        )
        .finished.then(() => ring.remove());

      const sparks = touch ? 10 : 7;
      for (let i = 0; i < sparks; i++) {
        const spark = document.createElement("span");
        const angle = (i / sparks) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 30 + Math.random() * (touch ? 50 : 35);
        const size = 3 + Math.random() * 3;
        spark.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;margin:-${size / 2}px 0 0 -${size / 2}px;border-radius:50%;background:${COLORS[i % COLORS.length]};box-shadow:0 0 8px ${COLORS[i % COLORS.length]};`;
        layer.appendChild(spark);
        spark
          .animate(
            [
              { transform: "translate(0,0) scale(1)", opacity: 1 },
              {
                transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`,
                opacity: 0,
              },
            ],
            {
              duration: 550 + Math.random() * 250,
              easing: "cubic-bezier(.1,.7,.3,1)",
            },
          )
          .finished.then(() => spark.remove());
      }
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      layer.remove();
    };
  }, []);

  return null;
}
