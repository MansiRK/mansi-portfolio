import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

// The site's public address, used for the canonical URL. Set NEXT_PUBLIC_SITE_URL to the live domain
// (e.g. https://mansikamble.com); on Vercel it otherwise falls back to the project's production domain.
const siteUrl =
  (process.env.PRODUCTION_URL
    ? `${process.env.PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Mansi Kamble | Full Stack Developer Portfolio";
// Keep between 70 and 155 characters (currently 146)
const description =
  "Full stack developer in Mumbai with 2.5+ years building fast, SEO-friendly web apps, CMS platforms and dashboards with React, Next.js and Node.js.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // Google ignores meta keywords, but Bing and some smaller search engines still read them
  keywords: [
    "Mansi Kamble",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer in Mumbai",
    "Freelance Web Developer India",
    "CMS Development",
    "Admin Dashboard Development",
    "SEO-friendly Websites",
    "Portfolio",
  ],
  authors: [{ name: "Mansi Kamble" }],
  creator: "Mansi Kamble",
  alternates: {
    canonical: "/",
  },
  // Link previews on LinkedIn, WhatsApp, Slack, Facebook and so on. The image comes from
  // app/opengraph-image.png, which Next.js adds automatically.
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mansi Kamble",
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Before first paint: apply the saved (or system) theme, and flag that intro animations will run
// (`motion` class hides the banner elements until GSAP reveals them)
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion")})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${outfit.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
