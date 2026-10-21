import { SectionTitle } from "./SectionHeading";
import StatsGrid, { type Stat } from "./StatsGrid";

const STATS: Stat[] = [
  { value: 2.5, decimals: 1, suffix: "+", label: "Years of experience" },
  { value: 100, suffix: "+", label: "API endpoints built" },
  { value: 15, suffix: "+", label: "Clients partnered with" },
  { value: 500, suffix: "+", label: "Records in admin dashboards" },
];

export default function Numbers() {
  return (
    <section
      id="numbers"
      aria-labelledby="numbers-title"
      className="relative isolate scroll-mt-6 overflow-hidden bg-section-alt dark:bg-bg"
    >
      {/* Background artwork sits below the content (z-0 vs z-10) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Orbits />
        <span className="absolute bottom-0 right-0 size-14 bg-deco sm:size-20 lg:size-24" />
      </div>

      <div className="site-container relative z-10 grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-12 lg:py-28">
        <div data-reveal-group>
          {/* Slightly smaller on desktop so the title and the stats fit side by side */}
          <SectionTitle
            id="numbers-title"
            title="By the"
            highlight="Numbers"
            className="lg:text-[clamp(2rem,0.25rem+4vw,5rem)]"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-text sm:text-base">
            A quick look at the work so far, and it keeps growing every month.
          </p>
        </div>

        <StatsGrid stats={STATS} />
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
