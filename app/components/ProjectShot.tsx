import Image from "next/image";
import type { Project } from "../lib/projects";

type ProjectShotProps = {
  project: Project;
  image?: string;
  sizes: string;
  className?: string;
};

/** Gradient frame with the screenshot inset like a browser window. Shows only the gradient until an image is added. */
export default function ProjectShot({ project, image, sizes, className = "" }: ProjectShotProps) {
  return (
    <div className={`relative overflow-hidden bg-linear-to-br ${project.gradient} ${className}`}>
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
