import IconBadge, { type IconName } from "./Icon";
import SectionHeading from "./SectionHeading";

const SERVICES: { icon: IconName; title: string; description: string; tags: string[] }[] = [
  {
    icon: "code",
    title: "Web development",
    description: "Responsive, fast websites and web apps with React.js and Next.js, built mobile first.",
    tags: ["React.js", "Next.js", "Tailwind"],
  },
  {
    icon: "server",
    title: "Backend and APIs",
    description: "REST APIs on Node.js and Express with JWT authentication, role-based access and secure headers.",
    tags: ["Node.js", "JWT", "RBAC"],
  },
  {
    icon: "layout",
    title: "CMS and admin dashboards",
    description: "Custom CMS modules and admin panels that let teams manage content, leads and media on their own.",
    tags: ["CMS", "MongoDB", "Dashboards"],
  },
  {
    icon: "search",
    title: "SEO and performance",
    description: "Technical SEO and Core Web Vitals work: metadata, schema, sitemaps, GA4 and faster page loads.",
    tags: ["SEO", "GA4", "Lighthouse"],
  },
];

export default function WhatIDo() {
  return (
    <section id="services" aria-labelledby="services-title" className="services-bg scroll-mt-6">
      <div className="site-container py-20 lg:py-28">
        <SectionHeading
          id="services-title"
          title="What"
          highlight="I do"
          description="From marketing sites to CMS platforms and dashboards, I build the frontend, backend and admin panel end to end."
          decoration={<DotWave />}
        />

        <ul data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service) => (
            <li
              key={service.title}
              className="flex flex-col border border-border bg-card-bg p-6 transition-colors hover:border-title dark:hover:border-accent"
            >
              <IconBadge name={service.icon} />
              <h3 className="mt-6 text-lg font-semibold leading-snug text-title">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text">{service.description}</p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className=" bg-chip-bg px-3 py-1 text-[11px] font-semibold text-title dark:text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Dot grid with a wave and a square, top right of the heading */
function DotWave() {
  const dots = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 16; col++) {
      dots.push(<circle key={`${row}-${col}`} cx={6 + col * 10} cy={6 + row * 10} r="1.2" />);
    }
  }

  return (
    <svg viewBox="0 0 170 76" data-parallax="0.3" className="ml-auto w-44" aria-hidden="true">
      <g className="fill-window-line">{dots}</g>
      <path d="M4 60c20 0 26-18 46-18s24 16 44 16 26-30 46-30 18 8 26 8" fill="none" className="stroke-accent dark:stroke-button" strokeWidth="2" strokeLinecap="round" />
      <rect x="146" y="4" width="16" height="16" className="fill-accent dark:fill-button" />
    </svg>
  );
}
