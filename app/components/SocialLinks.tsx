import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { PROFILE } from "../lib/profile";

const SOCIAL_LINKS = [
  { label: "GitHub", href: PROFILE.github, Icon: LuGithub },
  { label: "LinkedIn", href: PROFILE.linkedin, Icon: LuLinkedin },
  { label: "Email", href: `mailto:${PROFILE.email}`, Icon: LuMail },
];

/** `showEmail={false}` hides the email icon where the address is already shown as text */
export default function SocialLinks({ className = "", showEmail = true }: { className?: string; showEmail?: boolean }) {
  const links = showEmail ? SOCIAL_LINKS : SOCIAL_LINKS.filter((link) => link.label !== "Email");

  return (
    <ul className={`flex gap-2 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className="grid size-9 place-items-center border border-border text-title transition-colors hover:border-accent hover:text-accent dark:text-accent dark:hover:text-title"
          >
            <Icon className="size-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
