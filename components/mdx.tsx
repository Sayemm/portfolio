import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";

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

export const mdxComponents: MDXComponents = {
  NoteToSelf,
  Callout,
  h2: (props) => (
    <h2
      {...props}
      className="mt-[42px] mb-[14px] scroll-mt-[72px] border-t-2 border-rule pt-[14px] text-[26px] font-extrabold tracking-[-0.02em]"
    />
  ),
  p: (props) => (
    <p
      {...props}
      className="mb-5 max-w-[66ch] text-[16px] leading-[1.68] text-pretty"
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="mb-6 flex max-w-[66ch] list-none flex-col gap-2.5 p-0"
    />
  ),
  li: (props) => (
    <li
      {...props}
      className="border-l-2 border-rule-soft pl-4 text-[16px] leading-[1.6] text-pretty"
    />
  ),
  pre: CodeBlock,
  a: (props) => <a {...props} className="underline underline-offset-[3px]" />,
};
