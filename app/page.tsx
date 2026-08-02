import Image from "next/image";
import Link from "next/link";
import {
  hero,
  meta,
  languages,
  writingAbout,
  socials,
  type Social,
  stack,
  jobs,
  projects,
  education,
  also,
  closing,
  topicsBandNote,
} from "@/content/profile";
import {
  sortedTopics,
  topicCounts,
  notesForTopic,
  recentNotes,
  noteCount,
  formatDate,
} from "@/lib/notes";

const RECENT_LIMIT = 8;

function Shell({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="mx-auto max-w-[1280px] scroll-mt-[60px] px-5 sm:px-8">
      {children}
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-baseline gap-5 pt-12 pb-6">
      <h2 className="m-0 text-[32px] leading-none font-extrabold tracking-[-0.02em]">
        {title}
      </h2>
    </div>
  );
}

/** Glyph paths inlined — a handful of icons do not warrant a dependency, and
 *  Lucide has deprecated its brand marks. Lucide's glyphs are stroked outlines;
 *  LeetCode and Codeforces only exist as solid brand marks, so each icon
 *  carries its own render mode. */
const ICONS: Record<
  Social["icon"],
  { filled?: boolean; paths: React.ReactNode }
> = {
  mail: {
    paths: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
  github: {
    paths: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
  },
  linkedin: {
    paths: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  leetcode: {
    filled: true,
    paths: (
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    ),
  },
  codeforces: {
    filled: true,
    paths: (
      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
    ),
  },
};

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      {socials.map((item) => {
        const icon = ICONS[item.icon];
        return (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            {...(item.external ? { target: "_blank", rel: "noreferrer" } : null)}
            style={{ "--brand": item.color } as React.CSSProperties}
            className="flex h-9 w-9 flex-none items-center justify-center border border-rule-hairline text-[var(--brand)] hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-ground"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              aria-hidden="true"
              {...(icon.filled
                ? { fill: "currentColor" }
                : {
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 1.7,
                    strokeLinecap: "round" as const,
                    strokeLinejoin: "round" as const,
                  })}
            >
              {icon.paths}
            </svg>
          </a>
        );
      })}
    </div>
  );
}

/** The topics band draws its grid with per-cell borders, so a part-full last
 *  row would leave the bottom rule stopping short. These empty cells carry the
 *  same rules to close it. Column count differs per breakpoint, so each filler
 *  only shows at the widths that actually need it. */
