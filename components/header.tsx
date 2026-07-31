import Link from "next/link";
import { noteCount } from "@/lib/notes";

const NAV = [
  { label: "Profile", href: "/" },
  { label: "Topics", href: "/#topics" },
  { label: "Recent", href: "/#recent" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-rule bg-ground">
      <div className="mx-auto flex max-w-[1280px] items-baseline gap-4 px-5 sm:px-8 py-[14px] sm:gap-8">
        <Link
          href="/"
          className="text-[17px] font-extrabold tracking-[-0.02em] text-ink hover:text-ink"
        >
          MOFAKH<span className="text-accent">.</span>COM
        </Link>
        <div className="flex-1" />
        <nav className="flex items-baseline gap-4 sm:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[12px] font-semibold tracking-[0.08em] uppercase text-ink hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="hidden font-mono text-[11px] text-neutral-600 sm:inline">
          {noteCount()} notes
        </span>
      </div>
    </header>
  );
}
