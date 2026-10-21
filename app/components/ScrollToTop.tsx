"use client";

import { useEffect, useRef, useState } from "react";
import { LuArrowUp } from "react-icons/lu";
import { getLenis } from "../lib/lenis";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Fixed back-to-top button. Hidden while the banner (#home) is on screen; its ring
 * fills with how far down the page you are (full at the bottom).
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const banner = document.getElementById("home");
      const pastBanner = banner ? banner.getBoundingClientRect().bottom <= 0 : window.scrollY > window.innerHeight;
      setVisible(pastBanner);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      // Written straight to the DOM so scrolling doesn't re-render on every frame
      ringRef.current?.setAttribute("stroke-dashoffset", String(CIRCUMFERENCE * (1 - progress)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function scrollToTop() {
    // Lenis is only running when motion is allowed; otherwise jump straight to the top
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      inert={!visible}
      className={`fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full bg-menu-bg text-menu-text shadow-lg ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Progress ring: starts at 12 o'clock and fills clockwise */}
      <svg viewBox="0 0 52 52" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="26" cy="26" r={RADIUS} fill="none" strokeWidth="3" className="stroke-white/20" />
        <circle
          ref={ringRef}
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          className="stroke-button"
        />
      </svg>
      <LuArrowUp className="relative size-5" aria-hidden="true" />
    </button>
  );
}
