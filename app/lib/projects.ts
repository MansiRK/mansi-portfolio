export type ProjectFilter = "cms" | "dashboards" | "websites";

// lib/projects.ts
export type Project = {
  slug: string;
  title: string;
  category: "client" | "personal";
  kind: "Full-stack" | "Frontend" | "Backend";
  industry: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  live?: string;
  repo?: string;
  /** Optional screenshots under /public, e.g. ["/images/works/raymond-1.png"]. The first is the card cover. */
  images?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "raymond-realty",
    title: "Raymond Realty",
    category: "client",
    kind: "Full-stack",
    industry: "Real estate",
    role: "Full-stack developer, ongoing maintenance",
    summary:
      "Built new features across the public site, admin panel and backend for a large real estate platform, and improved its technical SEO.",
    highlights: [
      "Shipped features end to end: Next.js frontend, React admin panel, Express API",
      "Technical SEO: meta tags, XML sitemap, robots.txt, GA4 and GTM",
      "Ongoing maintenance: production fixes and feature enhancements",
    ],
    stack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB"],
    live: "https://raymondrealty.in/",
    cover: "/projects/raymond/home.png",
gallery: [
  { src: "/projects/raymond/raymond/home.png", alt: "Raymond Realty homepage" },
  { src: "/projects/raymond/raymond/about.png", alt: "CMS admin panel" },
  { src: "/projects/raymond/raymond/proj.png", alt: "Mobile views" },
  { src: "/projects/raymond/raymond/proj.png", alt: "Mobile views" },
  { src: "/projects/raymond/raymond/home-mob.png", alt: "Mobile views" },
  { src: "/projects/raymond/raymond/enq.png", alt: "Mobile views" },
  { src: "/projects/raymond/raymond/investor.png", alt: "Mobile views" },
  { src: "/projects/raymond/raymond/proj-broc-mob.png", alt: "Mobile views" },
  { src: "/projects/raymond/raymond/proj-broc.png", alt: "Mobile views" },


],
  },
  {
    slug: "hindustan-pencils",
    title: "Hindustan Pencils",
    category: "client",
    kind: "Full-stack",
    industry: "Manufacturing",
    role: "Full-stack developer",
    summary:
      "Built the Careers, Channel Partner and Export modules, each with its own admin panel, on a MERN-based CMS.",
    highlights: [
      "3 separate admin panels for jobs, partner enquiries and export requests",
      "Dynamic job filters and application forms",
      "Reusable backend APIs shared across modules",
    ],
    stack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB"],
    live: "https://hindustanpencils.com/",
  },
  {
    slug: "piper-serica",
    title: "Piper Serica",
    category: "client",
    kind: "Full-stack",
    industry: "Finance",
    role: "Full-stack developer",
    summary:
      "Built the frontend, backend and admin panel for an investment firm, with optimised APIs and hardened security.",
    highlights: [
      "Around 30% faster through optimised API integration",
      "JWT authentication",
      "CORS, Helmet and CSP security headers",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Redis"],
    live: "https://piperserica.com/",
  },
  {
    slug: "natroyal-group",
    title: "Natroyal Group",
    category: "client",
    kind: "Full-stack",
    industry: "Manufacturing",
    role: "Full-stack developer",
    summary:
      "Built the business website, backend and admin panel for a group with 5 divisions.",
    highlights: [
      "One responsive site presenting all 5 divisions",
      "Admin panel for managing content without code",
      "Media stored on AWS S3",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "AWS S3"],
    live: "https://www.natroyalgroup.com/",
  },
  {
    slug: "my-manas",
    title: "My Manas Foundation",
    category: "client",
    kind: "Frontend",
    industry: "Non-profit",
    role: "Frontend developer",
    summary: "Built the responsive frontend for the My Manas Foundation website.",
    highlights: ["Responsive React.js frontend", "Reusable component-based pages"],
    stack: ["React.js", "CSS"],
    live: "https://mymanas.org/",
  },
  {
    slug: "shoprise",
    title: "ShopRise E-commerce",
    category: "personal",
    kind: "Full-stack",
    industry: "E-commerce",
    role: "Personal project",
    summary:
      "A full-stack e-commerce store with a customer-facing shop, an admin panel and a MySQL database.",
    highlights: [
      "Product catalogue and storefront",
      "Admin panel for products and orders",
      "Relational data modelling in MySQL",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MySQL"],
    repo: "https://github.com/MansiRK/ShopRise-Ecommerce",
  },
  {
    slug: "social-media-api",
    title: "Social Media API",
    category: "personal",
    kind: "Backend",
    industry: "Social",
    role: "Personal project",
    summary: "A REST API powering the core of a social media app.",
    highlights: ["RESTful endpoints for users and posts", "MongoDB data models with Mongoose"],
    stack: ["Node.js", "Express.js", "MongoDB"],
    repo: "https://github.com/MansiRK/Social-media-app-Backend",
  },
];