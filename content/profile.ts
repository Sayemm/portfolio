import { topics } from "@/content/topics";

export const hero = {
  kicker: "Backend developer · Regina, SK · Canada",
  firstName: "Mofakh",
  lastName: "Islam",
  /** Split so the employer can carry a link. This is a .ts file, so the JSX
   *  lives in the page; the copy stays here. */
  lede: {
    before: "I build backend services in C# and .NET on Azure at ",
    link: { label: "ShiftLab", href: "https://www.shiftlab.io/" },
    after: ", an AI-powered workforce management startup.",
  },
  body: "Mostly a public notebook — my scratchpad thoughts, turned into organized notes. Everything I learn gets written up here so I can find it again, refresh it, and so someone else can skip the digging.",
};

export const meta = [
  {
    label: "Now",
    value: "Software Developer, ShiftLab",
    detail: ".NET · Azure Service Bus · SQL Server",
  },
  {
    label: "Experience",
    value: "1+ year, full-time backend",
    detail: "plus internships and a TA term in C++",
  },
];

export const languages = [
  { label: "C#", bg: "#ede4f2", fg: "#5a1c6b" },
  { label: "Golang", bg: "#dfeff3", fg: "#0a5f74" },
  { label: "Python", bg: "#e3ecf5", fg: "#204d80" },
  { label: "C++", bg: "#f9e4ec", fg: "#a3164c" },
  { label: "TypeScript", bg: "#e3eaf5", fg: "#1e4c82" },
  { label: "SQL", bg: "#f7ecdb", fg: "#8a5400" },
];

/** Derived from topics.ts, never hand-listed — adding a topic adds its chip. */
export const writingAbout = topics
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((t) => ({
    label: t.name,
    bg: t.chip.bg,
    fg: t.chip.fg,
    topicId: t.id,
  }));

export type Social = {
  label: string;
  href: string;
  /** Brand colour: the link's text colour, and its fill on hover. */
  color: string;
  icon: "mail" | "github" | "linkedin" | "leetcode" | "codeforces";
  external?: boolean;
};

export const socials: Social[] = [
  {
    label: "Email",
    href: "mailto:mofakhkharul.cuet@gmail.com",
    color: "#ec3013",
    icon: "mail",
  },
  {
    label: "GitHub",
    href: "https://github.com/Sayemm",
    color: "#181717",
    icon: "github",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mofakh-kharul/",
    color: "#0a66c2",
    icon: "linkedin",
    external: true,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/sayemseer/",
    color: "#ffa116",
    icon: "leetcode",
    external: true,
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/Sayemm",
    color: "#1f8acb",
    icon: "codeforces",
    external: true,
  },
];

export const stack = [
  { label: "Platforms", value: "Azure · AWS · Docker" },
  { label: "Backend", value: "ASP.NET · EF Core · FastAPI" },
  { label: "Data", value: "SQL Server · PostgreSQL" },
  { label: "Frontend", value: "React · Redux · React Native" },
];

