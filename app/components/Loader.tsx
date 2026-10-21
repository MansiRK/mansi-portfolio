"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { finishLoader } from "../lib/loader";

gsap.registerPlugin(useGSAP);

const MIN_DURATION = 1.2; // seconds, so the loader never just flashes
const MAX_WAIT = 6000; // ms, never keep visitors waiting on a slow asset

/**
 * Full-screen loading screen. The percentage follows the real page load (window `load` + fonts),
 * then the panel slides up like a shutter. It is server-rendered, so it covers the page from the
 * very first paint. While it exists, `html:has(#loader)` stops the page from scrolling (globals.css).
 */
export default function Loader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = { value: 0 };

      // Written straight to the DOM so the count doesn't re-render React on every frame
      const render = () => {
        const value = Math.round(progress.value);
        if (percentRef.current) percentRef.current.textContent = `${value}%`;
        barRef.current?.style.setProperty("transform", `scaleX(${progress.value / 100})`);
        rootRef.current?.setAttribute("aria-valuenow", String(value));
      };

      const finish = () => {
        finishLoader();
        setDone(true);
      };

      if (reduceMotion) {
        // No counting or shutter: show the page as soon as it has loaded
        const end = () => {
          progress.value = 100;
          render();
          finish();
        };
        if (document.readyState === "complete") end();
        else window.addEventListener("load", end, { once: true });
        return;
      }

      gsap.from("[data-loader-chars] > *", { yPercent: 110, stagger: 0.06, duration: 0.8, ease: "power3.out" });

      // Count towards 90% while the page loads...
      const counting = gsap.to(progress, { value: 90, duration: MIN_DURATION * 1.5, ease: "power1.out", onUpdate: render });

      const pageLoaded = new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      });
      const minTime = new Promise((resolve) => setTimeout(resolve, MIN_DURATION * 1000));
      const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT));

      // ...then run up to 100% and lift the shutter
      Promise.race([Promise.all([pageLoaded, document.fonts.ready, minTime]), timeout]).then(() => {
        counting.kill();
        gsap
          .timeline({ onComplete: () => setDone(true) })
          .to(progress, { value: 100, duration: 0.5, ease: "power2.out", onUpdate: render })
          .to("[data-loader-content]", { y: -40, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, "+=0.15")
          .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1")
          // Start the banner intro while the shutter is still lifting, so the page animates in behind it
          .call(finishLoader, [], "<0.3");
      });
    },
    { scope: rootRef },
  );

  if (done) return null;

  return (
    <div
      id="loader"
      ref={rootRef}
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
    >
      <div data-loader-content className="w-full px-6 text-center">
        <p
          aria-hidden="true"
          className="overflow-hidden font-display text-[clamp(2rem,13vw,15rem)] font-extrabold uppercase leading-none text-hero-word"
        >
          <span data-loader-chars className="-mr-[0.2em] inline-block tracking-[0.2em]">
            {"Mansi".split("").map((letter, i) => (
              <span key={i} className="inline-block">
                {letter}
              </span>
            ))}
          </span>
        </p>

        <div className="mx-auto mt-8 flex w-[min(28rem,80vw)] items-center gap-4">
          <div className="h-1 flex-1 overflow-hidden bg-border">
            {/* Width is driven through `transform` (see render), so it starts there too */}
            <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
          </div>
          <span ref={percentRef} className="w-12 text-right font-display text-sm font-bold tabular-nums text-title">
            0%
          </span>
        </div>
      </div>

      {/* Accent edge along the bottom of the shutter */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
    </div>
  );
}
