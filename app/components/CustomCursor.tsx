"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, input, textarea, select, label, summary, [role='button'], [data-cursor]";

/**
 * Accent dot that follows the mouse, plus a ring that trails behind and grows over anything
 * clickable. Only enabled for a real mouse (not touch screens); the native cursor is hidden via
 * the `has-custom-cursor` class (globals.css).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lag = reduceMotion ? 0 : 0.35;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.05 });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.05 });
    const ringX = gsap.quickTo(ring, "x", { duration: lag, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: lag, ease: "power3.out" });

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);

      const hovering = event.target instanceof Element && event.target.closest(INTERACTIVE);
      ring.classList.toggle("is-hovering", Boolean(hovering));
    };
    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const onDown = () => ring.classList.add("is-pressed");
    const onUp = () => ring.classList.remove("is-pressed");

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div aria-hidden="true" className="custom-cursor pointer-events-none fixed left-0 top-0 z-[110]">
      <div ref={ringRef} className="cursor-ring fixed left-0 top-0 size-9 rounded-full border border-accent opacity-0" />
      <div ref={dotRef} className="fixed left-0 top-0 size-1.5 rounded-full bg-accent opacity-0" />
    </div>
  );
}
