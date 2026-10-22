import { SectionTitle } from "./SectionHeading";
import StatsGrid, { type Stat } from "./StatsGrid";

const STATS: Stat[] = [
  { value: 2.5, decimals: 1, suffix: "+", label: "Years of experience" },
  { value: 100, suffix: "+", label: "API endpoints built" },
  { value: 10, suffix: "+", label: "Clients partnered with" },
  { value: 500, suffix: "+", label: "Records in admin dashboards" },
];

export default function Numbers() {
  return (
    <section
      id="numbers"
      aria-labelledby="numbers-title"
      className="inverse-theme relative isolate scroll-mt-6 overflow-hidden bg-(--inverse-bg)"
    >
      {/* Background artwork sits below the content (z-0 vs z-10) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <span data-parallax="0.25" className="absolute right-0 top-0 size-16 bg-(--inverse-deco-big) sm:size-24" />
        <span data-parallax="0.6" className="absolute right-16 top-16 size-8 bg-(--inverse-deco-small) sm:right-24 sm:top-24 sm:size-12" />
        <Rings />
      </div>

      {/* Extra top padding on desktop keeps the stats clear of the corner squares */}
      <div className="site-container relative z-10 grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-12 lg:pb-28 lg:pt-40">
        <div data-reveal-group>
          {/* Slightly smaller on desktop so the title and the stats fit side by side */}
          <SectionTitle
            id="numbers-title"
            title="By the"
            highlight="Numbers"
            className="lg:text-[clamp(2rem,0.25rem+4vw,5rem)]"
          />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-text">
            A quick look at the work so far, and it keeps growing every month.
          </p>
        </div>

        <StatsGrid stats={STATS} />
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
