import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { mdxComponents, NoteToSelf } from "@/components/mdx";
import { modernist } from "@/lib/shiki-modernist";
import type { Note } from "@/lib/notes";

const prettyCode: Options = {
  theme: modernist,
  keepBackground: false,
};

export function NoteBody({ note }: { note: Note }) {
  const lead = note.lead ? (
    <p className="mb-[26px] max-w-[62ch] text-[20px] leading-[1.5] text-pretty">
      {note.lead}
    </p>
  ) : null;

  if (note.status === "outline") {
    return (
      <>
        {lead}
        <NoteToSelf>
          Not written yet. This is the outline I am working from — it will be
          filled in as I go through the topic.
        </NoteToSelf>
        <ul className="mb-6 flex max-w-[66ch] list-none flex-col gap-2.5 p-0">
          {note.outline.map((item) => (
            <li
              key={item}
              className="border-l-2 border-rule-soft pl-4 text-[16px] leading-[1.6] text-pretty"
            >
              {item}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      {lead}
      <MDXRemote
        source={note.body}
        components={mdxComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCode]],
          },
        }}
      />
    </>
  );
}
