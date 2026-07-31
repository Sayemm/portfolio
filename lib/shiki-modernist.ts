import type { ThemeRegistrationRaw } from "shiki";

const settings: ThemeRegistrationRaw["settings"] = [
  {
    scope: ["comment", "punctuation.definition.comment"],
    settings: { foreground: "#9b9797" },
  },
  {
    scope: [
      "string",
      "string.quoted",
      "punctuation.definition.string",
      "constant.character",
      "constant.character.escape",
    ],
    settings: { foreground: "#605d5d" },
  },
  {
    scope: ["constant.numeric", "constant.language", "constant.other"],
    settings: { foreground: "#444141" },
  },
  {
    scope: [
      "keyword",
      "keyword.control",
      "keyword.operator.new",
      "keyword.operator.expression",
      "storage",
      "storage.type",
      "storage.modifier",
      "support.type",
      "support.type.primitive",
      "entity.name.tag",
      "variable.language",
    ],
    settings: { foreground: "#ae1800" },
  },
];

/** The prototype's code palette as a Shiki theme. rehype-pretty-code only
 *  recognises an inline theme when it carries `tokenColors`, so both keys
 *  are present and identical. */
export const modernist: ThemeRegistrationRaw & {
  tokenColors: ThemeRegistrationRaw["settings"];
} = {
  name: "modernist",
  type: "light",
  colors: {
    "editor.background": "#eae9e9",
    "editor.foreground": "#201e1d",
  },
  settings,
  tokenColors: settings,
};
