import { Children, isValidElement } from "react";
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
