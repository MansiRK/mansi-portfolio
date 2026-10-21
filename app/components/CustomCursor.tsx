"use client";

import gsap from "gsap";
import { useEffect } from "react";

const INTERACTIVE = "a, button, input, textarea, select, label, summary, [role='button'], [data-cursor]";

/**
 * Accent dot that follows the mouse, plus a ring that trails behind and grows over anything
 * clickable. Only enabled for a real mouse (not touch screens); the native cursor is hidden via
 * the `has-custom-cursor` class (globals.css).
 *
 * A modal <dialog> sits in the browser's top layer, above everything else whatever its z-index, so
 * while one is open the cursor is moved inside it. The elements are created here rather than
 * rendered by React, so moving them around can't clash with React's own DOM updates.
 */
export default function CustomCursor() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cursor = document.createElement("div");
    cursor.setAttribute("aria-hidden", "true");
    cursor.className = "pointer-events-none fixed left-0 top-0 z-[110]";
    const ring = document.createElement("div");
    ring.className = "cursor-ring fixed left-0 top-0 size-9 rounded-full border border-accent";
    const dot = document.createElement("div");
    dot.className = "fixed left-0 top-0 size-1.5 rounded-full bg-accent";
    cursor.append(ring, dot);
    document.body.append(cursor);

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

    // Follow modal dialogs into the top layer, and come back out when they close
    const placeCursor = () => {
      const modal = document.querySelector("dialog[open]:modal");
      const host = modal ?? document.body;
      if (cursor.parentElement !== host) host.append(cursor);
    };
    const observer = new MutationObserver(placeCursor);
    observer.observe(document.body, { subtree: true, attributeFilter: ["open"] });

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      observer.disconnect();
      cursor.remove();
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return null;
}
