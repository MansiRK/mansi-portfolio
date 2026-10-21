import Image from "next/image";
import { LuDownload } from "react-icons/lu";
import profileBanner from "@/public/images/profile_banner.png";

const heroTextSize = "text-[clamp(2rem,8.7vw,11rem)]";

export default function Banner() {
  return (
    <section className="relative flex flex-1 flex-col justify-between overflow-hidden pb-10 xl:min-h-[640px] xl:justify-end">
      <h1 className="sr-only">Mansi Kamble, MERN Stack Developer</h1>

      {/* On xl the word is centred vertically in the banner, behind the photo */}
      <p
        aria-hidden="true"
        className={`pt-4 xl:absolute xl:inset-x-0 xl:top-1/2 xl:-translate-y-1/2 xl:pt-0 text-center font-display font-extrabold uppercase leading-none tracking-tight text-hero-word ${heroTextSize}`}
      >
        Developer
      </p>

      {/* Photo: in the normal flow on small screens; on xl it is pinned to the bottom
          centre of the banner so it sits between the intro text and the code card */}
      <div className="relative z-10 mx-auto mt-6 aspect-[877/1216] w-[min(70vw,18rem)] xl:absolute xl:bottom-10 xl:left-1/2 xl:mt-0 xl:w-[min(26vw,26rem)] xl:-translate-x-1/2">
        <Image
          src={profileBanner}
          alt="Illustrated portrait of Mansi Kamble"
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1280px) 26vw, 70vw"
          className="object-contain object-bottom"
        />

        <span className="absolute -left-6 bottom-[14%] flex items-center gap-2 whitespace-nowrap bg-pill-bg px-3 py-1.5 text-[10px] font-semibold text-title shadow-lg sm:text-xs">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px] shadow-emerald-400/25" />
          Available for work
        </span>
      </div>

      {/* Intro + code card */}
      <div className="site-container relative z-20 mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <p className="text-base leading-snug text-title sm:text-lg">
            I build fast, SEO-friendly web apps, CMS platforms and dashboards
            that clients run in production.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="bg-button px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Start a project
            </a>
            {/* TODO: add the CV file to /public */}
            <a
              href="/Mansi-Kamble-CV.pdf"
              download
              className="flex items-center gap-2 border border-title px-5 py-2.5 text-xs font-semibold text-title transition-colors hover:bg-title hover:text-bg dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-bg"
            >
              <LuDownload className="size-3.5" aria-hidden="true" />
              Download CV
            </a>
          </div>

          <p className="mt-2 flex items-center gap-3 text-xs font-semibold text-title dark:text-button">
            <span className="h-px w-8 bg-button" />
            Mansi Kamble
          </p>
        </div>

        <CodeCard />
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-24 w-20 bg-deco sm:h-28 sm:w-24"
      />
    </section>
  );
}

function CodeCard() {
  return (
    <div className="relative z-10 w-full max-w-sm overflow-hidden border border-white/10 bg-code-bg font-mono text-[11px] shadow-2xl sm:text-xs">
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
          {"\n  "}role: <span className="text-amber-200">&apos;MERN Developer&apos;</span>,
          {"\n  "}stack: [<span className="text-amber-200">&apos;Next.js&apos;</span>,{" "}
          <span className="text-amber-200">&apos;Node&apos;</span>,{" "}
          <span className="text-amber-200">&apos;MongoDB&apos;</span>],
          {"\n  "}experience: <span className="text-amber-200">&apos;2.5+ years&apos;</span>,
          {"\n  "}shipping: <span className="text-orange-400">true</span>
          {"\n"}
          {"}"} <span className="text-white/40">{"// open to new work"}</span>
        </code>
      </pre>
    </div>
  );
}
