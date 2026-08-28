import { Children, isValidElement } from "react";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";
import {
  Diagram,
  DiagramRow,
  DiagramNode,
  DiagramArrow,
} from "@/components/diagram";

/** A labelled aside. `NoteToSelf` is the original special case; long-form
 *  chapters also want "Why this matters", "Key takeaway" and the like without
 *  spending an h2 on each — the outline rail should stay a table of contents. */
export function Callout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 max-w-[66ch] border-l-[3px] border-accent bg-surface px-5 py-4">
      <div className="mb-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-accent-700">
        {label}
      </div>
      <div className="text-[15px] leading-[1.6] text-pretty">{children}</div>
    </div>
  );
}

export function NoteToSelf({ children }: { children: React.ReactNode }) {
  return <Callout label="Note to self">{children}</Callout>;
}

/** `![alt](/images/…)` in a note. Plain <img> rather than next/image because
 *  markdown carries no dimensions; the file lives in public/ and is served
 *  as-is. Diagrams keep their colour — the grayscale rule is for photography. */
function MdxImage({ src, alt }: { src?: string; alt?: string }) {
  if (typeof src !== "string") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className="mb-6 block h-auto max-w-full border-2 border-rule"
    />
  );
}

export const mdxComponents: MDXComponents = {
  NoteToSelf,
  Callout,
  Diagram,
  DiagramRow,
  DiagramNode,
  DiagramArrow,
  img: MdxImage,
  h2: (props) => (
    <h2
      {...props}
      className="mt-[42px] mb-[14px] scroll-mt-[72px] border-t-2 border-rule pt-[14px] text-[26px] font-extrabold tracking-[-0.02em]"
    />
  ),
  p: (props) => {
    // Markdown wraps a lone image in a paragraph. Let it stand on its own so
    // it does not inherit body-text margins on top of the figure's own.
    const kids = Children.toArray(props.children);
    if (
      kids.length === 1 &&
      isValidElement(kids[0]) &&
      kids[0].type === MdxImage
    ) {
      return <>{kids[0]}</>;
    }
    return (
      <p
        {...props}
        className="mb-5 max-w-[66ch] text-[16px] leading-[1.68] text-pretty"
      />
    );
  },
  // h2 owns the 2px section rule; h3 and h4 step down without one, so the
  // hierarchy reads by size and space rather than by more lines.
  h3: (props) => (
    <h3
      {...props}
      className="mt-9 mb-2.5 scroll-mt-[72px] text-[20px] font-extrabold tracking-[-0.01em]"
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className="mt-7 mb-2 scroll-mt-[72px] text-[17px] font-semibold"
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="mb-6 flex max-w-[66ch] list-none flex-col gap-2.5 p-0"
    />
  ),
  // Ordered lists keep their numbers, so they cannot be flex (markers do not
  // render on flex items) and must drop the bullet-stem the shared li applies.
  ol: (props) => (
    <ol
      {...props}
      className="mb-6 max-w-[66ch] list-decimal space-y-2.5 pl-6 [&>li]:border-l-0 [&>li]:pl-0"
    />
  ),
  li: (props) => (
    <li
      {...props}
      className="border-l-2 border-rule-soft pl-4 text-[16px] leading-[1.6] text-pretty marker:font-mono marker:text-[13px] marker:text-neutral-600"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mb-6 max-w-[66ch] border-l-2 border-rule bg-surface px-5 py-4 text-[15px] leading-[1.6] [&>p]:mb-0 [&>p]:text-[15px] [&>p+p]:mt-2.5"
    />
  ),
  hr: () => <hr className="my-9 max-w-[66ch] border-0 border-t-2 border-rule" />,
  table: (props) => (
    <div className="mb-6 max-w-[66ch] overflow-x-auto">
      <table {...props} className="w-full border-collapse text-[14px]" />
    </div>
  ),
  th: (props) => (
    <th
      {...props}
      className="border-b-2 border-rule px-2 py-2 text-left font-mono text-[11px] tracking-[0.08em] uppercase text-neutral-700"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="border-b border-rule-soft px-2 py-2 align-top text-pretty"
    />
  ),
  strong: (props) => <strong {...props} className="font-semibold" />,
  code: (props) => {
    // Inside a fence the children are Shiki's coloured spans; only a bare
    // string is inline code, and only that should get the tinted chip.
    if (typeof props.children !== "string" || "data-language" in props) {
      return <code {...props} />;
    }
    return (
      <code
        {...props}
        className="border border-rule-soft bg-surface px-[5px] py-[1px] font-mono text-[0.88em]"
      />
    );
  },
  pre: CodeBlock,
  a: (props) => <a {...props} className="underline underline-offset-[3px]" />,
};
