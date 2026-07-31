import type { MetadataRoute } from "next";
import { allNotes, sortedTopics } from "@/lib/notes";

const SITE = "https://mofakh.com";

/** Derived from the content files, like every other list on the site — adding
 *  an .mdx note puts it in the sitemap with no further edit. */
export default function sitemap(): MetadataRoute.Sitemap {
  const notes = allNotes();

  const newest = notes
    .map((n) => n.date)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1);

  return [
    { url: SITE, lastModified: newest, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/notes`, lastModified: newest, changeFrequency: "weekly", priority: 0.8 },
    ...sortedTopics().map((t) => ({
      url: `${SITE}/notes/${t.id}`,
      lastModified: newest,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...notes.map((n) => ({
      url: `${SITE}/notes/${n.topicId}/${n.slug}`,
      lastModified: n.date ?? undefined,
      changeFrequency: "monthly" as const,
      // Outlines are honest placeholders; rank the written notes above them.
      priority: n.status === "written" ? 0.7 : 0.3,
    })),
  ];
}
