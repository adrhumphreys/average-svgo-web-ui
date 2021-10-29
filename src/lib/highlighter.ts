import { highlight, languages } from "prismjs";
import { expose } from "comlink";

export type HighlightFunc = (arg0: string) => Promise<string>;
export type Highlight = {
  process: HighlightFunc;
};

const highlighter = {
  process(code: string) {
    return highlight(code, languages.markup, "markup");
  },
};

expose(highlighter);
