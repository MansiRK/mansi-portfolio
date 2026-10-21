"use client";

import { useCallback, useState } from "react";
import { LuMenu } from "react-icons/lu";
import SideBar from "./SideBar";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header data-hero="header" className="site-container flex items-center justify-between gap-4 py-5 text-sm sm:text-base">
        <p className="text-text uppercase">Full Stack Developer</p>

        <div className="flex items-center gap-3 sm:gap-4">
          <p className="hidden text-text sm:block uppercase">Mumbai, Maharashtra</p>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="flex items-center hover:cursor-pointer gap-2 px-4 py-2 text-sm font-semibold text-text transition-opacity hover:opacity-90"
          >
            <LuMenu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      <SideBar open={menuOpen} onClose={closeMenu} />
    </>
  );
}
