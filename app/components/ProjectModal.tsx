"use client";

import { useEffect, useRef, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuExternalLink, LuGithub, LuX } from "react-icons/lu";
import type { Project } from "../lib/projects";
import ProjectShot from "./ProjectShot";

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
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const total = projects.length;
  const go = (step: number) => {
    if (index !== null) onNavigate((index + step + total) % total);
  };

  return (
    <dialog
      ref={dialogRef}
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
      className="inverse-theme m-auto max-h-[calc(100dvh-2rem)] w-[min(100%-2rem,72rem)] overflow-y-auto bg-(--inverse-bg) text-text backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {project && index !== null && (
        <div className="relative p-6 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 grid size-9 place-items-center border border-border text-title transition-colors hover:border-accent hover:text-accent"
          >
            <LuX className="size-4" aria-hidden="true" />
          </button>

          {/* key resets the selected screenshot when switching projects */}
          <ProjectDetails key={project.title} project={project} />

          <div className="mt-10 flex items-center justify-between border-t border-border pt-6 text-sm font-semibold text-title">
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
  const [activeImage, setActiveImage] = useState(0);
  const words = project.title.split(" ");
  const highlight = words.pop();

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold text-accent">{project.category}</p>
        <h2
          id="project-title"
          className="mt-3 font-display text-[clamp(2rem,1rem+3vw,3.75rem)] font-extrabold uppercase leading-[0.9] text-title"
        >
          {words.join(" ")}
          <span className="block text-accent">{highlight}</span>
        </h2>
        <span className="mt-5 block h-0.5 w-10 bg-rule" />

        <p className="mt-5 max-w-md text-sm leading-relaxed sm:text-base">{project.summary}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-title">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rule" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
          {[
            ["Role", project.role],
            ["Industry", project.industry],
            ["Stack", project.stack],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] text-accent">{label}</dt>
              <dd className="mt-1 font-semibold text-title">{value}</dd>
            </div>
          ))}
        </dl>

        {(project.liveUrl || project.sourceUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-button px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <LuExternalLink className="size-3.5" aria-hidden="true" />
                Live demo
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border px-5 py-2.5 text-xs font-semibold text-title transition-colors hover:border-accent hover:text-accent"
              >
                <LuGithub className="size-3.5" aria-hidden="true" />
                Source code
              </a>
            )}
          </div>
        )}
      </div>

      <div>
        <ProjectShot
          project={project}
          image={project.images[activeImage]}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="aspect-16/11"
        />

        {project.images.length > 1 && (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {project.images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-pressed={i === activeImage}
                className={`border-2 transition-colors ${i === activeImage ? "border-accent" : "border-transparent hover:border-border"}`}
              >
                <ProjectShot project={project} image={image} sizes="15vw" className="aspect-16/11" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
