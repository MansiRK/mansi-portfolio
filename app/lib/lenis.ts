import type Lenis from "lenis";

// Shared handle so other components (back-to-top, modal, sidebar) can talk to the smooth scroller.
// Stays null when the visitor prefers reduced motion, so callers fall back to native scrolling.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
