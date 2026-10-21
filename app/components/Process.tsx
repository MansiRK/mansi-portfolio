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
      className="relative isolate scroll-mt-6 overflow-hidden bg-section-alt dark:bg-bg"
    >
      {/* Background artwork sits below the content (z-0 vs z-10) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Orbits />
        <span className="absolute bottom-0 right-0 size-14 bg-deco sm:size-20 lg:size-24" />
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
                className="relative grid size-10 place-items-center border border-border bg-section-alt text-icon-fg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white dark:bg-bg"
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>

              <div data-timeline-item className="lg:mt-8">
                <p className="text-xs font-semibold text-accent">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-semibold text-title sm:text-2xl uppercase">{title}</h3>
                <p className="mt-3 max-w-xs text-base leading-relaxed text-text">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Rings around a glowing dot in the bottom-left corner */
function Orbits() {
  return (
    <svg viewBox="0 0 320 320" data-parallax="0.15" className="absolute -bottom-16 -left-20 w-72 sm:w-80 lg:w-96">
      <g fill="none" strokeWidth="1">
        <circle cx="140" cy="200" r="70" className="stroke-title/25" strokeDasharray="3 5" />
        <circle cx="140" cy="200" r="110" className="stroke-title/15" />
        <circle cx="140" cy="200" r="150" className="stroke-title/10" strokeDasharray="3 5" />
      </g>
      <circle cx="140" cy="200" r="44" className="fill-accent/20 dark:fill-button/20" />
      <circle cx="140" cy="200" r="26" className="fill-accent dark:fill-button" />
      <circle cx="232" cy="122" r="5" className="fill-accent dark:fill-button" />
      <circle cx="58" cy="96" r="3.5" className="fill-accent dark:fill-button" />
    </svg>
  );
}
