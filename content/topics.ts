export type Topic = {
  id: string;
  name: string;
  blurb: string;
  order: number;
  /** Tint for the hero's "Writing about" chip. Every topic needs one — the
   *  chip row is generated from this list, so a new topic appears there
   *  automatically. */
  chip: { bg: string; fg: string };
  /** Outside reading worth keeping. Optional: the rail entry and the
   *  /notes/<topic>/links page appear only for topics that have some. */
  links?: { label: string; href: string }[];
};

export const topics: Topic[] = [
  {
    id: "csharp",
    name: "C#",
    blurb: "Language semantics — memory, async, immutability.",
    order: 1,
    chip: { bg: "#ede4f2", fg: "#5a1c6b" },
  },
  {
    id: "csharp-14",
    name: "C# 14",
    blurb: "What the newest language version actually changes.",
    order: 1.2,
    chip: { bg: "#f9e6f1", fg: "#7c1f5c" },
    links: [
      {
        label: "C# 14 skill path",
        href: "https://app.pluralsight.com/paths/skill/c-14",
      },
    ],
  },
  {
    id: "dotnet",
    name: ".NET",
    blurb: "ASP.NET, EF Core and the Azure pieces around them.",
    order: 2,
    chip: { bg: "#e6e3f6", fg: "#3f2199" },
  },
  {
    id: "docker",
    name: "Docker",
    blurb: "Images, layers, Compose and the .NET build story.",
    order: 3,
    chip: { bg: "#e2e9f7", fg: "#14479e" },
  },
  {
    id: "sql",
    name: "SQL",
    blurb: "Indexes, plans, isolation and multi-tenant data.",
    order: 4,
    chip: { bg: "#f7ecdb", fg: "#8a5400" },
  },
  {
    id: "networking",
    name: "Networking",
    blurb: "What happens between a request and a response.",
    order: 5,
    chip: { bg: "#e0efeb", fg: "#0b5a4e" },
    links: [
      {
        label: "Networking Fundamentals: How data moves through the Internet",
        href: "https://www.practicalnetworking.net/index/networking-fundamentals-how-data-moves-through-the-internet/",
      },
      {
        label: "Why do we need the MAC address when the IP can serve its purpose?",
        href: "https://www.quora.com/Why-do-we-need-the-MAC-address-when-the-IP-can-serve-its-purpose-In-LANs-that-don-t-have-routers-why-do-we-need-to-assign-IPs-that-arent-MAC-sufficient-locally",
      }
    ],
  },
  {
    id: "system-design",
    name: "System design",
    blurb: "Boundaries, messaging and failure modes.",
    order: 6,
    chip: { bg: "#f6e6e4", fg: "#8d3230" },
  },
  {
    id: "dotnet-web-api",
    name: ".NET Web API",
    blurb: "Building HTTP APIs — routing, binding, middleware, auth.",
    order: 2.5,
    chip: { bg: "#e4e7f7", fg: "#26307a" },
  },
  {
    id: "dotnet-inside",
    name: ".NET Inside",
    blurb: "The runtime underneath — CLR, GC, assemblies, hosting.",
    order: .5,
    chip: { bg: "#e4efe0", fg: "#2f5720" },
  },
  {
    id: "csharp-collections",
    name: "C# Collections",
    blurb: "Iteration from first principles — foreach, yield, LINQ, laziness.",
    order: 1.6,
    chip: { bg: "#fae9ec", fg: "#9b1c3d" },
  },
  {
    id: "design-patterns",
    name: "Design Patterns",
    blurb: "The classic patterns, in C# — and when not to reach for them.",
    order: 1.4,
    chip: { bg: "#f2e9df", fg: "#7a4a1c" },
  },
  {
    id: "dotnet-io",
    name: ".NET I/O",
    blurb: "Files, streams, and everything that crosses a process boundary.",
    order: 2.6,
    chip: { bg: "#eae6f0", fg: "#4c3470" },
  },
  {
    id: "jwt",
    name: "JWT",
    blurb: "What is actually in a token, and what signing does and does not prove.",
    order: 2.9,
    chip: { bg: "#f2ead9", fg: "#6b4a05" },
  },
  {
    id: "azure-identity",
    name: "Azure Identity",
    blurb: "Who is calling, and how the token proving it gets there.",
    order: 2.8,
    chip: { bg: "#e3eef0", fg: "#0e5566" },
  },
  {
    id: "azure-queue-storage",
    name: "Azure Queue Storage",
    blurb: "Messages, visibility timeouts and at-least-once delivery.",
    order: 2.7,
    chip: { bg: "#e0edf7", fg: "#0f5a86" },
  },
  {
    id: "misc",
    name: "Miscellaneous",
    blurb: "Everything else worth writing down — tools, shell, odds and ends.",
    // Deliberately last: it is the catch-all, so it should sink on a tie.
    order: 99,
    chip: { bg: "#eceaea", fg: "#4a4545" },
  },
];
