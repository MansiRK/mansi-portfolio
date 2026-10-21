"use client";

import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { setLenis } from "../lib/lenis";
import { loaderDone } from "../lib/loader";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger animations stay in sync */
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      anchors: { offset: -24 }, // smooth-scroll in-page links (sidebar, "Start a project")
    });
    setLenis(lenis);

    // No scrolling until the loading screen has lifted
    lenis.stop();
    loaderDone.then(() => lenis.start());

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
