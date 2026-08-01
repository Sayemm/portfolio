import type { Metadata } from "next";
import Link from "next/link";
import { sortedTopics, topicCounts, noteCount } from "@/lib/notes";

export const metadata: Metadata = {
  title: "All notes",
  description: "Every learning topic and how much of it is written.",
};

export default function NotesIndex() {
  const topics = sortedTopics();

  return (
    <main className="mx-auto max-w-[1280px] px-5 sm:px-8">
      <Link
        href="/"
        className="mt-10 inline-block font-mono text-[11px] tracking-[0.08em] uppercase text-accent-700"
      >
        ← Back to profile
      </Link>

      <div className="flex flex-wrap items-baseline gap-5 pt-7 pb-6">
        <h1 className="m-0 text-[46px] leading-none font-extrabold tracking-[-0.03em]">
          All notes
        </h1>
        <span className="font-mono text-[11px] text-neutral-600">
          {noteCount()} notes across {topics.length} topics
        </span>
      </div>

      <div className="grid grid-cols-1 border-t-2 border-rule mid:grid-cols-2 rail:grid-cols-3">
        {topics.map((topic, i) => {
          const counts = topicCounts(topic.id);
          return (
            <Link
              key={topic.id}
              href={`/notes/${topic.id}`}
              className="block border-b border-rule-soft pt-[26px] pr-6 pb-[30px] text-ink hover:bg-surface hover:text-ink mid:border-r"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-accent-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] text-neutral-600">
                  {counts.written} / {counts.total} written
                </span>
              </div>
              <div className="mt-3.5 mb-2 text-[28px] font-extrabold tracking-[-0.02em]">
                {topic.name}
              </div>
              <div className="max-w-[30ch] text-[14px] leading-[1.5] text-neutral-700 text-pretty">
                {topic.blurb}
              </div>
              <div className="mt-[18px] font-mono text-[11px] text-accent-700">
                Open →
              </div>
            </Link>
          );
        })}
      </div>

      <div className="h-24" />
    </main>
  );
}
