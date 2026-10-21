"use client";

import { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";
import SocialLinks from "./SocialLinks";

const MENU_ITEMS = [
  { label: "About me", href: "#about" },
  { label: "What I do", href: "#services" },
  { label: "My skills", href: "#skills" },
  { label: "My process", href: "#process" },
  { label: "Selected works", href: "#works" },
  { label: "Education & experience", href: "#experience" },
  { label: "By the numbers", href: "#numbers" },
  { label: "Let's work together", href: "#contact" },
];

type SideBarProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideBar({ open, onClose }: SideBarProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] ${open ? "visible" : "invisible delay-500"}`}
      inert={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Table of content"
        className={`absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col overflow-y-auto bg-surface px-6 py-8 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-5 top-5 grid size-8 place-items-center bg-pill-bg text-title shadow-md transition-transform hover:rotate-90 dark:text-accent"
        >
          <LuX className="size-3.5" aria-hidden="true" />
        </button>

        <div className="grid flex-1 gap-10 pt-6 md:grid-cols-[1fr_1.15fr] md:gap-6">
          <div>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-title sm:text-[2.6rem]">
              Table of
              <span className="block text-accent">Content</span>
            </h2>
            <span className="mt-6 block h-0.5 w-12 bg-rule" />
          </div>

          <nav aria-label="Sections">
            <ol>
              {MENU_ITEMS.map((item, index) => (
                <li key={item.href} className="border-b border-border">
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-start justify-between gap-4 py-3"
                  >
                    <span className="font-display text-lg font-extrabold uppercase leading-tight text-title transition-colors group-hover:text-accent dark:text-accent dark:group-hover:text-title sm:text-xl">
                      {item.label}
                    </span>
                    <span className="pt-1 text-xs text-text">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="mt-12">
          <p className="max-w-60 text-sm leading-relaxed text-text">
            A quick map of who I am, what I build and how to reach me.
          </p>
          <SocialLinks className="mt-4" />
        </div>
      </aside>
    </div>
  );
}
