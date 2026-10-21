"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Project } from "../lib/projects";
import ProjectShot, { DeviceMockup } from "./ProjectShot";

type Shot = { src: string; page: string; device: "Desktop" | "Mobile" };

/**
 * Project screenshots in the modal: the selected screenshot on top and a row of thumbnails
 * underneath. The arrows step to the previous/next screenshot and the row follows the active one.
 * Every page contributes its desktop shot and, if it has one, its mobile shot.
 * Without a gallery it falls back to the cover (or the plain gradient frame).
 */
export default function ProjectGallery({ project }: { project: Project }) {
  const shots: Shot[] = (project.gallery ?? []).flatMap((page) => [
    ...(page.desktop ? [{ src: page.desktop, page: page.title, device: "Desktop" as const }] : []),
    ...(page.mobile ? [{ src: page.mobile, page: page.title, device: "Mobile" as const }] : []),
  ]);
  const [active, setActive] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  // Scroll the thumbnail row just enough to keep the active thumbnail in view
  useEffect(() => {
    const row = rowRef.current;
    const thumb = row?.children[active] as HTMLElement | undefined;
    if (!row || !thumb) return;
    const left = thumb.offsetLeft;
    const right = left + thumb.offsetWidth;
    if (left < row.scrollLeft) row.scrollTo({ left, behavior: "smooth" });
    else if (right > row.scrollLeft + row.clientWidth) row.scrollTo({ left: right - row.clientWidth, behavior: "smooth" });
  }, [active]);

  if (shots.length === 0) {
    return (
      <ProjectShot project={project} image={project.cover} darkImage={project.coverDark} sizes="(min-width: 1024px) 40vw, 90vw" />
    );
  }

  const shot = shots[active];
  const alt = `${project.title}, ${shot.page} page on ${shot.device.toLowerCase()}`;

  return (
    <div>
      {/* Main view, the same height for both devices: the box has the browser frame's shape and the
          phone fills its height. The key restarts the image load when switching screenshots. */}
      <div key={shot.src} className="relative aspect-[2960/1570]">
        {shot.device === "Desktop" ? (
          <DeviceMockup device="desktop" src={shot.src} alt={alt} sizes="(min-width: 1024px) 45vw, 95vw" className="w-full" />
        ) : (
          <DeviceMockup
            device="mobile"
            src={shot.src}
            alt={alt}
            sizes="(min-width: 1024px) 15vw, 35vw"
            className="absolute inset-y-0 left-1/2 h-full -translate-x-1/2"
          />
        )}
      </div>
      <p className="mt-2 text-xs text-text">
        {shot.page} · {shot.device}
        <span className="float-right tabular-nums">
          {active + 1} / {shots.length}
        </span>
      </p>

      {shots.length > 1 && (
        <div className="mt-3 flex items-center gap-2">
          <ArrowButton label="Previous screenshot" disabled={active === 0} onClick={() => setActive(active - 1)}>
            <LuChevronLeft />
          </ArrowButton>
          {/* Every thumbnail is as tall as a desktop one (3 of those fill the row); mobile ones keep their phone shape */}
          <div
            ref={rowRef}
            role="group"
            aria-label="Screenshots"
            className="@container relative flex min-w-0 flex-1 gap-3 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {shots.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.page} (${item.device.toLowerCase()})`}
                aria-pressed={index === active}
                className={`relative h-[calc((100cqw-1.5rem)/3*5/11)] shrink-0 overflow-hidden border-2 transition-[border-color,opacity] ${
                  item.device === "Mobile" ? "aspect-[9/16]" : "aspect-[11/5]"
                } ${index === active ? "border-accent" : "border-border opacity-60 hover:border-accent/60 hover:opacity-100"}`}
              >
                <Image src={item.src} alt="" fill sizes="12vw" className="object-cover object-top" />
              </button>
            ))}
          </div>
          <ArrowButton label="Next screenshot" disabled={active === shots.length - 1} onClick={() => setActive(active + 1)}>
            <LuChevronRight />
          </ArrowButton>
        </div>
      )}
    </div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-9 shrink-0 items-center justify-center border border-border text-lg text-title transition-colors hover:border-accent hover:bg-accent hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
