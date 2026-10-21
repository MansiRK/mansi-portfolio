import Image from "next/image";
import type { CSSProperties } from "react";
import { PROJECTS, type Project } from "../lib/projects";

/**
 * Device frames from public/images, one per theme. The screen area in each image is transparent;
 * `screen` is its position inside the image, so the screenshot sits exactly behind it.
 */
const FRAMES = {
  desktop: {
    light: "/images/desktop-frame-light.png",
    dark: "/images/desktop-frame-dark.png",
    aspect: "2960 / 1570",
    // Bottom corners rounded like the window's (~31px of the 2800×1284px screen)
    screen: "left-[2.7%] top-[12.48%] w-[94.6%] h-[81.78%] rounded-b-[1.1%_2.4%]",
  },
  mobile: {
    light: "/images/mobile-frame-light.png",
    dark: "/images/mobile-frame-dark.png",
    aspect: "1068 / 1836",
    // Bottom corners rounded like the phone's screen, so the screenshot doesn't poke out past them
    screen: "left-[10.49%] top-[11.55%] w-[79.03%] h-[82.35%] rounded-b-[10.7%_6%]",
  },
};

type DeviceMockupProps = {
  device: "desktop" | "mobile";
  src?: string;
  /** Shown instead of `src` in the dark theme */
  darkSrc?: string;
  alt: string;
  sizes: string;
  className?: string;
  style?: CSSProperties;
};

/** A screenshot inside the browser or phone frame, using the light or dark frame to match the theme */
export function DeviceMockup({ device, src, darkSrc, alt, sizes, className = "", style }: DeviceMockupProps) {
  const frame = FRAMES[device];
  const shot = "object-cover object-top";

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: frame.aspect, ...style }}>
      <div className={`absolute overflow-hidden bg-white ${frame.screen}`}>
        {src && <Image src={src} alt={alt} fill sizes={sizes} className={`${shot} ${darkSrc ? "dark:hidden" : ""}`} />}
        {darkSrc && <Image src={darkSrc} alt={alt} fill sizes={sizes} className={`hidden ${shot} dark:block`} />}
      </div>
      {/* Frame on top of the screenshot */}
      <Image src={frame.light} alt="" fill sizes={sizes} className="pointer-events-none select-none dark:hidden" />
      <Image src={frame.dark} alt="" fill sizes={sizes} className="pointer-events-none hidden select-none dark:block" />
    </div>
  );
}

type ProjectShotProps = {
  project: Project;
  image?: string;
  /** Shown instead of `image` in the dark theme */
  darkImage?: string;
  sizes: string;
  className?: string;
};

// Each project gets a background gradient by its position in the list
const GRADIENTS = [
  "from-[#7C3AED] to-[#EC4899]",
  "from-[#3B0F4F] to-[#D946EF]",
  "from-[#A855F7] to-[#6366F1]",
  "from-[#5B21B6] to-[#C084FC]",
  "from-[#DB2777] to-[#7C3AED]",
  "from-[#4C1D95] to-[#A855F7]",
];

/** A project's cover in the browser frame on a gradient background (an empty window until an image is added) */
export default function ProjectShot({ project, image, darkImage, sizes, className = "" }: ProjectShotProps) {
  const gradient = GRADIENTS[PROJECTS.indexOf(project) % GRADIENTS.length];

  return (
    <div className={`bg-linear-to-br px-[3%] pt-[3.5%] pb-[1.5%] ${gradient} ${className}`}>
      <DeviceMockup
        device="desktop"
        src={image}
        darkSrc={darkImage}
        alt={`${project.title} screenshot`}
        sizes={sizes}
      />
    </div>
  );
}
