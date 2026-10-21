import type { IconType } from "react-icons";
import { LuCodeXml, LuPenLine, LuRocket, LuSearch } from "react-icons/lu";
import SectionHeading from "./SectionHeading";

const STEPS: { Icon: IconType; title: string; description: string }[] = [
  {
    Icon: LuSearch,
    title: "Discover",
    description: "I learn your goals, users and constraints, then agree on scope and success metrics.",
  },
  {
    Icon: LuPenLine,
    title: "Design",
    description: "Wireframes, UI and system architecture, reviewed with you before a line of code.",
  },
  {
    Icon: LuCodeXml,
    title: "Develop",
    description: "Typed, tested code shipped in short iterations with a preview link every week.",
  },
  {
    Icon: LuRocket,
    title: "Deploy",
    description: "Launch, monitoring and handover, plus support while real users arrive.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="inverse-theme relative isolate scroll-mt-6 overflow-hidden bg-(--inverse-bg)"
    >
      {/* Background artwork sits below the content (z-0 vs z-10) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <span data-parallax="0.25" className="absolute right-0 top-0 size-16 bg-(--inverse-deco-big) sm:size-24 lg:size-28" />
        <span data-parallax="0.6" className="absolute right-16 top-16 size-8 bg-(--inverse-deco-small) sm:right-24 sm:top-24 sm:size-12 lg:right-28 lg:top-28 lg:size-14" />
        <Rings />
      </div>

      <div className="site-container relative z-10 py-20 lg:py-28">
        <SectionHeading
          id="process-title"
          title="My"
          highlight="Process"
          description="Four steps, clear checkpoints, and no surprises at launch."
        />

        <ol data-timeline className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Dashed connector: vertical through the icons on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-5 top-5 border-l border-dashed border-border lg:bottom-auto lg:left-0 lg:right-0 lg:border-l-0 lg:border-t"
          />
          {/* Progress line drawn over the connector as you scroll (see ScrollAnimations) */}
          <span
            aria-hidden="true"
            data-timeline-line
            className="absolute bottom-5 left-5 top-5 w-px origin-top bg-accent lg:bottom-auto lg:left-0 lg:right-0 lg:h-px lg:w-auto lg:origin-left"
          />

          {STEPS.map(({ Icon, title, description }, index) => (
            <li key={title} className="group relative grid grid-cols-[auto_1fr] gap-x-5 lg:block">
              <span
                data-timeline-dot
                className="relative grid size-10 place-items-center border border-border bg-(--inverse-bg) text-(--inverse-icon) transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-(--inverse-bg)"
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>

              <div data-timeline-item className="lg:mt-8">
                <p className="text-xs font-semibold text-accent">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-semibold text-title sm:text-2xl">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-text">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Concentric rings in the bottom-left corner with an accent arc and a dot */
function Rings() {
  return (
    <svg viewBox="0 0 360 360" data-parallax="0.15" className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96">
      <g fill="none" className="stroke-title/10" strokeWidth="1">
        {[70, 140, 210, 280, 350].map((r) => (
          <circle key={r} cx="0" cy="360" r={r} />
        ))}
      </g>
      <path d="M0 290a70 70 0 0 1 70 70" fill="none" className="stroke-(--inverse-deco-small)" strokeWidth="5" />
      <circle cx="148" cy="212" r="6" className="fill-accent" />
    </svg>
  );
}
