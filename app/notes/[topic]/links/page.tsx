import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotesShell } from "@/components/notes-shell";
import { sortedTopics, getTopic } from "@/lib/notes";

type Params = { topic: string };

// A static `links` segment wins over the sibling [slug] route, so this never
// collides with a note — unless a note is literally slugged "links".
export function generateStaticParams() {
  return sortedTopics()
    .filter((t) => (t.links?.length ?? 0) > 0)
    .map((t) => ({ topic: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { topic: topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) return {};
  return {
    title: `Useful links — ${topic.name}`,
    description: `Outside reading worth keeping for ${topic.name}.`,
  };
}

/** Strip the scheme and any trailing slash, so the source reads as a domain. */
function hostOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export default async function TopicLinksPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { topic: topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  const links = topic.links ?? [];
  if (links.length === 0) notFound();

  return (
    <NotesShell topicId={topicId} activeSlug={null} onLinksPage>
      <Link
        href={`/notes/${topicId}`}
        className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent-700"
      >
        ← Back to {topic.name}
      </Link>

      <div className="mt-7 mb-3.5 font-mono text-[11px] tracking-[0.12em] uppercase text-accent">
        {topic.name}
      </div>
      <h1 className="mb-[18px] max-w-[26ch] text-[46px] leading-[1.05] font-extrabold tracking-[-0.03em] text-pretty">
        Useful links
      </h1>
      <p className="mb-5 max-w-[62ch] text-[20px] leading-[1.5] text-pretty">
        Outside reading I leaned on while working through {topic.name} — kept
        here so it is easy to find again.
      </p>
      <div className="flex gap-[18px] border-b-2 border-rule pb-[22px] font-mono text-[11px] text-neutral-600">
        <span className="text-accent-700">
          {links.length} {links.length === 1 ? "link" : "links"}
        </span>
      </div>

      <div className="pt-[30px]">
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="grid grid-cols-[48px_1fr] items-baseline gap-x-5 gap-y-1 border-b border-rule-soft py-4 text-ink hover:bg-surface hover:text-ink"
          >
            <span className="font-mono text-[11px] text-neutral-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[18px] font-semibold tracking-[-0.01em] text-pretty">
              {link.label}
            </span>
            <span className="col-start-2 font-mono text-[11px] text-accent-700">
              {hostOf(link.href)} ↗
            </span>
          </a>
        ))}
      </div>
    </NotesShell>
  );
}
