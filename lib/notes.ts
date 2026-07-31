import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { topics, type Topic } from "@/content/topics";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type NoteStatus = "written" | "outline";

export type Note = {
  topicId: string;
  slug: string;
  title: string;
  date: string | null;
  status: NoteStatus;
  minutes: number | null;
  lead: string;
  outline: string[];
  order: number;
  body: string;
};

export type Heading = { id: string; text: string };

/** YAML parses an unquoted `2026-07-18` into a UTC Date, not a string. */
function toIsoDate(value: unknown): string | null {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return null;
}

function readTopicNotes(topic: Topic): Note[] {
  const dir = path.join(CONTENT_DIR, topic.id);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        topicId: topic.id,
        slug: file.replace(/\.mdx$/, ""),
        title: data.title as string,
        date: toIsoDate(data.date),
        status: (data.status as NoteStatus) ?? "outline",
        minutes: typeof data.minutes === "number" ? data.minutes : null,
        lead: (data.lead as string) ?? "",
        outline: (data.outline as string[]) ?? [],
        order: (data.order as number) ?? 0,
        body: content,
      };
    })
    .sort((a, b) => a.order - b.order);
}

let cache: Note[] | null = null;

export function allNotes(): Note[] {
  if (!cache) {
    cache = topics
      .slice()
      .sort((a, b) => a.order - b.order)
      .flatMap(readTopicNotes);
  }
  return cache;
}

export function sortedTopics(): Topic[] {
  return topics.slice().sort((a, b) => a.order - b.order);
}

export function getTopic(topicId: string): Topic | undefined {
  return topics.find((t) => t.id === topicId);
}

export function notesForTopic(topicId: string): Note[] {
  return allNotes().filter((n) => n.topicId === topicId);
}

export function getNote(topicId: string, slug: string): Note | undefined {
  return allNotes().find((n) => n.topicId === topicId && n.slug === slug);
}

export function noteCount(): number {
  return allNotes().length;
}

export function topicCounts(topicId: string): { written: number; total: number } {
  const notes = notesForTopic(topicId);
  return {
    written: notes.filter((n) => n.status === "written").length,
    total: notes.length,
  };
}

/** Written notes only, newest first. */
export function recentNotes(limit = 8): Note[] {
  return allNotes()
    .filter((n) => n.status === "written")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, limit);
}

export function neighbours(topicId: string, slug: string) {
  const notes = notesForTopic(topicId);
  const i = notes.findIndex((n) => n.slug === slug);
  return { prev: notes[i - 1] ?? null, next: notes[i + 1] ?? null };
}

/** h2s in document order, slugged the same way rehype-slug will slug them. */
export function headings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const found: Heading[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) found.push({ id: slugger.slug(m[1]), text: m[1] });
  }
  return found;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(date: string | null): string {
  if (!date) return "unwritten";
  const [y, m, d] = date.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}
