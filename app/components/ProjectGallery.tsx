"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "../lib/projects";
import ProjectShot from "./ProjectShot";

/**
 * Project screenshots in the modal: the desktop shot sits in a browser frame with the mobile shot
 * in a phone frame overlapping its corner (stacked below it on small screens). Both screens scroll,
 * so tall full-page screenshots can be explored. Tabs switch between pages.
 * Without a gallery it falls back to the cover (or the plain gradient frame).
 */
export default function ProjectGallery({ project }: { project: Project }) {
  const pages = project.gallery ?? [];
  const [active, setActive] = useState(0);

  if (pages.length === 0) {
    return (
      <ProjectShot project={project} image={project.cover} sizes="(min-width: 1024px) 40vw, 90vw" className="aspect-16/11" />
    );
  }

  const page = pages[active];
  const host = project.live ? new URL(project.live).host : project.slug;

  return (
    <div>
      {/* key: switching page remounts the frames, so each page starts scrolled to the top */}
      <div key={page.title} className={`relative ${page.mobile ? "sm:pb-12 sm:pr-[16%]" : ""}`}>
        <BrowserFrame src={page.desktop} label={`${host} · ${page.title}`} alt={`${project.title}, ${page.title} page on desktop`} />
        {page.mobile && (
          <PhoneFrame
            src={page.mobile}
            alt={`${project.title}, ${page.title} page on mobile`}
            className="mx-auto mt-6 w-[45%] sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 sm:w-[28%]"
          />
        )}
      </div>

      <p className="mt-3 text-xs text-text">Scroll inside the screens to see the full page.</p>

      {pages.length > 1 && (
        <div role="tablist" aria-label="Project pages" className="mt-4 flex flex-wrap gap-2">
          {pages.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={index === active}
              onClick={() => setActive(index)}
              className={`border px-3 py-1.5 text-sm font-semibold transition-colors ${
                index === active
                  ? "border-accent bg-accent text-(--inverse-bg)"
                  : "border-border text-title hover:border-accent hover:text-accent"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BrowserFrame({ src, label, alt }: { src: string; label: string; alt: string }) {
  return (
    <div className="overflow-hidden border border-border bg-black/30 shadow-2xl">
      <div className="flex items-center gap-3 border-b border-border px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
        </div>
        <span className="truncate text-[11px] text-text">{label}</span>
      </div>
      <div className="aspect-16/10 overflow-y-auto overscroll-contain">
        <FullPageImage src={src} alt={alt} sizes="(min-width: 1024px) 40vw, 90vw" />
      </div>
    </div>
  );
}

function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[1.4rem] border-[5px] border-neutral-900 bg-neutral-900 shadow-2xl ${className}`}>
      <div className="relative aspect-9/19 overflow-y-auto overscroll-contain rounded-[1rem] bg-white">
        <FullPageImage src={src} alt={alt} sizes="(min-width: 640px) 12vw, 45vw" />
      </div>
    </div>
  );
}

/** Full-width image at its natural height, so tall screenshots can be scrolled inside the frame */
function FullPageImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return <Image src={src} alt={alt} width={1440} height={900} sizes={sizes} className="block h-auto w-full" />;
}