function GridFillers({ count }: { count: number }) {
  const needAt = (cols: number) => (cols - (count % cols)) % cols;
  const two = needAt(2);
  const three = needAt(3);
  const fillers = Math.max(two, three);

  return (
    <>
      {Array.from({ length: fillers }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={[
            "hidden border-b border-l border-rule-invert-soft",
            i < two ? "mid:block" : "mid:hidden",
            i < three ? "rail:block" : "rail:hidden",
          ].join(" ")}
        />
      ))}
    </>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {items.map((point) => (
        <li
          key={point}
          className="border-l-2 border-rule-soft pl-4 text-[15px] leading-[1.5] text-pretty"
        >
          {point}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const topics = sortedTopics();
  const recent = recentNotes(RECENT_LIMIT);
  const total = noteCount();

  return (
    <main>
      {/* a. Hero */}
      <Shell>
        <div className="grid grid-cols-1 border-b-2 border-rule rail:grid-cols-[1.55fr_1fr]">
          <div className="pt-16 pb-14 rail:border-r-2 rail:border-rule rail:pr-10">
            <div className="mb-7 font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
              {hero.kicker}
            </div>
            <h1 className="mb-7 text-[56px] leading-[0.92] font-extrabold tracking-[-0.035em] rail:text-[96px]">
              {hero.firstName}
              <br />
              {hero.lastName}
            </h1>
            <p className="mb-8 max-w-[34ch] text-[21px] leading-[1.45] text-pretty">
              {hero.lede.before}
              {/* Ink text with a 2px accent rule beneath — the accent carries
                  the emphasis without breaking the sentence into a red word. */}
              <a
                href={hero.lede.link.href}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-600"
              >
                {hero.lede.link.label}
              </a>
              {hero.lede.after}
            </p>
            <p className="mb-9 max-w-[52ch] text-[15px] leading-[1.6] text-neutral-700 text-pretty">
              {hero.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#topics"
                className="inline-flex items-center gap-2 bg-accent px-[18px] py-3 text-[14px] font-extrabold text-ground hover:bg-accent-600 hover:text-ground"
              >
                Read the notes →
              </Link>
              <Link
                href="#experience"
                className="inline-flex items-center gap-2 border border-rule px-[18px] py-3 text-[14px] font-extrabold text-ink hover:bg-[rgba(32,30,29,0.07)] hover:text-ink"
              >
                Experience
              </Link>
              <a
                href="/resume.pdf"
                download="Mofakh_Islam_Software_Developer.pdf"
                className="inline-flex items-center gap-2 border border-rule px-[18px] py-3 text-[14px] font-extrabold text-ink hover:bg-[rgba(32,30,29,0.07)] hover:text-ink"
              >
                Résumé ↓
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-end gap-3.5 border-b border-rule-soft pt-16 pb-[22px] rail:pl-6">
              {/* The ring lives on the wrapper, not the image, so the grayscale
                  filter cannot tint it and overflow clips the photo to the circle. */}
              <span className="block h-[140px] w-[140px] flex-none overflow-hidden rounded-[50%] shadow-[0_0_0_2px_#201e1d]">
                <Image
                  src="/portrait.jpg"
                  alt="Mofakh Islam"
                  width={140}
                  height={140}
                  priority
                  sizes="140px"
                  className="h-[140px] w-[140px] object-cover grayscale contrast-[1.08]"
                />
              </span>
              <SocialLinks />
            </div>
            {meta.map((cell) => (
              <div
                key={cell.label}
                className="border-b border-rule-soft py-5 rail:pl-6"
              >
                <div className="mb-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-600">
                  {cell.label}
                </div>
                <div className="text-[15px] font-semibold">{cell.value}</div>
                <div className="text-[13px] text-neutral-700">{cell.detail}</div>
              </div>
            ))}
            <div className="border-b border-rule-soft py-5 rail:pl-6">
              <div className="mb-2 font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-600">
                Languages
              </div>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <span
                    key={lang.label}
                    style={{
                      backgroundColor: lang.bg,
                      color: lang.fg,
                      borderRadius: "999px",
                      padding: "4px 11px",
                    }}
                    className="font-mono text-[11px] font-semibold"
                  >
                    {lang.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 pt-5 pb-6 rail:pl-6">
              <div className="mb-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-600">
                Writing about
              </div>
              <div className="flex flex-wrap gap-1.5">
                {writingAbout.map((topic) => {
                  const first = notesForTopic(topic.topicId)[0];
                  return (
                    <Link
                      key={topic.label}
                      href={`/notes/${topic.topicId}/${first.slug}`}
                      style={
                        {
                          "--chip-bg": topic.bg,
                          color: topic.fg,
                          borderRadius: "999px",
                          padding: "4px 11px",
                        } as React.CSSProperties
                      }
                      className="bg-[var(--chip-bg)] font-mono text-[11px] font-semibold transition-colors hover:bg-transparent"
                    >
                      {topic.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Shell>

      {/* b. Stack strip */}
      <Shell>
        <div className="grid grid-cols-2 border-b-2 border-rule rail:grid-cols-4">
          {stack.map((cell) => (
            <div key={cell.label} className="py-[18px] pr-5">
              <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-600">
                {cell.label}
              </div>
              <div className="mt-1 text-[14px]">{cell.value}</div>
            </div>
          ))}
        </div>
      </Shell>

      {/* c. Experience */}
      <Shell id="experience">
        <SectionHeading title="Experience" />
        {jobs.map((job) => (
          <div
            key={job.company}
            className="grid grid-cols-1 gap-6 border-t-2 border-rule py-[26px] rail:grid-cols-[220px_1.1fr_1.6fr] rail:gap-8"
          >
            <div>
              <div className="font-mono text-[12px] text-ink">{job.dates}</div>
              <div className="mt-1.5 font-mono text-[11px] text-neutral-600">
                {job.place}
              </div>
            </div>
            <div>
              <div className="text-[20px] font-extrabold tracking-[-0.01em]">
                {job.company}
              </div>
              <div className="mt-1 text-[14px] text-neutral-700">{job.role}</div>
              <div className="mt-2 font-mono text-[11px] text-accent-700">
                {job.stack}
              </div>
            </div>
            <Bullets items={job.points} />
          </div>
        ))}
      </Shell>

      {/* d. Projects */}
      <Shell>
        <div className="border-t-2 border-rule">
          <SectionHeading title="Projects" />
        </div>
        <div className="grid grid-cols-1 border-t-2 border-rule rail:grid-cols-2 rail:gap-x-10">
          {projects.map((project) => (
            <div key={project.name} className="pt-7 pb-8">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-[22px] font-extrabold tracking-[-0.01em]">
                  {project.name}
                </div>
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-rule-hairline px-[9px] py-[5px] font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-accent-700 uppercase hover:border-accent hover:bg-[rgba(236,48,19,0.12)] hover:text-accent"
                  >
                    GitHub ↗
                  </a>
                ) : null}
              </div>
              <div className="mt-2 mb-4 font-mono text-[11px] text-accent-700">
                {project.stack}
              </div>
              <Bullets items={project.points} />
            </div>
          ))}
        </div>
      </Shell>

      {/* e. Education & activities */}
      <Shell>
        <div className="mt-12 border-t-2 border-rule">
          <SectionHeading title="Education &amp; activities" />
        </div>
        <div className="grid grid-cols-1 border-t-2 border-rule rail:grid-cols-2 rail:gap-x-10">
          <div className="pt-8 pb-10">
            <h3 className="mb-5 text-[20px] font-extrabold">Degrees</h3>
            {education.map((item) => (
              <div
                key={item.degree}
                className="border-t border-rule-soft py-3.5"
              >
                <div className="text-[16px] font-semibold">{item.degree}</div>
                <div className="text-[14px] text-neutral-700">{item.detail}</div>
              </div>
            ))}
          </div>
          <div className="pt-8 pb-10">
            <h3 className="mb-5 text-[20px] font-extrabold">Also</h3>
            <ul className="m-0 list-none p-0">
              {also.map((item) => (
                <li
                  key={item.before}
                  className="border-t border-rule-soft py-3 text-[15px] leading-[1.5]"
                >
                  {item.before}
                  {item.link ? (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[4px] transition-colors hover:text-accent hover:decoration-accent-600"
                    >
                      {item.link.label}
                    </a>
                  ) : null}
                  {item.after}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Shell>

      {/* f. Learning topics */}
      <section id="topics" className="mt-2 scroll-mt-[52px] bg-ink text-ground">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end gap-6 pt-14 pb-7">
            <h2 className="m-0 text-[44px] font-extrabold tracking-[-0.03em] text-ground">
              Learning topics
            </h2>
            <span className="pb-2 font-mono text-[11px] text-accent-400">
              Pick a topic, read left to right
            </span>
          </div>
          <div className="grid grid-cols-1 border-t-2 border-r border-t-rule-invert border-r-rule-invert-soft mid:grid-cols-2 rail:grid-cols-3">
            {topics.map((topic) => {
              const counts = topicCounts(topic.id);
              const first = notesForTopic(topic.id)[0];
              return (
                <Link
                  key={topic.id}
                  href={`/notes/${topic.id}/${first.slug}`}
                  className="block border-b border-l border-rule-invert-soft px-6 pt-[26px] pb-[30px] text-ground hover:bg-accent-wash hover:text-ground"
                >
                  <div className="flex justify-start">
                    <span className="font-mono text-[11px] text-ground-60">
                      {counts.written} / {counts.total} written
                    </span>
                  </div>
                  <div className="mt-3.5 mb-2 text-[28px] font-extrabold tracking-[-0.02em]">
                    {topic.name}
                  </div>
                  <div className="max-w-[30ch] text-[14px] leading-[1.5] text-ground-70 text-pretty">
                    {topic.blurb}
                  </div>
                  <div className="mt-[18px] font-mono text-[11px] text-accent-500">
                    Open →
                  </div>
                </Link>
              );
            })}
            <GridFillers count={topics.length} />
          </div>
          <div className="pt-10 pb-14 text-[15px] text-ground-70">
            {topicsBandNote}
          </div>
        </div>
      </section>

      {/* g. Recent notes */}
      <Shell id="recent">
        <SectionHeading title="Recent notes" />
        <div className="border-t-2 border-rule">
          {recent.map((note) => {
            const topic = topics.find((t) => t.id === note.topicId)!;
            return (
              <Link
                key={`${note.topicId}/${note.slug}`}
                href={`/notes/${note.topicId}/${note.slug}`}
                className="grid grid-cols-1 items-baseline gap-x-5 gap-y-1 border-b border-rule-soft py-4 text-ink hover:bg-surface hover:text-ink rail:grid-cols-[1.7fr_160px_90px_80px]"
              >
                <span className="text-[18px] font-semibold tracking-[-0.01em]">
                  {note.title}
                </span>
                <span className="flex gap-4 font-mono text-[11px] rail:block">
                  <span className="tracking-[0.08em] text-accent-700 uppercase">
                    {topic.name}
                  </span>
                  <span className="text-neutral-600 rail:hidden">
                    {formatDate(note.date)}
                  </span>
                  <span className="text-neutral-600 rail:hidden">
                    {note.minutes} min
                  </span>
                </span>
                <span className="hidden font-mono text-[11px] text-neutral-600 rail:block">
                  {formatDate(note.date)}
                </span>
                <span className="hidden text-right font-mono text-[11px] text-neutral-600 rail:block">
                  {note.minutes} min
                </span>
              </Link>
            );
          })}
        </div>
        <div className="pt-11 pb-18">
          <a
            href="#topics"
            className="font-mono text-[12px] tracking-[0.08em] uppercase text-accent-700"
          >
            See all {total} notes by topic →
          </a>
        </div>
      </Shell>

      {/* h. Closing banner */}
      <footer className="bg-accent text-ground">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 py-14">
          <div className="max-w-[26ch] text-[40px] leading-[1.05] font-extrabold tracking-[-0.03em]">
            {closing.statement}
          </div>
          <div className="mt-8 flex flex-wrap gap-7 font-mono text-[12px]">
            <a
              href={`mailto:${closing.email}`}
              className="text-ground hover:text-ground"
            >
              {closing.email}
            </a>
            <a href={closing.github} className="text-ground hover:text-ground">
              GitHub
            </a>
            <a href={closing.linkedin} className="text-ground hover:text-ground">
              LinkedIn
            </a>
            <span className="text-ground-70">{closing.place}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
