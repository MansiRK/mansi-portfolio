import Image from "next/image";
import { PROJECTS, type Project } from "../lib/projects";

// Each project gets a frame colour by its position in the list
const GRADIENTS = [
  "from-[#7C3AED] to-[#EC4899]",
  "from-[#3B0F4F] to-[#D946EF]",
  "from-[#A855F7] to-[#6366F1]",
  "from-[#5B21B6] to-[#C084FC]",
  "from-[#DB2777] to-[#7C3AED]",
  "from-[#4C1D95] to-[#A855F7]",
];

/** Gradient classes for a project's frame (cards and the modal gallery share them) */
export const projectGradient = (project: Project) => GRADIENTS[PROJECTS.indexOf(project) % GRADIENTS.length];

type ProjectShotProps = {
  project: Project;
  image?: string;
  sizes: string;
  className?: string;
};

/** Gradient frame with the screenshot inset like a browser window. Shows only the gradient until an image is added. */
export default function ProjectShot({ project, image, sizes, className = "" }: ProjectShotProps) {
  return (
    <div className={`relative overflow-hidden bg-linear-to-br ${projectGradient(project)} ${className}`}>
      {image && (
        <div className="absolute inset-x-[8%] bottom-0 top-[10%] overflow-hidden shadow-2xl">
          <Image
            src={image}
            alt={`${project.title} screenshot`}
            fill
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}
