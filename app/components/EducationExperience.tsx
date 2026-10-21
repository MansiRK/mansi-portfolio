import IconBadge, { type IconName } from "./Icon";
import SectionHeading from "./SectionHeading";

type TimelineItem = {
  badge: string;
  title: string;
  place: string;
  description: string;
};

const EXPERIENCE: TimelineItem[] = [
  {
    badge: "Apr 2024 to Oct 2026",
    title: "MERN Developer",
    place: "Five Online Website Solutions Pvt Ltd, Mumbai",
    description:
      "Built and maintained production apps for finance, real estate and media clients: 100+ REST API endpoints with JWT and RBAC, admin dashboards for 500+ records, and 30 to 40% faster page loads. Partnered with 15+ clients and mentored junior developers.",
  },
  {
    badge: "Sep 2023 to Oct 2023",
    title: "Web Development Intern",
    place: "Prodigy InfoTech, Remote",
    description: "Built and deployed 5+ responsive web apps with HTML, CSS, JavaScript, Bootstrap and React.js.",
  },
];

const EDUCATION: TimelineItem[] = [
  {
    badge: "2019 to 2023",
    title: "B.E. Computer Science",
    place: "Mumbai University",
    description: "Graduated with a CGPI of 8.82.",
  },
  {
    badge: "Certification",
    title: "MERN Stack",
    place: "Raw Engineering Academy",
    description: "Full-stack development with MongoDB, Express, React and Node.",
  },
  {
    badge: "Certifications",
    title: "React, Node.js and Express, Python",
    place: "Coursera and GUVI",
    description: "Coursera courses in React and Node.js with Express, and Python from GUVI.",
  },
];

export default function EducationExperience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="site-container scroll-mt-6 py-20 lg:py-28">
      <SectionHeading
        id="experience-title"
        title="Education"
        highlight={
          <>
            &amp;
            <br />
            Experience
          </>
        }
        description="Where I've learned and what I've built along the way."
        decoration={<DottedPath />}
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-10">
        <Timeline icon="briefcase" title="Experience" items={EXPERIENCE} />
        <Timeline icon="graduation" title="Education" items={EDUCATION} />
      </div>
    </section>
  );
}

function Timeline({ icon, title, items }: { icon: IconName; title: string; items: TimelineItem[] }) {
  return (
    <div>
      <div data-reveal="up" className="flex items-center gap-4">
        <IconBadge name={icon} />
        <h3 className="font-display text-xl font-extrabold uppercase text-title sm:text-2xl">{title}</h3>
      </div>

      <ol data-timeline className="relative mt-8 space-y-5 pl-10">
        {/* Vertical line runs through the centre of the dots */}
        <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-border" />
        {/* Progress line drawn over it as you scroll (see ScrollAnimations) */}
        <span
          aria-hidden="true"
          data-timeline-line
          className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent dark:bg-button"
        />

        {items.map((item) => (
          <li key={item.title} className="group relative">
            <span
              aria-hidden="true"
              data-timeline-dot
              className="absolute -left-10 top-7 size-[15px] rounded-full border-2 border-title bg-bg transition-[background-color,border-color,box-shadow] duration-300 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_0_0_5px] group-hover:shadow-accent/20 dark:border-accent"
            />

            <article
              data-timeline-item
              className="border border-border bg-card-bg p-5 transition-[border-color,box-shadow] duration-300 group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/10 sm:p-6"
            >
              <span className="inline-block bg-chip-bg px-2.5 py-1 text-[11px] font-semibold text-title transition-colors duration-300 group-hover:bg-accent group-hover:text-white dark:text-accent dark:group-hover:text-white">
                {item.badge}
              </span>
              <h4 className="mt-4 text-base font-semibold text-title sm:text-lg">{item.title}</h4>
              <p className="mt-1 text-xs text-text">{item.place}</p>
              <p className="mt-3 text-base leading-relaxed text-text">{item.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Dashed path from a hollow dot to a highlighted dot, top right of the heading */
function DottedPath() {
  return (
    <svg viewBox="0 0 150 70" data-parallax="0.3" className="ml-auto w-40" aria-hidden="true">
      <path
        d="M12 58C42 52 46 20 78 16s34 16 58-2"
        fill="none"
        className="stroke-text"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="58" r="5" className="fill-bg stroke-title" strokeWidth="2" />
      <circle cx="78" cy="16" r="5" className="fill-bg stroke-title" strokeWidth="2" />
      <circle cx="136" cy="14" r="12" className="fill-accent/20" />
      <circle cx="136" cy="14" r="6" className="fill-accent dark:fill-button" />
    </svg>
  );
}
