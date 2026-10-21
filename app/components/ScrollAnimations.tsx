"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * All page animations, wired up through data attributes so components stay declarative:
 *
 * - `data-hero`               banner intro, plays once on load (hidden by CSS until it runs)
 * - `data-hero-chars`         inside a `data-hero` word: each child letter rises in turn
 * - `data-reveal="up"`        fades/slides up when it scrolls into view
 * - `data-reveal="image"`     wipes in from the bottom with a slight zoom-out
 * - `data-reveal="line"`      draws in (timeline connectors)
 * - `data-reveal-group`       its children reveal one after another
 * - `data-parallax="0.2"`     background art drifts as you scroll (value = strength)
 * - `data-timeline`           scroll-driven timeline: its `data-timeline-line` fills with the scroll,
 *                             and each item's `data-timeline-dot` + `data-timeline-item` appear as
 *                             the line reaches them (rewinds when scrolling back up)
 */
export default function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      heroIntro();
      reveals();
      parallax();
    });

    // Rebuilt at the desktop breakpoint, where the process timeline switches from vertical to horizontal
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" },
      (context) => {
        if (context.conditions?.motion) timelines();
      },
    );

    // Content can change height after load (images, project filter), so keep trigger positions fresh
    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  });

  return null;
}

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
  const q = (name: string) => gsap.utils.toArray<HTMLElement>(`[data-hero="${name}"]`);

  tl.fromTo(q("header"), { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.6 })
    .set(q("word"), { autoAlpha: 1 }, 0.1)
    .from("[data-hero-chars] > *", { yPercent: 110, stagger: 0.05, duration: 0.8 }, 0.1)
    .fromTo(q("image"), { autoAlpha: 0, y: 80, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 }, 0.45)
    .fromTo(q("text"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.12 }, 0.7)
    .fromTo(q("card"), { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0 }, 0.9)
    .fromTo(q("deco"), { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1, transformOrigin: "bottom", duration: 0.7 }, 1);
}

function reveals() {
  const start = "top 85%";
  // Replays every time the element comes into view, scrolling down or back up. It resets only once
  // it is fully off screen (onLeave / onLeaveBack), so you never see it vanish.
  const replay = { start, end: "bottom top", toggleActions: "play reset play reset" };

  gsap.utils.toArray<HTMLElement>('[data-reveal="up"]').forEach((el) => {
    gsap.from(el, { autoAlpha: 0, y: 40, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, ...replay } });
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
    gsap.from(el, {
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 1.08,
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: el, ...replay },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal="line"]').forEach((el) => {
    // Inset clip works for both vertical (mobile) and horizontal (desktop) connectors
    gsap.from(el, {
      clipPath: "inset(0% 100% 100% 0%)",
      duration: 1.6,
      ease: "power2.inOut",
      scrollTrigger: { trigger: el, ...replay },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
    // Skip decorative children like the timeline line, which animate on their own
    const items = Array.from(group.children).filter((child) => !child.hasAttribute("aria-hidden"));
    gsap.from(items, {
      autoAlpha: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: group, ...replay },
    });
  });
}

function timelines() {
  gsap.utils.toArray<HTMLElement>("[data-timeline]").forEach((list) => {
    const line = list.querySelector<HTMLElement>("[data-timeline-line]");
    if (!line) return;

    const box = line.getBoundingClientRect();
    const horizontal = box.width > box.height;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: list,
        start: "top 75%",
        end: horizontal ? "top 30%" : "bottom 65%",
        scrub: 0.8,
      },
    });

    tl.fromTo(
      line,
      horizontal ? { scaleX: 0 } : { scaleY: 0 },
      { ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }), ease: "none", duration: 1 },
      0,
    );

    list.querySelectorAll<HTMLElement>(":scope > li").forEach((li) => {
      const dot = li.querySelector<HTMLElement>("[data-timeline-dot]");
      const item = li.querySelector<HTMLElement>("[data-timeline-item]");
      if (!dot || !item) return;

      // Show each step when the progress line reaches its dot
      const dotBox = dot.getBoundingClientRect();
      const reached = horizontal ? (dotBox.left - box.left) / box.width : (dotBox.top - box.top) / box.height;
      const at = gsap.utils.clamp(0, 0.95, reached);

      tl.fromTo(dot, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: "back.out(3)", duration: 0.12 }, at).fromTo(
        item,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.25 },
        at + 0.04,
      );
    });
  });
}

function parallax() {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const strength = parseFloat(el.dataset.parallax || "0.2");
    gsap.fromTo(
      el,
      { yPercent: -strength * 100 },
      {
        yPercent: strength * 100,
        ease: "none",
        scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}
