import Image from "next/image";
import { LuArrowRight, LuDownload } from "react-icons/lu";
import { buttonSweep } from "../lib/ui";
import profileBanner from "@/public/images/profile_banner1.png";

const heroTextSize = "text-[clamp(2rem,13vw,15rem)]";

export default function Banner() {
  return (
    <section id="home" className="relative flex flex-1 flex-col justify-between overflow-hidden pb-10 xl:min-h-[640px] xl:justify-end">
      <h1 className="sr-only">Mansi Kamble, MERN Stack Developer</h1>

      {/* On xl the word sits high in the banner so the photo only overlaps it a little (just the head) */}
      <p
        aria-hidden="true"
        data-hero="word"
        className={`overflow-hidden pt-4 xl:absolute xl:inset-x-0 xl:top-[22%] xl:-translate-y-1/2 xl:pt-0 text-center font-display font-extrabold uppercase leading-none tracking-tight text-hero-word ${heroTextSize}`}
      >
        {/* Each letter is its own span so the intro can raise them one by one */}
        <span data-hero-chars className="-mr-[0.2em] inline-block tracking-[0.2em]">
          {"Mansi".split("").map((letter, i) => (
            <span key={i} className="inline-block">
              {letter}
            </span>
          ))}
        </span>
      </p>

      {/* Photo: in the normal flow on small screens; on xl it is pinned to the bottom
          centre of the banner so it sits between the intro text and the code card */}
      <div data-hero="image" className="relative z-10 mx-auto mt-6 aspect-[877/1216] w-[min(70vw,18rem)] xl:absolute xl:bottom-10 xl:left-1/2 xl:mt-0 xl:w-[min(26vw,26rem)] xl:-translate-x-1/2">
        <Image
          src={profileBanner}
          alt="Illustrated portrait of Mansi Kamble"
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1280px) 26vw, 70vw"
          className="object-contain object-bottom"
        />

       
      </div>

      {/* Intro + code card */}
      <div className="site-container relative z-20 mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
             <span data-hero="text" className="flex items-center gap-2 whitespace-nowrap py-1.5 pb-3 text-[10px] font-semibold text-title sm:text-xs">
          {/* Pulsing "online" dot: a ring ripples out from the solid dot (static with reduced motion) */}
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Open to new roles
        </span>
          <p data-hero="text" className="text-base leading-snug text-title sm:text-lg">
            Hi, I’m <span className="font-display font-extrabold uppercase text-accent">Mansi Kamble</span>. I build fast, scalable web apps with React, Next.js and Node, from the database to the last pixel.
          </p>

          <div data-hero="text" className="mt-6 flex flex-wrap gap-3">
            <a
              href="#works"
              className={`${buttonSweep} flex items-center gap-2 bg-button px-5 py-2.5 text-base font-semibold text-white [--sweep:var(--title)] dark:hover:text-bg`}
            >
              View My Work
              <LuArrowRight className="size-4" aria-hidden="true" />
            </a>
            {/* TODO: add the CV file to /public */}
            <a
              href="/Mansi-Kamble-CV.pdf"
              download
              className={`${buttonSweep} flex items-center gap-2 border border-title px-5 py-2.5 text-base font-semibold text-title [--sweep:var(--title)] hover:text-bg dark:border-accent dark:text-accent dark:[--sweep:var(--accent)] dark:hover:text-bg`}
            >
              <LuDownload className="size-3.5" aria-hidden="true" />
              Download Resume
            </a>
          </div>

          <p data-hero="text" className="mt-3 flex items-center gap-3 text-xs font-semibold text-title dark:text-button">
            <span className="h-px w-8 bg-button" />
            2.5+ years building for the web
          </p>
        </div>

        <CodeCard />
      </div>

      <span
        aria-hidden="true"
        data-hero="deco"
        className="absolute bottom-0 right-0 h-24 w-20 bg-deco sm:h-28 sm:w-24"
      />
    </section>
  );
}

function CodeCard() {
  return (
    <div data-hero="card" className="relative z-10 w-full max-w-sm overflow-hidden border border-white/10 bg-code-bg font-mono text-[11px] shadow-2xl sm:text-xs">
      <div className="flex items-center gap-3 bg-code-head px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
        </div>
        <span className="text-white/60">mansi.ts</span>
      </div>

      <pre className="overflow-x-auto px-4 py-4 leading-relaxed text-white/90">
        <code>
          <span className="text-pink-400">const</span> mansi = {"{"}
          {"\n  "}role: <span className="text-violet-200">&apos;Full stack Developer&apos;</span>,
          {"\n  "}stack: [<span className="text-violet-200">&apos;Next.js&apos;</span>,{" "}
          <span className="text-violet-200">&apos;Node&apos;</span>,{" "}
          <span className="text-violet-200">&apos;React.js&apos;</span>,{" "}
          <span className="text-violet-200">&apos;MongoDB&apos;</span>],
          {"\n  "}experience: <span className="text-violet-200">&apos;2.5+ years&apos;</span>,
          {"\n  "}available: <span className="text-orange-400">true</span>
          {"\n"}
          {"}"} <span className="text-white/40">{"// open to new work"}</span>
        </code>
      </pre>
    </div>
  );
}
