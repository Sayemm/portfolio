import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotesShell } from "@/components/notes-shell";
import {
  sortedTopics,
  getTopic,
  notesForTopic,
  topicCounts,
  formatDate,
} from "@/lib/notes";

type Params = { topic: string };

export function generateStaticParams() {
  return sortedTopics().map((t) => ({ topic: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { topic: topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) return {};
  return { title: topic.name, description: topic.blurb };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { topic: topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  const notes = notesForTopic(topicId);
  const counts = topicCounts(topicId);

  return (
    <NotesShell topicId={topicId} activeSlug={null}>
      <Link
        href="/"
        className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent-700"
      >
        ← Back to profile
      </Link>

      <div className="mt-7 mb-3.5 font-mono text-[11px] tracking-[0.12em] uppercase text-accent">
        Topic
      </div>
      <h1 className="mb-[18px] max-w-[26ch] text-[46px] leading-[1.05] font-extrabold tracking-[-0.03em] text-pretty">
        {topic.name}
      </h1>
      <p className="mb-5 max-w-[62ch] text-[20px] leading-[1.5] text-pretty">
        {topic.blurb}
      </p>
      <div className="flex gap-[18px] border-b-2 border-rule pb-[22px] font-mono text-[11px] text-neutral-600">
        <span className="text-accent-700">
          {counts.written} / {counts.total} written
        </span>
      </div>

      <div className="pt-[30px]">
        {notes.map((note, i) => (
          <Link
            key={note.slug}
            href={`/notes/${topicId}/${note.slug}`}
            className="grid grid-cols-[48px_1fr] items-baseline gap-x-5 gap-y-1 border-b border-rule-soft py-4 text-ink hover:bg-surface hover:text-ink rail:grid-cols-[48px_1fr_110px_80px]"
          >
            <span className="font-mono text-[11px] text-neutral-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[18px] font-semibold tracking-[-0.01em] text-pretty">
              {note.title}
            </span>
            <span className="col-start-2 flex gap-4 font-mono text-[11px] text-neutral-600 rail:col-start-auto rail:block">
              {note.status === "written" ? formatDate(note.date) : "outline"}
              <span className="rail:hidden">
                {note.status === "written" ? `${note.minutes} min` : ""}
              </span>
            </span>
            <span className="hidden text-right font-mono text-[11px] text-neutral-600 rail:block">
              {note.status === "written" ? `${note.minutes} min` : "—"}
            </span>
          </Link>
        ))}
      </div>
    </NotesShell>
  );
}
