export type ProjectFilter = "cms" | "dashboards" | "websites";

export type Project = {
  title: string;
  /** Shown above the title in the modal and first in the card subtitle */
  category: string;
  filter: ProjectFilter;
  industry: string;
  tags: string[];
  summary: string;
  highlights: string[];
  role: string;
  stack: string;
  /** Screenshot paths under /public, e.g. "/images/works/raymond-1.png". The first one is the cover. */
  images: string[];
  /** Gradient frame behind the screenshots */
  gradient: string;
  liveUrl?: string;
  sourceUrl?: string;
};

export const FILTERS: { value: ProjectFilter | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "cms", label: "CMS platforms" },
  { value: "dashboards", label: "Dashboards" },
  { value: "websites", label: "Websites" },
];

// TODO: add screenshots to `images`, live/source URLs, and fill in the details marked below
export const PROJECTS: Project[] = [
  {
    title: "Raymond Realty",
    category: "CMS platform",
    filter: "cms",
    industry: "Real estate",
    tags: ["Next.js", "MERN", "JWT"],
    summary:
      "Frontend, backend and admin panel features for a large-scale real estate platform built with Next.js and the MERN stack.",
    highlights: [
      "CMS modules for dynamic content management",
      "Technical SEO with meta tags, XML sitemap, robots.txt, GA4 and GTM",
      "Salesforce integration, plus AMC support and production fixes",
    ],
    role: "Full-stack developer",
    stack: "Next.js, MERN, JWT, Zustand",
    images: [],
    gradient: "from-[#7C3AED] to-[#EC4899]",
  },
  {
    title: "Hindustan Pencils",
    category: "CMS platform",
    filter: "cms",
    industry: "Manufacturing",
    tags: ["Next.js", "MERN", "MongoDB"],
    summary: "CMS platform for a manufacturing brand.", // TODO: expand
    highlights: [], // TODO
    role: "Full-stack developer", // TODO: confirm
    stack: "Next.js, MERN, MongoDB",
    images: [],
    gradient: "from-[#3B0F4F] to-[#D946EF]",
  },
  {
    title: "Piper Serica",
    category: "Dashboard",
    filter: "dashboards",
    industry: "Finance",
    tags: ["React.js", "Node.js", "MongoDB"],
    summary: "Dashboard for a finance client.", // TODO: expand
    highlights: [], // TODO
    role: "Full-stack developer", // TODO: confirm
    stack: "React.js, Node.js, MongoDB",
    images: [],
    gradient: "from-[#A855F7] to-[#6366F1]",
  },
  {
    title: "Natroyal Group",
    category: "Business website",
    filter: "websites",
    industry: "Manufacturing",
    tags: ["React.js", "MERN", "AWS S3"],
    summary: "Business website for a manufacturing group.", // TODO: expand
    highlights: [], // TODO
    role: "Full-stack developer", // TODO: confirm
    stack: "React.js, MERN, AWS S3",
    images: [],
    gradient: "from-[#5B21B6] to-[#C084FC]",
  },
];
