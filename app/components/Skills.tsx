import IconBadge, { type IconName } from "./Icon";
import SectionHeading from "./SectionHeading";

const SKILL_GROUPS: { icon: IconName; title: string; skills: string[] }[] = [
  {
    icon: "code",
    title: "Frontend",
    skills: ["React.js", "Next.js", "JavaScript (ES6+)", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Styled Components", "GSAP", "Zustand", "Axios"],
  },
  {
    icon: "server",
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC", "MVC", "CORS, Helmet, CSP", "Python"],
  },
  {
    icon: "database",
    title: "Database",
    skills: ["MongoDB", "Mongoose", "MySQL", "Firebase", "Redis"],
  },
  {
    icon: "wrench",
    title: "Tools",
    skills: ["Git", "GitHub", "Postman", "ESLint", "Figma", "AWS S3", "cPanel", "VS Code", "GitHub Copilot", "Lighthouse"],
  },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="site-container scroll-mt-6 py-20 lg:py-28">
      <SectionHeading
        id="skills-title"
        title="My"
        highlight="Skills"
        description="The tools I reach for every day, grouped by where they sit in the stack."
      />

      <ul data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {SKILL_GROUPS.map((group) => (
          <li key={group.title} className="border border-border bg-card-bg p-6">
            <div className="flex items-center gap-3">
              <IconBadge name={group.icon} />
              <div>
                <h3 className="font-display text-lg font-extrabold uppercase leading-none text-title xl:text-base 2xl:text-lg">
                  {group.title}
                </h3>
                <p className="mt-1 text-[11px] text-accent">{group.skills.length} skills</p>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 bg-chip-bg px-3 py-1.5 text-xs font-medium text-chip-text"
                >
                  <span className="size-1.5 rounded-full bg-title dark:bg-accent" aria-hidden="true" />
                  {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
