import { OutlineRail } from "@/components/outline-rail";
import { TopicRail, type RailNote } from "@/components/topic-rail";
import {
  notesForTopic,
  getTopic,
  formatDate,
  type Heading,
} from "@/lib/notes";

type Props = {
  topicId: string;
  activeSlug: string | null;
  outline?: Heading[];
  /** True on /notes/<topic>/links, so the rail can mark that entry active. */
  onLinksPage?: boolean;
  children: React.ReactNode;
};

export function NotesShell({
  topicId,
  activeSlug,
  outline,
  onLinksPage,
  children,
}: Props) {
  const topic = getTopic(topicId)!;
  const notes = notesForTopic(topicId);

  const railNotes: RailNote[] = notes.map((n) => ({
    slug: n.slug,
    title: n.title,
    meta:
      n.status === "outline"
        ? "outline"
        : `${formatDate(n.date)} · ${n.minutes} min`,
  }));

  const hasOutline = outline && outline.length > 0;

  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
      <div
        className={`grid grid-cols-1 rail:grid-cols-[250px_minmax(0,1fr)] ${
          outline ? "wide:grid-cols-[250px_minmax(0,1fr)_200px]" : ""
        }`}
      >
        <TopicRail
          notes={railNotes}
          activeTopicId={topic.id}
          activeTopicName={topic.name}
          activeSlug={activeSlug}
          linkCount={topic.links?.length ?? 0}
          onLinksPage={onLinksPage}
        />

        <div className="pt-10 pb-24 rail:px-12">{children}</div>

        {outline ? (
          <div className="hidden border-l-2 border-rule pt-10 pb-16 pl-5 wide:block">
            {hasOutline ? <OutlineRail outline={outline} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
