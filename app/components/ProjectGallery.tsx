"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Project } from "../lib/projects";
import ProjectShot from "./ProjectShot";

type Shot = { src: string; page: string; device: "Desktop" | "Mobile" };

/**
 * Project screenshots in the modal: the selected screenshot in a browser window, and a row of
 * thumbnails underneath with left/right arrows when there are more than fit (3 at a time).
 * Every page contributes its desktop shot and, if it has one, its mobile shot.
 * Without a gallery it falls back to the cover (or the plain gradient frame).
 */
export default function ProjectGallery({ project }: { project: Project }) {
  const shots: Shot[] = (project.gallery ?? []).flatMap((page) => [
    { src: page.desktop, page: page.title, device: "Desktop" as const },
    ...(page.mobile ? [{ src: page.mobile, page: page.title, device: "Mobile" as const }] : []),
  ]);
  const [active, setActive] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  // Whether the thumbnail row is scrolled to its start/end; both true means everything fits
  const [edges, setEdges] = useState({ start: true, end: true });

  const updateEdges = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    setEdges({
      start: row.scrollLeft <= 1,
      end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 1,
    });
  }, []);

  // The observer also fires once on observe, which sets the initial state
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(row);
    return () => observer.disconnect();
  }, [updateEdges, shots.length]);

  if (shots.length === 0) {
    return (
      <ProjectShot project={project} image={project.cover} sizes="(min-width: 1024px) 40vw, 90vw" className="aspect-16/11" />
    );
  }

  const shot = shots[active];
  const scrollRow = (direction: 1 | -1) => {
    const row = rowRef.current;
    row?.scrollBy({ left: direction * row.clientWidth, behavior: "smooth" });
  };
  const hasOverflow = !(edges.start && edges.end);

  return (
    <div>
      {/* Main view; key resets the window's scroll position when switching screenshots */}
      <div key={shot.src} className="relative aspect-video">
        <Window shot={shot} alt={`${project.title}, ${shot.page} page on ${shot.device.toLowerCase()}`} />
      </div>
      <p className="mt-2 text-xs text-text">
        {shot.page} · {shot.device}
      </p>

      {shots.length > 1 && (
        <div className="mt-3 flex items-center gap-2">
          {hasOverflow && (
            <ArrowButton label="Previous screenshots" disabled={edges.start} onClick={() => scrollRow(-1)}>
              <LuChevronLeft />
            </ArrowButton>
          )}
          <div
            ref={rowRef}
            role="group"
            aria-label="Screenshots"
            onScroll={updateEdges}
            className="flex min-w-0 flex-1 snap-x gap-3 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {shots.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.page} (${item.device.toLowerCase()})`}
                aria-pressed={index === active}
                className={`relative aspect-16/10 w-[calc((100%-1.5rem)/3)] shrink-0 snap-start overflow-hidden border-2 bg-white transition-colors ${
                  index === active ? "border-accent" : "border-border hover:border-accent/60"
                }`}
              >
                <Image src={item.src} alt="" fill sizes="12vw" className="object-cover object-top" />
                {item.device === "Mobile" && (
                  <span className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                    Mobile
                  </span>
                )}
              </button>
            ))}
          </div>
          {hasOverflow && (
            <ArrowButton label="Next screenshots" disabled={edges.end} onClick={() => scrollRow(1)}>
              <LuChevronRight />
            </ArrowButton>
          )}
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

/**
 * Browser window with a small dot bar on top. Desktop shots fill the frame; mobile shots get a
 * narrow, phone-width window in the centre. Tall screenshots can be scrolled inside the window.
 */
function Window({ shot, alt }: { shot: Shot; alt: string }) {
  const mobile = shot.device === "Mobile";

  return (
    <div
      className={`absolute inset-y-0 flex flex-col border border-border bg-white ${
        mobile ? "left-1/2 w-[26%] -translate-x-1/2" : "inset-x-0"
      }`}
    >
      <div className="flex shrink-0 gap-[3%] px-[3%] py-[2.5%]" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className={`aspect-square rounded-full bg-[#C9B8E8] ${mobile ? "w-[7%]" : "w-[1.4%]"}`} />
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <Image src={shot.src} alt={alt} width={1440} height={900} sizes="(min-width: 1024px) 40vw, 90vw" className="block h-auto w-full" />
      </div>
    </div>
  );
}
