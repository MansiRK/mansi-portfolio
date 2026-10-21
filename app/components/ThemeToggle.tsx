"use client";

import { useLayoutEffect } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  // React's dev remount clears the attribute set by the inline script, so re-apply it.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", getPreferredTheme());
  }, []);

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme");
    const next: Theme = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  // Active state is styled with the `dark:` variant, so no React state is needed
  // and server/client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex items-center gap-0.5 hover:cursor-pointer rounded-full border border-border bg-pill-bg p-0.5 px-1 transition-colors"
    >
      <span className="grid size-6 place-items-center rounded-full bg-accent text-white transition-colors dark:bg-transparent dark:text-text">
        <LuSun className="size-3.5" aria-hidden="true" />
      </span>
      <span className="grid size-6 place-items-center rounded-full text-text transition-colors dark:bg-button dark:text-white">
        <LuMoon className="size-3.5" aria-hidden="true" />
      </span>
    </button>
  );
}
