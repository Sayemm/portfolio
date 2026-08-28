/** Box-and-arrow diagrams as real elements rather than ASCII art.
 *
 *  ASCII diagrams have to be aligned by counting characters, break the moment
 *  a label is edited, and overflow into a horizontal scroll on a phone. These
 *  reuse the CodeBlock frame — 2px rule, mono header, zero radius — so a
 *  diagram reads as a sibling of the code blocks around it, and they reflow
 *  from a row into a column at narrow widths instead of scrolling.
 */

export function Diagram({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mb-[26px] max-w-[66ch] border-2 border-rule bg-surface">
      {title ? (
        <figcaption className="border-b border-rule-soft px-[10px] py-[7px] font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-600">
          {title}
        </figcaption>
      ) : null}
      <div className="flex flex-col gap-3 px-4 py-5">{children}</div>
    </figure>
  );
}

/** A row of nodes and arrows. Becomes a column below `mid`. */
export function DiagramRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-stretch gap-3 mid:flex-row mid:items-center">
      {children}
    </div>
  );
}

export function DiagramNode({
  title,
  sub,
  items,
}: {
  title: string;
  sub?: string;
  /** Stacked contents — a queue's messages, a list's entries. Comma-separated
   *  rather than an array: an expression attribute (`items={[...]}`) does not
   *  survive the MDX pipeline, so authors write `items="msg3, msg2, msg1"`. */
  items?: string;
}) {
  const entries =
    items
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  return (
    <div className="flex-1 border border-rule-hairline bg-ground px-3.5 py-3">
      <div className="text-[14px] leading-[1.3] font-semibold text-pretty">
        {title}
      </div>
      {sub ? (
        <div className="mt-1 font-mono text-[10px] leading-[1.4] text-neutral-600 text-pretty">
          {sub}
        </div>
      ) : null}
      {entries.length ? (
        <div className="mt-2.5 flex flex-col gap-1">
          {entries.map((item) => (
            <div
              key={item}
              className="border border-rule-soft bg-surface px-2 py-1 font-mono text-[11px] leading-[1.3]"
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const ALIGN = {
  start: "mid:justify-start",
  center: "mid:justify-center",
  end: "mid:justify-end",
} as const;

export function DiagramArrow({
  label,
  down = false,
  align = "center",
}: {
  label?: string;
  /** A vertical connector between two rows rather than between two nodes. */
  down?: boolean;
  align?: keyof typeof ALIGN;
}) {
  if (down) {
    return (
      <div className={`flex items-center gap-2 ${ALIGN[align]}`}>
        {label ? (
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-accent-700">
            {label}
          </span>
        ) : null}
        <span aria-hidden="true" className="font-mono text-[13px] text-neutral-600">
          ↓
        </span>
      </div>
    );
  }

  return (
    // Fixed gutter so a longer label ("views" vs "HTTP") cannot make one row's
    // boxes a few pixels narrower than the row above it.
    <div className="flex flex-none items-center justify-center gap-1.5 mid:w-[72px] mid:flex-col mid:gap-0.5">
      {label ? (
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-accent-700">
          {label}
        </span>
      ) : null}
      {/* The arrow turns with the layout: rightwards in a row, down in a column. */}
      <span aria-hidden="true" className="font-mono text-[13px] text-neutral-600">
        <span className="mid:hidden">↓</span>
        <span className="hidden mid:inline">→</span>
      </span>
    </div>
  );
}
