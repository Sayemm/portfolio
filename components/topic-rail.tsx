"use client";

import Link from "next/link";
import { useState } from "react";

export type RailNote = { slug: string; title: string; meta: string };

type Props = {
  notes: RailNote[];
  activeTopicId: string;
  activeTopicName: string;
  activeSlug: string | null;
};

export function TopicRail({
  notes,
  activeTopicId,
  activeTopicName,
  activeSlug,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-2 border-rule pt-7 pb-6 rail:border-r-2 rail:border-b-0 rail:pr-6 rail:pb-16">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between border border-rule px-3 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-ink rail:hidden"
      >
        <span>
          {activeTopicName} — notes
        </span>
        <span aria-hidden="true">{open ? "×" : "+"}</span>
      </button>

      <div
        className={`${open ? "block" : "hidden"} pt-6 rail:sticky rail:top-[76px] rail:block rail:pt-0`}
      >
        <div className="mb-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-neutral-600">
          {activeTopicName} — notes
        </div>
        <div className="flex flex-col">
          {notes.map((note) => {
            const active = note.slug === activeSlug;
            return (
              <Link
                key={note.slug}
                href={`/notes/${activeTopicId}/${note.slug}`}
                onClick={() => setOpen(false)}
                className={`block border-l-2 py-2.5 pr-2 pl-3 text-ink hover:bg-surface hover:text-ink ${
                  active
                    ? "border-accent bg-surface"
                    : "border-rule-soft bg-transparent"
                }`}
              >
                <div
                  className={`text-[14px] leading-[1.35] text-pretty ${
                    active ? "font-extrabold" : "font-normal"
                  }`}
                >
                  {note.title}
                </div>
                <div className="mt-1 font-mono text-[10px] text-neutral-600">
                  {note.meta}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
