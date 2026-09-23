import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useFinePointer } from "../hooks/useMediaQuery";
import ClickBurst from "./components/ClickBurst";
import CosmicBackground from "./components/CosmicBackground";
import VibeCursor from "./components/VibeCursor";
import VibeNavBar from "./components/VibeNavBar";

/** Chrome shared by every page of the vibecode dimension. */
export default function VibeShell({ children }: { children: ReactNode }) {
  const fine = useFinePointer();
  const { pathname } = useLocation();
  return (
    <div className="vibe-root">
      <CosmicBackground />
      <VibeNavBar />
      {fine && <VibeCursor />}
      <ClickBurst />
      {/* keyed by route so every page change replays the entrance */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
