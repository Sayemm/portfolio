"use client";

import { useEffect, useState, type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
  "data-raw"?: string;
};

export function CodeBlock({
  children,
  className,
  "data-language": language,
  "data-raw": raw,
  ...rest
}: Props) {
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
    if (!raw) return;
    // The clipboard can refuse (permissions policy, insecure context); leave
    // the label alone rather than claiming a copy that did not happen.
    navigator.clipboard.writeText(raw).then(
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
      <pre
        {...rest}
        className={`${className ?? ""} overflow-x-auto px-3 py-[14px] font-mono text-[13px] leading-[1.7] whitespace-pre`}
      >
        {children}
      </pre>
    </div>
  );
}
