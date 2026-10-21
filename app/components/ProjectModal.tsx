"use client";

import { useEffect, useRef } from "react";
import { LuArrowLeft, LuArrowRight, LuExternalLink, LuX } from "react-icons/lu";
import { getLenis } from "../lib/lenis";
import type { Project } from "../lib/projects";
import { buttonSweep } from "../lib/ui";
import ProjectGallery from "./ProjectGallery";

type ProjectModalProps = {
  projects: Project[];
  index: number | null;
  onNavigate: (index: number) => void;
  onClose: () => void;
};

export default function ProjectModal({ projects, index, onNavigate, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const project = index === null ? null : projects[index];

  // Native <dialog> gives focus trapping, Esc to close and a backdrop for free
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      getLenis()?.stop(); // freeze the page behind the modal
    }
    if (!project && dialog.open) dialog.close();
    if (!project) getLenis()?.start();
  }, [project]);

  const total = projects.length;
  const go = (step: number) => {
    if (index !== null) onNavigate((index + step + total) % total);
  };

  return (
    <dialog
      ref={dialogRef}
      data-lenis-prevent // let the modal content scroll natively
      aria-labelledby="project-title"
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the dialog element itself land on the backdrop
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
      className="inverse-theme m-auto max-h-[calc(100dvh-2rem)] w-[min(100%-2rem,96rem)] overflow-y-auto bg-(--inverse-bg) text-text backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {project && index !== null && (
        <div className="relative p-6 sm:p-10 xl:p-14">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 grid size-9 place-items-center border border-border text-title transition-colors hover:border-accent hover:text-accent"
          >
            <LuX className="size-4" aria-hidden="true" />
          </button>

          {/* key resets the selected screenshot when switching projects */}
          <ProjectDetails key={project.slug} project={project} />

          <div className="mt-10 flex items-center justify-between border-t border-border pt-6 text-base font-semibold text-title">
            <button type="button" onClick={() => go(-1)} className="flex items-center gap-2 transition-colors hover:text-accent">
              <LuArrowLeft className="size-4" aria-hidden="true" />
              Previous
            </button>
            <span className="text-xs font-normal text-text">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => go(1)} className="flex items-center gap-2 transition-colors hover:text-accent">
              Next
              <LuArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  const words = project.title.split(" ");
  const highlight = words.pop();

  return (
    <div className="grid gap-10 lg:grid-cols-2 xl:gap-16">
      {/* Container, so the title scales with this column and long words like "Management" always fit */}
      <div className="@container min-w-0">
        <p className="text-xs font-semibold text-accent">
          {project.kind} · {project.category === "client" ? "Client project" : "Personal project"}
        </p>
        <h2
          id="project-title"
          className="mt-3 font-display text-[clamp(1.25rem,7.5cqw,3.25rem)] font-extrabold uppercase leading-[0.9] text-title"
        >
          {words.join(" ")}
          <span className="block text-accent">{highlight}</span>
        </h2>
        <span className="mt-5 block h-0.5 w-10 bg-rule" />

        <p className="mt-5 max-w-xl text-base leading-relaxed">{project.summary}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-title">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rule" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-base">
          {[
            ["Role", project.role],
            ["Industry", project.industry],
            ["Stack", project.stack.join(", ")],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] text-accent">{label}</dt>
              <dd className="mt-1 font-semibold text-title">{value}</dd>
            </div>
          ))}
        </dl>

        {project.live && (
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonSweep} flex items-center gap-2 bg-button hover:cursor-pointer px-5 py-2.5 text-base font-semibold text-white [--sweep:var(--title)] hover:text-(--inverse-bg)`}
            >
              <LuExternalLink className="size-3.5" aria-hidden="true" />
              Live site
            </a>
          </div>
        )}
      </div>

      {/* Pushed down on desktop so the close button never covers the screenshots */}
      <div className="lg:pt-10">
        <ProjectGallery key={project.slug} project={project} />
      </div>
    </div>
  );
}
