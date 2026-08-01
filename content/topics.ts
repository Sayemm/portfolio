export type Topic = {
  id: string;
  name: string;
  blurb: string;
  order: number;
  /** Tint for the hero's "Writing about" chip. Every topic needs one — the
   *  chip row is generated from this list, so a new topic appears there
   *  automatically. */
  chip: { bg: string; fg: string };
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
    order: 2.6,
    chip: { bg: "#e4efe0", fg: "#2f5720" },
  },
];
