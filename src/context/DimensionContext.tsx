import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Dimension = "classic" | "vibe";

/**
 * Phases of the dimension jump:
 * idle → covering (veil grows from the button) → swapping (veil fully covers,
 * the site is replaced underneath) → revealing (veil collapses) → idle
 */
export type JumpPhase = "idle" | "covering" | "swapping" | "revealing";

interface DimensionContextValue {
  dimension: Dimension;
  phase: JumpPhase;
  /** Target of the current jump, useful to theme the veil. */
  target: Dimension;
  /** Viewport point the veil grows from (the toggle button centre). */
  origin: { x: number; y: number };
  jump: (origin?: { x: number; y: number }) => void;
  /** Called by the veil when its enter/exit animations finish. */
  onCovered: () => void;
  onRevealed: () => void;
}

const STORAGE_KEY = "itclmt-dimension";
const SWAP_HOLD_MS = 650;
// Safety nets in case an animation callback never fires (throttled tab…)
const COVER_TIMEOUT_MS = 1600;
const REVEAL_TIMEOUT_MS = 1900;

const DimensionContext = createContext<DimensionContextValue | null>(null);

function readStoredDimension(): Dimension {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("vibe");
    if (fromUrl !== null) return fromUrl === "0" ? "classic" : "vibe";
    return localStorage.getItem(STORAGE_KEY) === "vibe" ? "vibe" : "classic";
  } catch {
    return "classic";
  }
}

export function DimensionProvider({ children }: { children: ReactNode }) {
  const [dimension, setDimension] = useState<Dimension>(readStoredDimension);
  const [phase, setPhase] = useState<JumpPhase>("idle");
  const [origin, setOrigin] = useState({ x: 40, y: 40 });
  const holdTimer = useRef<number>();
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const target: Dimension =
    phase === "idle" || phase === "covering"
      ? dimension === "vibe"
        ? "classic"
        : "vibe"
      : dimension;

  useEffect(() => {
    document.documentElement.dataset.dimension = dimension;
    try {
      localStorage.setItem(STORAGE_KEY, dimension);
    } catch {
      // storage unavailable (private mode) — the jump still works in memory
    }
  }, [dimension]);

  // Lock scrolling while the veil is on screen
  useEffect(() => {
    document.documentElement.style.overflow = phase === "idle" ? "" : "hidden";
  }, [phase]);

  useEffect(() => () => window.clearTimeout(holdTimer.current), []);

  const jump = useCallback(
    (from?: { x: number; y: number }) => {
      if (phase !== "idle") return;
      if (from) setOrigin(from);
      setPhase("covering");
    },
    [phase],
  );

  const onCovered = useCallback(() => {
    if (phaseRef.current !== "covering") return;
    phaseRef.current = "swapping";
    setPhase("swapping");
    setDimension((d) => (d === "vibe" ? "classic" : "vibe"));
    window.scrollTo({ top: 0, behavior: "instant" });
    holdTimer.current = window.setTimeout(
      () => setPhase("revealing"),
      SWAP_HOLD_MS,
    );
  }, []);

  const onRevealed = useCallback(() => setPhase("idle"), []);

  useEffect(() => {
    if (phase !== "covering" && phase !== "revealing") return;
    const id = window.setTimeout(
      phase === "covering" ? onCovered : onRevealed,
      phase === "covering" ? COVER_TIMEOUT_MS : REVEAL_TIMEOUT_MS,
    );
    return () => window.clearTimeout(id);
  }, [phase, onCovered, onRevealed]);

  const value = useMemo(
    () => ({
      dimension,
      phase,
      target,
      origin,
      jump,
      onCovered,
      onRevealed,
    }),
    [dimension, phase, target, origin, jump, onCovered, onRevealed],
  );

  return (
    <DimensionContext.Provider value={value}>
      {children}
    </DimensionContext.Provider>
  );
}

export function useDimension() {
  const ctx = useContext(DimensionContext);
  if (!ctx) {
    throw new Error("useDimension must be used inside <DimensionProvider>");
  }
  return ctx;
}
