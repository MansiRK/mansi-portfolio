import type { IconType } from "react-icons";
import { LuLinkedin, LuMail, LuMapPin, LuGithub } from "react-icons/lu";
import { PROFILE } from "../lib/profile";
import ContactForm from "./ContactForm";
import { SectionTitle } from "./SectionHeading";

const CONTACT_DETAILS: { Icon: IconType; label: string; value: string; href?: string }[] = [
  { Icon: LuMail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { Icon: LuGithub, label: "GitHub", value: PROFILE.github.replace(/^https?:\/\//, ""), href: PROFILE.github },
  { Icon: LuLinkedin, label: "LinkedIn", value: PROFILE.name, href: PROFILE.linkedin },
  { Icon: LuMapPin, label: "Location", value: PROFILE.location },
];

/** Contact section plus the site footer, on one dark band */
export default function Contact() {
  return (
    <div className="inverse-theme bg-(--inverse-bg)">
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="site-container grid scroll-mt-6 gap-12 pb-16 pt-20 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-12 lg:pt-28 xl:grid-cols-[minmax(0,1fr)_30rem] xl:gap-16"
      >
        <div data-reveal-group className="flex flex-col">
          <SectionTitle
            id="contact-title"
            title={
              <>
                Let&rsquo;s <br className="max-lg:hidden" />
                work
              </>
            }
            highlight="Together"
            // Slightly smaller on desktop so the title leaves room for the form
            className="lg:text-[clamp(2rem,0.25rem+4vw,5rem)]"
          />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-text sm:text-base">
            Have a project in mind? Tell me what you&rsquo;re building and I&rsquo;ll reply within one working day.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {CONTACT_DETAILS.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center bg-white/10 text-(--inverse-icon) dark:bg-icon-bg">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] text-accent">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-title transition-colors [overflow-wrap:anywhere] hover:text-accent"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-title">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <PaperPlanePath />
        </div>

        <ContactForm />
      </section>

      <footer className="site-container">
        <p className="border-t border-border py-6 text-xs text-text">
          &copy; 2026 {PROFILE.name}. Designed and built by me.
        </p>
      </footer>
    </div>
  );
}

/* Dotted flight path ending in a paper plane, under the contact details on desktop */
function PaperPlanePath() {
  return (
    <svg viewBox="0 0 260 110" data-parallax="0.3" className="mt-auto hidden w-64 pt-10 lg:block" aria-hidden="true">
      <path
        d="M4 100c30-6 44-40 74-40s36 38 64 34 32-50 66-58"
        fill="none"
        className="stroke-accent/70"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <path d="M206 28 252 6l-20 46-8-16z" className="fill-(--inverse-deco-small)" />
      <path d="M224 36 252 6l-36 18z" className="fill-accent" />
    </svg>
  );
}