export const jobs = [
  {
    company: "ShiftLab",
    role: "Software Developer · Permanent full-time",
    dates: "May 2026 — ongoing",
    place: "Regina, SK, Canada",
    stack: ".NET · Azure · SQL Server",
    points: [
      "Developing AI-powered workforce management software for employee scheduling, time tracking and labor optimization.",
      "Building scalable backend services and integrations with C#, .NET, Azure Service Bus, Azure Functions and SQL Server.",
      "Building and maintaining CI/CD pipelines with GitHub Actions to automate application builds, testing, and deployments across development, staging and production environments.",
    ],
  },
  {
    company: "SaskTel",
    role: "Service Technician · Casual part-time",
    dates: "May 2024 — May 2026",
    place: "Regina, SK, Canada",
    stack: "Wire-line · Internet · MAX TV",
    points: [
      "Received, analyzed, tested, repaired and escalated customer issues across wire-line, internet and TV services.",
    ],
  },
  {
    company: "Enosis Solutions",
    role: "Software Engineer · Permanent full-time",
    dates: "Jul 2022 — Feb 2023",
    place: "Dhaka, Bangladesh",
    stack: ".NET · Angular · Azure · EF Core",
    points: [
      "Contributed to Matrix, a SaaS ad-sales CRM, on backend performance and multi-tenant data handling.",
      "Tuned LINQ queries, SQL indexes and stored procedures for up to 30% faster query execution.",
      "Built Azure Functions (timer, queue, blob, HTTP) automating data syncs, reporting and background work.",
    ],
  },
  {
    company: "Sohopathi",
    role: "Software Engineer Intern · Part-time",
    dates: "Dec 2021 — Feb 2022",
    place: "Dhaka, Bangladesh",
    stack: "React Native · Redux · TypeScript",
    points: [
      "Implemented and optimized user-facing components for an EdTech platform.",
      "Reworked Redux state management, cutting UI glitches and keeping data flow consistent across modules.",
    ],
  },
  {
    company: "University of Regina",
    role: "Laboratory Teaching Assistant · Part-time",
    dates: "Sep 2024 — Dec 2024",
    place: "Regina, SK, Canada",
    stack: "C++",
    points: [
      "Delivered C++ lectures, ran weekly labs, guided programming tasks and graded in-lab assignments.",
    ],
  },
];

export type Project = {
  name: string;
  /** Optional — the GitHub affordance renders only when set. */
  repo?: string;
  stack: string;
  points: string[];
};

export const projects: Project[] = [
  {
    name: "AI-Powered Job Matcher",
    repo: "https://github.com/Sayemm/job-matcher",
    stack: "Golang · Python · React · PostgreSQL · Docker",
    points: [
      "Modular monolith on DDD principles for ML-based resume-to-job matching, K-means clustering over job posts.",
      "REST API integrating Python ML services for real-time TF-IDF vectorization and matching.",
      "All services containerized, multi-container deployment managed with Docker Compose.",
    ],
  },
  {
    name: "E-commerce Backend API",
    repo: "https://github.com/Sayemm/go-commerce",
    stack: "Golang · PostgreSQL · Docker",
    points: [
      "REST API with JWT auth, shopping cart and order management.",
      "Concurrent validation with goroutines and a background job processor built on worker pools.",
      "Clean architecture and DDD boundaries; full stack containerized with Compose.",
    ],
  },
];

export const education = [
  {
    degree: "M.Sc. Computer Science — Data Science",
    detail: "University of Regina · Sep 2023 – Apr 2025",
  },
  {
    degree: "B.Sc. Computer Science & Engineering",
    detail: "CUET, Chattogram · Mar 2017 – Sep 2022",
  },
];

/** Same split as the hero lede — copy here, markup in the page, so an entry
 *  can carry a link without this file needing JSX. */
export type AlsoItem = {
  before: string;
  link?: { label: string; href: string };
  after?: string;
};

export const also: AlsoItem[] = [
  {
    before: "Published ",
    link: {
      label:
        "“Friend Recommendation System Based on Heterogeneous Data from Social Network”",
      href: "https://link.springer.com/chapter/10.1007/978-981-99-1435-7_47",
    },
    after: ".",
  },
  {
    before:
      "Competitive programming on LeetCode, Codeforces, CodeChef, LightOJ and UVA.",
  },
  {
    before:
      "Web Development Coordinator, CUET Computer Club; member of CUET Debating Society.",
  },
];

export const closing = {
  statement: "Building backend systems, and learning in the open. Let's talk.",
  email: "mofakhkharul.cuet@gmail.com",
  github: "https://github.com/Sayemm",
  linkedin: "https://linkedin.com/in/mofakh-kharul/",
  place: "mofakh.com · Regina, SK",
};

export const topicsBandNote =
  "Notes are written as I learn, not after. Some are finished, some are outlines waiting to be filled in — that state is shown on every list.";
