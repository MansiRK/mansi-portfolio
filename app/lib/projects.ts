// lib/projects.ts
export type ProjectFilter = "cms" | "dashboards" | "websites";

export type Project = {
  slug: string;
  title: string;
  category: "client" | "personal";
  kind: "Full-stack" | "Frontend" | "Backend" | "Dashboard" | "Backend and Frontend Integration";
  industry: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  live?: string;
  /** Card cover, e.g. "/images/projects/raymond/home.png". Falls back to the first gallery page. */
  cover?: string;
  /** Optional cover for the dark theme (uses `cover` when left out) */
  coverDark?: string;
  /** Pages shown in the project modal, each with a desktop and (optionally) a mobile screenshot */
  gallery?: ProjectPage[];
};

/**
 * One page of a project. Paths start at /public but leave it out:
 * public/images/projects/raymond/home.png  ->  "/images/projects/raymond/home.png"
 */
export type ProjectPage = {
  /** Tab label in the modal */
  title: string;
  /** Desktop screenshot (a full-page one can be scrolled inside the browser frame) */
  desktop?: string;
  /** Optional desktop screenshot for the dark theme (uses `desktop` when left out) */
  desktopDark?: string;
  /** Mobile screenshot, shown in a phone frame. A page needs at least one of the two. */
  mobile?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "raymond-realty",
    title: "Raymond Realty",
    category: "client",
    kind: "Full-stack",
    industry: "Real estate",
    role: "Full-stack developer, feature development and maintenance",
    summary:
      "Built new features across the public website, admin panel and backend of a large real estate platform, and improved its technical SEO.",
    highlights: [
      "Shipped features end to end: Next.js website, React admin panel and Express API",
      "Technical SEO with meta tags, XML sitemap, robots.txt, GA4 and GTM",
      "Ongoing maintenance with production fixes and feature enhancements",
    ],
    stack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Zustand", "AWS S3"],
    live: "https://raymondrealty.in/",
    cover: "/images/projects/raymond/home.png",
    gallery: [
      {
        title: "Home",
        desktop: "/images/projects/raymond/home.png",
        mobile: "/images/projects/raymond/home-mob.png",
      },
      { title: "About", desktop: "/images/projects/raymond/about.png" },
      { title: "Projects", desktop: "/images/projects/raymond/proj.png" },
      {
        title: "Project details",
        desktop: "/images/projects/raymond/proj-broc.png",
        mobile: "/images/projects/raymond/proj-broc-mob.png",
      },
      { title: "Investors", desktop: "/images/projects/raymond/investor.png" },
      { title: "Enquiry", desktop: "/images/projects/raymond/enq.png" },
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
      "Built the Careers, Channel Partner (Super Stockist and Distributor) and Export modules, each managed through its own admin panel on a MERN-based CMS.",
    highlights: [
      "3 separate admin panels for job openings, partner enquiries and export requests",
      "Dynamic job filters and application forms on the Careers page",
      "Reusable backend APIs shared across all modules",
    ],
    stack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Zustand", "AWS S3"],
    live: "https://hindustanpencils.com/",
    cover: "/images/projects/hppl/career.png",
    gallery: [
      {
        title: "Careers",
        desktop: "/images/projects/hppl/career.png",
        mobile: "/images/projects/hppl/career-mob.png",
      },
      {
        title: "Super Stockist",
        desktop: "/images/projects/hppl/super.png",
        mobile: "/images/projects/hppl/super-mob.png",
      },
      { title: "Distributor", desktop: "/images/projects/hppl/distributor.png" },
      { title: "Export", desktop: "/images/projects/hppl/export.png" },
    ],
  },
  {
    slug: "piper-serica",
    title: "Piper Serica",
    category: "client",
    kind: "Full-stack",
    industry: "Finance",
    role: "Full-stack developer",
    summary:
      "Built the website, backend and admin panel for an investment firm, with optimised APIs and hardened security.",
    highlights: [
      "Around 30% faster through optimised API integration",
      "JWT authentication for the admin panel",
      "CORS, Helmet and CSP security headers configured",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Redis"],
    live: "https://piperserica.com/",
    cover: "/images/projects/piper/home.png",
    gallery: [
      {
        title: "Home",
        desktop: "/images/projects/piper/home.png",
        mobile: "/images/projects/piper/home-mob.png",
      },
      { title: "About", desktop: "/images/projects/piper/about.png" },
      { title: "Public fund", desktop: "/images/projects/piper/public-fund.png" },
      { title: "Angel fund", mobile: "/images/projects/piper/angel-fund-mob.png" },
    ],
  },
  {
    slug: "natroyal-group",
    title: "Natroyal Group",
    category: "client",
    kind: "Full-stack",
    industry: "Manufacturing",
    role: "Full-stack developer",
    summary:
      "Built the business website, backend and admin panel for a manufacturing group with 5 divisions.",
    highlights: [
      "One responsive website presenting all 5 divisions and their product categories",
      "Admin panel for managing content without touching code",
      "Media stored and served from AWS S3",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "AWS S3"],
    live: "https://www.natroyalgroup.com/",
    cover: "/images/projects/natroyal/home.png",
    gallery: [
      {
        title: "Home",
        desktop: "/images/projects/natroyal/home.png",
        mobile: "/images/projects/natroyal/home-mob.png",
      },
      { title: "Categories", desktop: "/images/projects/natroyal/category.png" },
      {
        title: "Coated fabrics",
        desktop: "/images/projects/natroyal/coated.png",
        mobile: "/images/projects/natroyal/coated-mob.png",
      },
      {
        title: "Vinyl flooring",
        desktop: "/images/projects/natroyal/vinyl-app.png",
        mobile: "/images/projects/natroyal/vinyl-mob.png",
      },
    ],
  },
      {
    slug: "shivalik-ventures",
    title: "Shivalik Ventures",
    category: "client",
    kind: "Full-stack",
    industry: "Real estate",
    role: "Full-stack developer",
    summary:
      "Built the backend, REST APIs and admin panel for a real estate developer's website, and integrated them with the frontend so all content is managed dynamically.",
    highlights: [
      "Designed the Node.js and Express backend with REST APIs backed by MongoDB",
      "Admin panel for managing projects, pages and media without touching code",
      "Integrated the APIs with the React.js website for dynamic project listings and detail pages",
      "Project images and media stored and served from AWS S3",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API", "AWS S3"],
    live: "https://www.shivalikventures.com",
    cover: "/images/projects/shivalik/home.png",
    gallery: [
      {
        title: "Home",
        desktop: "/images/projects/shivalik/home.png",
        mobile: "/images/projects/shivalik/home-mob.png",
      },
      { title: "About", desktop: "/images/projects/shivalik/about.png" },
      {
        title: "Projects",
        desktop: "/images/projects/shivalik/proj.png",
        mobile: "/images/projects/shivalik/proj-mob.png",
      },
      { title: "Project details", desktop: "/images/projects/shivalik/proj-detail.png" },
    ],
  },
  {
    slug: "my-manas",
    title: "My Manas Foundation",
    category: "client",
    kind: "Frontend",
    industry: "Non-profit",
    role: "Frontend developer",
    summary:
      "Built the responsive frontend for My Manas Foundation, a non-profit working to uplift youth through education, including its Manas Academy and Vidhya Vanam pages.",
    highlights: [
      "Responsive React.js pages built with Bootstrap",
      "Reusable components shared across all pages",
      "Images optimised and delivered through Cloudinary",
      "Dedicated pages for the academy, programmes and donations",
    ],
    stack: ["React.js", "Bootstrap", "CSS", "Cloudinary"],
    live: "https://mymanas.org/",
    cover: "/images/projects/mymanas/home.png",
    gallery: [
      {
        title: "Home",
        desktop: "/images/projects/mymanas/home.png",
        mobile: "/images/projects/mymanas/home-mob.png",
      },
      { title: "About", mobile: "/images/projects/mymanas/about-mob.png" },
      { title: "Academy", desktop: "/images/projects/mymanas/academy.png" },
      { title: "Vidhya Vanam", desktop: "/images/projects/mymanas/vidhya-vanam.png" },
      { title: "Scope", desktop: "/images/projects/mymanas/scope.png" },
      { title: "Donate", desktop: "/images/projects/mymanas/donate.png" },
    ],
  },
 
  {
    slug: "product-management-system",
    title: "ShopEase Dashboard",
    category: "personal",
    kind: "Dashboard",
    industry: "E-commerce",
    role: "Personal project",
    summary:
      "An admin dashboard for running an online store, with live store stats, a searchable product catalogue, and wishlist and cart management behind a secure login.",
    highlights: [
      "Overview of 12 store metrics, including inventory value, low stock and out-of-stock products",
      "Product catalogue with search, category, price and sort filters, in grid or list view",
      "Wishlist and cart with item counts, move-all and clear-all actions",
      "Login-protected admin area and a fully responsive layout",
    ],
    stack: ["React.js", "React Query", "REST API", "DummyJSON API"],
    live: "https://shopease-ecommerce-8d2f.onrender.com/",
    cover: "/images/projects/product-management/dashboard.png",
    gallery: [
      {
        title: "Dashboard",
        desktop: "/images/projects/product-management/dashboard.png",
        mobile: "/images/projects/product-management/dashboard-mob.png",
      },
      {
        title: "Products",
        desktop: "/images/projects/product-management/prod.png",
        mobile: "/images/projects/product-management/prod-mob.png",
      },
      { title: "Wishlist", desktop: "/images/projects/product-management/wishlist.png" },
      { title: "Login", desktop: "/images/projects/product-management/login.png" },
    ],
  },
  {
    slug: "shoprise",
    title: "ShopRise E-commerce",
    category: "personal",
    kind: "Full-stack",
    industry: "E-commerce",
    role: "Personal project",
    summary:
      "A full-stack e-commerce store with customer accounts, a product catalogue, wishlist and cart, an admin panel and a MySQL database.",
    highlights: [
      "Customer registration and an account menu",
      "Product pages with wishlist and cart",
      "Admin panel for managing products and orders",
      "Relational data modelling in MySQL",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MySQL"],
    live: "https://shoprise.onrender.com",
    cover: "/images/projects/shoprise/home.png",
    gallery: [
      { title: "Home", desktop: "/images/projects/shoprise/home.png" },
      { title: "Account menu", desktop: "/images/projects/shoprise/home-account.png" },
      { title: "Register", desktop: "/images/projects/shoprise/register.png" },
      { title: "Product", desktop: "/images/projects/shoprise/prod.png" },
      { title: "Wishlist", desktop: "/images/projects/shoprise/wishlist.png" },
      { title: "Cart", desktop: "/images/projects/shoprise/cart.png" },
    ],
  },
   {
    slug: "user-data-management",
    title: "User Data Management",
    category: "personal",
    kind: "Dashboard",
    industry: "Admin tools",
    role: "Personal project",
    summary:
      "A CRUD admin app for managing user records: add, view, edit and delete users from a single table.",
    highlights: [
      "Full create, read, update and delete flow for user records",
      "Data table with quick view, edit and delete actions on every row",
      "Shared form for adding and editing users, with city and country dropdowns",
      "Detail page for each user and a fully responsive layout",
    ],
    stack: ["React.js", "Firebase", "REST API"],
    live: "https://user-data-management-app.web.app/",
    cover: "/images/projects/user-data/home.png",
    gallery: [
      {
        title: "All users",
        desktop: "/images/projects/user-data/home.png",
        mobile: "/images/projects/user-data/home-mob.png",
      },
      { title: "Add user", desktop: "/images/projects/user-data/add-user.png" },
      {
        title: "User details",
        desktop: "/images/projects/user-data/view.png",
        mobile: "/images/projects/user-data/view-mob.png",
      },
      { title: "Edit user", desktop: "/images/projects/user-data/edit-user.png" },
    ],
  },
  {
    slug: "social-media-api",
    title: "Social Media API",
    category: "personal",
    kind: "Backend",
    industry: "Social",
    role: "Personal project",
    summary:
      "A REST API for a social media app where only logged-in users can post, like, comment, save posts and follow other users.",
    highlights: [
      "Token-based authentication for register, login and logout, protecting every action",
      "Posts with images and captions, plus likes, comments and saves",
      "Follow and unfollow between users, with profile management",
      "Image uploads to Cloudinary and a clean MVC structure",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Cloudinary"],
    cover: "/images/projects/social-media/cover-light.webp",
    coverDark: "/images/projects/social-media/cover-dark.webp",
    
  },
];