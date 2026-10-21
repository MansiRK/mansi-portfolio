import { PROFILE } from "../lib/profile";
import { SectionTitle } from "./SectionHeading";
import SocialLinks from "./SocialLinks";
import Image from "next/image";
import aboutImg from "@/public/images/about_img1.png";

const DETAILS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "Location", value: PROFILE.location },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="site-container grid scroll-mt-6 items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28"
    >
      <div data-reveal-group>
        <SectionTitle id="about-title" title="About" highlight="Me" />

        <p className="mt-8 max-w-lg text-base leading-relaxed text-title sm:text-lg">
          I’m a full-stack developer with 2.5+ years of experience building production websites and web apps with React, Next.js, Node.js and MongoDB.
        </p>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-title sm:text-lg">
          I’ve worked with 15+ clients across real estate, finance, manufacturing and media, building CMS platforms, admin dashboards and secure REST APIs. I care about speed, clean code and SEO that helps people actually find the work.
        </p>

        <SocialLinks className="mt-8" />
      </div>

      <div className="overflow-hidden border border-border shadow-xl">
        {/* `fill` sizes the image to this box (needs `relative` + a fixed shape). The square cut-out fills the
            full width; the frame trims a little off the desk (more) and the top (less, so the hair stays in)
            and clips the laptop cleanly at the card's left edge. */}
        <div data-reveal="image" className="relative aspect-[9/8] w-full overflow-hidden bg-surface">
          <Image
            src={aboutImg}
            alt="Illustration of Mansi Kamble coding on a laptop at the office"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover object-[50%_45%]"
          />
        </div>

        {/* Side by side when the card is wide enough (the email column fits its text); stacked on phones
            and on mid-size screens where the card is narrow */}
        <dl className="grid bg-info-bg sm:grid-cols-[auto_1fr] lg:grid-cols-1 xl:grid-cols-[auto_1fr]">
          {DETAILS.map((item, index) => (
            <div
              key={item.label}
              className={`px-6 py-4 sm:px-8 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0 lg:border-l-0 lg:border-t xl:border-l xl:border-t-0" : ""}`}
            >
              <dt className="text-[11px] uppercase tracking-wider text-info-label">{item.label}</dt>
              <dd className="mt-1 text-base font-semibold text-info-value [overflow-wrap:anywhere]">
                {item.href ? (
                  <a href={item.href} className="transition-colors hover:text-accent">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}


