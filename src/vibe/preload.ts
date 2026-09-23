// Dynamic imports for the vibe dimension. Modules are cached after the first
// call, so preloading on hover makes the jump instant.
export const loadVibeShell = () => import("./VibeShell");
export const loadVibeHome = () => import("./pages/VibeHome");
export const loadVibeCv = () => import("./pages/VibeCv");
export const loadVibeContact = () => import("./pages/VibeContact");

export function preloadVibe() {
  loadVibeShell();
  loadVibeHome();
  loadVibeCv();
  loadVibeContact();
}
