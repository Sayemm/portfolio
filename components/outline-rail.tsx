"use client";

import type { MouseEvent } from "react";
import type { Heading } from "@/lib/notes";

const HEADER_OFFSET = 72;

export function OutlineRail({ outline }: { outline: Heading[] }) {
  function jump(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const target = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    const before = window.scrollY;
    try {
      window.scrollTo({ top: target, behavior: "smooth" });
    } catch {
      // older engines reject the options form; the fallback below covers it
    }
    // A plain hash jump lands under the sticky header, and smooth scrolling is
    // off under prefers-reduced-motion — so land it directly if nothing moved.
    requestAnimationFrame(() => {
      if (window.scrollY === before) window.scrollTo(0, target);
    });
  }

  return (
    <div className="sticky top-[76px]">
      <div className="mb-3 font-mono text-[10px] tracking-[0.12em] uppercase text-neutral-600">
        On this page
      </div>
      <div className="flex flex-col">
        {outline.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(event) => jump(event, h.id)}
            className="border-t border-rule-soft py-2 text-[13px] leading-[1.4] text-neutral-700 hover:text-accent"
          >
            {h.text}
          </a>
        ))}
      </div>
    </div>
  );
}
