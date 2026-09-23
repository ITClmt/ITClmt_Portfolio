import "./App.css";
import "./vibe/vibe.css";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import DimensionVeil from "./components/DimensionVeil";
import GalaxyToggle from "./components/GalaxyToggle";
import NavBar from "./components/NavBar";
import { useDimension } from "./context/DimensionContext";
import { loadVibeShell } from "./vibe/preload";

// The vibe dimension is only downloaded when someone travels there
const VibeShell = lazy(loadVibeShell);

function App() {
  const { dimension } = useDimension();

  return (
    <>
      <GalaxyToggle />
      <DimensionVeil />
      {dimension === "vibe" ? (
        <Suspense fallback={<div className="min-h-screen bg-[#05030d]" />}>
          <VibeShell>
            <Outlet />
          </VibeShell>
        </Suspense>
      ) : (
        <>
          <NavBar />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
