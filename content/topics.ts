export type Topic = {
  id: string;
  name: string;
  blurb: string;
  order: number;
};

export const topics: Topic[] = [
  {
    id: "csharp",
    name: "C#",
    blurb: "Language semantics — memory, async, immutability.",
    order: 1,
  },
  {
    id: "dotnet",
    name: ".NET",
    blurb: "ASP.NET, EF Core and the Azure pieces around them.",
    order: 2,
  },
  {
    id: "docker",
    name: "Docker",
    blurb: "Images, layers, Compose and the .NET build story.",
    order: 3,
  },
  {
    id: "sql",
    name: "SQL",
    blurb: "Indexes, plans, isolation and multi-tenant data.",
    order: 4,
  },
  {
    id: "networking",
    name: "Networking",
    blurb: "What happens between a request and a response.",
    order: 5,
  },
  {
    id: "system-design",
    name: "System design",
    blurb: "Boundaries, messaging and failure modes.",
    order: 6,
  },
];
