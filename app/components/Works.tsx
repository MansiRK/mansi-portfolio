"use client";

import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { FILTERS, PROJECTS, type ProjectFilter } from "../lib/projects";
import ProjectModal from "./ProjectModal";
import ProjectShot from "./ProjectShot";
import SectionHeading from "./SectionHeading";

export default function Works() {
  const [filter, setFilter] = useState<ProjectFilter | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.filter === filter);

  return (
    <section
      id="works"
      aria-labelledby="works-title"
      className="site-container scroll-mt-6 bg-surface py-20 lg:py-28 dark:bg-bg"
    >
      <SectionHeading
        id="works-title"
        title="Selected"
        highlight="Works"
        description="Production work for real clients across real estate, manufacturing and finance. Open any project to see the details."
      />

      <div role="group" aria-label="Filter projects" data-reveal="up" className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map(({ value, label }) => {
          const count = value === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.filter === value).length;
          const active = filter === value;

          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(value)}
              className={`border px-4 py-2 text-xs font-semibold transition-colors ${
                active
                  ? "border-title bg-title text-bg dark:border-accent dark:bg-accent"
                  : "border-border text-title hover:border-title dark:text-accent dark:hover:border-accent"
              }`}
            >
              {label} <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <ul data-reveal-group className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <li key={project.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-haspopup="dialog"
              className="group block w-full text-left"
            >
              <ProjectShot
                project={project}
                image={project.images[0]}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="aspect-16/10 transition-transform duration-300 group-hover:-translate-y-1"
              />

              <div className="mt-4 flex items-start gap-3">
                <span className="mt-1 border-t-2 border-accent pt-0.5 font-display text-sm font-extrabold text-accent">
                  {String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-title">{project.title}</h3>
                  <p className="text-xs text-text">
                    {project.category}, {project.industry}
                  </p>
                </div>
                <span className="grid size-8 shrink-0 place-items-center border border-border text-title transition-colors group-hover:border-button group-hover:bg-button group-hover:text-white">
                  <LuArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </div>

              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="bg-chip-bg px-2.5 py-1 text-[11px] font-semibold text-title dark:text-accent">
                    {tag}
                  </li>
                ))}
              </ul>
            </button>
          </li>
        ))}
      </ul>

      <ProjectModal
        projects={visible}
        index={openIndex}
        onNavigate={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}
