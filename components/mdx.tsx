import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";

export function NoteToSelf({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 max-w-[66ch] border-l-[3px] border-accent bg-surface px-5 py-4">
      <div className="mb-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-accent-700">
        Note to self
      </div>
      <div className="text-[15px] leading-[1.6] text-pretty">{children}</div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  NoteToSelf,
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
