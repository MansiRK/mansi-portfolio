"use client";

import type Odometer from "odometer";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export type Stat = { value: number; decimals?: number; suffix: string; label: string };

/** 2x2 stats; the odometers roll up from 0 every time the grid scrolls into view (from above or
 *  below) and quietly reset to 0 once it is fully off screen. Odometer theme styles live in globals.css. */
export default function StatsGrid({ stats }: { stats: Stat[] }) {
  const gridRef = useRef<HTMLDListElement>(null);
  const [inView, setInView] = useState(false);
  // Increases on every visit, so each visit is its own counting run
  const [run, setRun] = useState(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4 && !visible) {
          visible = true;
          setRun((r) => r + 1);
          setInView(true);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          setInView(false); // fully off screen: reset for the next visit
        }
      },
      { threshold: [0, 0.4] },
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <dl ref={gridRef} data-reveal-group className="grid grid-cols-2 gap-x-5 sm:gap-x-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex min-w-0 flex-col-reverse border-t border-border pb-8 pt-6">
          <dt className="mt-2 text-xs font-semibold text-title sm:text-sm">{stat.label}</dt>
          <dd className="font-display text-[clamp(1.75rem,8vw,3.25rem)] font-extrabold leading-[1.1] text-accent lg:text-[clamp(2.25rem,4vw,4.5rem)]">
            <span aria-hidden="true" className="whitespace-nowrap">
              <OdometerValue value={stat.value} decimals={stat.decimals ?? 0} start={inView} run={run} />
              {stat.suffix}
            </span>
            <span className="sr-only">
              {stat.value}
              {stat.suffix}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

function OdometerValue({
  value,
  decimals,
  start,
  run,
}: {
  value: number;
  decimals: number;
  start: boolean;
  run: number;
}) {
  const elRef = useRef<HTMLSpanElement>(null);
  const odometerRef = useRef<Odometer | null>(null);
  const startRef = useRef(start);
  const runRef = useRef(run);
  const targetRef = useRef(0);
  // The run whose count-up has finished (its plain number is shown instead of the odometer)
  const [finishedRun, setFinishedRun] = useState(-1);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    startRef.current = start;
    runRef.current = run;
  }, [start, run]);

  // Odometer touches `window` on import, so load it in the browser only
  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let settle: ReturnType<typeof setTimeout>;
    import("odometer").then(({ default: OdometerLib }) => {
      const el = elRef.current;
      if (cancelled || !el || odometerRef.current) return;

      // Odometer sizes every digit like an "8", leaving gaps around narrow digits in Syne, and it
      // re-renders if its text is changed. So once a count-up ends ("odometerdone" fires per digit,
      // hence the debounce) React hides it and shows the plain number instead. Rolls back to 0
      // (while off screen) are ignored.
      el.addEventListener("odometerdone", () => {
        clearTimeout(settle);
        settle = setTimeout(() => {
          if (targetRef.current === value) setFinishedRun(runRef.current);
        }, 150);
      });

      odometerRef.current = new OdometerLib({
        el,
        value: 0,
        format: decimals ? "(,ddd).d" : "(,ddd)",
        theme: "minimal",
        duration: 2000,
      });
      // The section may already be on screen by the time the library loads
      if (startRef.current) {
        targetRef.current = value;
        requestAnimationFrame(() => odometerRef.current?.update(value));
      }
    });
    return () => {
      cancelled = true;
      clearTimeout(settle);
    };
  }, [value, decimals, reducedMotion]);

  // Count up on each visit; roll back to 0 while off screen, ready for the next one
  useEffect(() => {
    targetRef.current = start ? value : 0;
    odometerRef.current?.update(targetRef.current);
  }, [start, run, value]);

  const showPlain = start && (reducedMotion || finishedRun === run);

  return (
    <>
      {/* React only toggles this wrapper; the inner span belongs to Odometer */}
      <span className={showPlain ? "hidden" : undefined}>
        <span ref={elRef}>{(0).toFixed(decimals)}</span>
      </span>
      {showPlain && value.toFixed(decimals)}
    </>
  );
}
