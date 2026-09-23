import { lazy, type ReactNode, Suspense } from "react";
import { useDimension } from "../context/DimensionContext";
import { loadVibeContact, loadVibeCv, loadVibeHome } from "../vibe/preload";

const VibeHome = lazy(loadVibeHome);
const VibeCv = lazy(loadVibeCv);
const VibeContact = lazy(loadVibeContact);

const VIBE_PAGES = {
  home: VibeHome,
  cv: VibeCv,
  contact: VibeContact,
};

/** Renders the classic page, or its counterpart from the vibe dimension. */
export default function DimensionSwitch({
  classic,
  vibe,
}: {
  classic: ReactNode;
  vibe: keyof typeof VIBE_PAGES;
}) {
  const { dimension } = useDimension();
  if (dimension !== "vibe") return <>{classic}</>;
  const VibePage = VIBE_PAGES[vibe];
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <VibePage />
    </Suspense>
  );
}
