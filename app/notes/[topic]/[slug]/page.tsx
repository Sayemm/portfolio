import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotesShell } from "@/components/notes-shell";
import { NoteBody } from "@/components/note-body";
import {
  allNotes,
  getNote,
  getTopic,
  headings,
  neighbours,
  formatDate,
} from "@/lib/notes";

type Params = { topic: string; slug: string };

export function generateStaticParams() {
  return allNotes().map((n) => ({ topic: n.topicId, slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { topic, slug } = await params;
  const note = getNote(topic, slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.lead || undefined,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { topic: topicId, slug } = await params;
  const note = getNote(topicId, slug);
  const topic = getTopic(topicId);
  if (!note || !topic) notFound();

  const outline = note.status === "written" ? headings(note.body) : [];
  const { prev, next } = neighbours(topicId, slug);

  return (
    <NotesShell topicId={topicId} activeSlug={slug} outline={outline}>
      <Link
        href="/"
        className="font-mono text-[11px] tracking-[0.08em] uppercase text-accent-700"
      >
        ← Back to profile
      </Link>

      <div className="mt-7 mb-3.5 font-mono text-[11px] tracking-[0.12em] uppercase text-accent">
        {topic.name}
      </div>
      <h1 className="mb-[18px] max-w-[26ch] text-[46px] leading-[1.05] font-extrabold tracking-[-0.03em] text-pretty">
        {note.title}
      </h1>
      <div className="flex flex-wrap gap-[18px] border-b-2 border-rule pb-[22px] font-mono text-[11px] text-neutral-600">
        <span>{formatDate(note.date)}</span>
        <span>{note.status === "written" ? `${note.minutes} min read` : "—"}</span>
        <span className="text-accent-700">
          {note.status === "written" ? "Written" : "Outline"}
        </span>
      </div>

      <div className="pt-[30px]">
        <NoteBody note={note} />
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 border-t-2 border-rule pt-5">
        <div>
          <div className="mb-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-600">
            Previous
          </div>
          {prev ? (
            <Link
              href={`/notes/${topicId}/${prev.slug}`}
              className="text-[17px] font-semibold text-ink text-pretty hover:text-accent"
            >
              {prev.title}
            </Link>
          ) : (
            <div className="text-[17px] font-semibold text-neutral-600 text-pretty">
              Start of this topic
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="mb-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-600">
            Next
          </div>
          {next ? (
            <Link
              href={`/notes/${topicId}/${next.slug}`}
              className="text-[17px] font-semibold text-ink text-pretty hover:text-accent"
            >
              {next.title}
            </Link>
          ) : (
            <div className="text-[17px] font-semibold text-neutral-600 text-pretty">
              End of this topic
            </div>
          )}
        </div>
      </div>
    </NotesShell>
  );
}
