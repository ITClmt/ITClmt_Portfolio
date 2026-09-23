import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ΛΣΞ░▒▓";

interface Props {
  text: string;
  /** ms before the scramble starts */
  delay?: number;
  /** ms for the whole reveal */
  duration?: number;
  className?: string;
}

/**
 * Hacker-style reveal: each character cycles through random glyphs
 * before locking in, left to right.
 */
export default function ScrambleText({
  text,
  delay = 0,
  duration = 900,
  className,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [output, setOutput] = useState(reduceMotion ? text : "");

  useEffect(() => {
    if (reduceMotion) {
      setOutput(text);
      return;
    }
    let raf = 0;
    let start = 0;
    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const progress = Math.min(1, (now - start) / duration);
        const locked = Math.floor(progress * text.length);
        let next = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < locked || ch === " ") next += ch;
          else if (i < locked + 6)
            next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOutput(next);
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, duration, reduceMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{output || " "}</span>
    </span>
  );
}
