"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

type Props = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

export function CodeBlock({
  children,
  className,
  "data-language": language,
  ...rest
}: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  // A ```text fence is an ASCII diagram, not source. Same frame, but a Copy
  // button on a picture is noise.
  const isDiagram = language === "text" || language === "plaintext";

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  function copy() {
    // Read the rendered text rather than threading the pre-highlight source
    // through a shiki transformer: rehype-pretty-code emits one span per line
    // separated by newline text nodes, so textContent *is* the original source,
    // and this cannot drift when the highlighting pipeline changes.
    const text = preRef.current?.textContent ?? "";
    if (!text) return;
    // The clipboard can refuse (permissions policy, insecure context); leave
    // the label alone rather than claiming a copy that did not happen.
    navigator.clipboard.writeText(text).then(
      () => setCopied(true),
      () => {},
    );
  }

  return (
    <div className="mb-[26px] max-w-full border-2 border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule-soft px-[10px] py-[7px]">
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-600">
          {isDiagram ? "Diagram" : language}
        </span>
        {isDiagram ? null : (
          <button
            type="button"
            onClick={copy}
            className="cursor-pointer border border-rule-hairline bg-transparent px-[9px] py-1 font-mono text-[10px] tracking-[0.08em] uppercase text-ink transition-colors hover:border-accent hover:bg-[rgba(236,48,19,0.12)]"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      {/* Diagrams opt out of IBM Plex Mono: it has no box-drawing glyphs, so
          ─ │ ┌ ▼ fall back to another face with a different advance width
          (12.4px / 10.93px / 17.32px against Plex's 7.8px cell) and the art
          cannot line up at any character count. The system mono stack carries
          the whole set at one width. Real code keeps Plex Mono. */}
      <pre
        ref={preRef}
        {...rest}
        // Preflight sets a mono family on `code` too, so the inner <code>
        // would override whatever the <pre> asks for — force it to inherit.
        className={`${className ?? ""} overflow-x-auto px-3 py-[14px] text-[13px] leading-[1.7] whitespace-pre [&_code]:[font-family:inherit] ${
          isDiagram ? "font-diagram" : "font-mono"
        }`}
      >
        {children}
      </pre>
    </div>
  );
}
