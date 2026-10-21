import { PROFILE } from "../lib/profile";
import { SectionTitle } from "./SectionHeading";
import SocialLinks from "./SocialLinks";
import Image from "next/image";
import aboutImg from "@/public/images/about_img.png";

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
      <div>
        <SectionTitle id="about-title" title="About" highlight="Me" />

        <p className="mt-8 max-w-lg text-base leading-relaxed text-title sm:text-lg">
          I&apos;m a MERN stack developer over 2.5 years of experience
          building production apps, REST APIs, CMS platforms and admin dashboards.
        </p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-text sm:text-base">
          At <span className="font-semibold text-accent">Pine Online Website Solutions</span>{" "}
          I&apos;ve shipped work for finance, real estate and media clients, partnered
          directly with 5+ clients and mentored junior developers. I care about
          performance, clean code and SEO that actually moves rankings.
        </p>

        <SocialLinks className="mt-8" />
      </div>

      <div className="overflow-hidden border border-border shadow-xl">
        {/* `fill` sizes the image to this box (needs `relative` + a fixed shape).
            object-contain keeps the whole figure visible; object-cover would zoom in and crop it. */}
        <div className="relative aspect-square max-h-120 w-full bg-surface">
          <Image
            src={aboutImg}
            alt="Illustration of Mansi Kamble coding on a laptop at the office"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-contain object-bottom pt-8"
          />
        </div>

        <dl className="grid grid-cols-2 bg-info-bg">
          {DETAILS.map((item, index) => (
            <div
              key={item.label}
              className={`px-6 py-4 sm:px-8 ${index > 1 ? "border-t border-white/10" : ""} ${
                index % 2 === 1 ? "border-l border-white/10" : ""
              }`}
            >
              <dt className="text-[11px] uppercase tracking-wider text-info-label">{item.label}</dt>
              <dd className="mt-1 break-all text-sm font-semibold text-info-value">
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


