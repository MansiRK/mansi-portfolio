/**
 * Hover effect shared by the main buttons: a fill sweeps in from the left behind the label (and
 * back out to the right on leave), the button lifts slightly with a soft shadow, and its icon grows.
 *
 * Set the fill colour per button with `[--sweep:...]`, plus a hover text colour that reads on it.
 * The lift is skipped for visitors who prefer reduced motion.
 */
export const buttonSweep =
  "relative isolate overflow-hidden transition-[color,border-color,translate,box-shadow] duration-300 " +
  "before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:bg-(--sweep) " +
  "before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "hover:before:origin-left hover:before:scale-x-100 focus-visible:before:origin-left focus-visible:before:scale-x-100 " +
  "hover:shadow-[0_10px_24px_-12px_var(--sweep)] motion-safe:hover:-translate-y-0.5 " +
  "[&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:scale-115";
