import { PluginDef } from ".";

const minifyStyles: PluginDef = {
  id: "inlineStyles",
  name: "Inline styles",
  description:
    "Move and merge styles from <style> elements to element style attributes",
  params: [
    {
      id: "onlyMatchedOnce",
      name: "Only matched once",
      description: "Inline only selectors that match once",
      type: "trueBool",
      default: true,
    },
    {
      id: "removeMatchedSelectors",
      name: "Remove matched selectors",
      description:
        "Clean up matched selectors, leave selectors that hadn't matched",
      type: "trueBool",
      default: true,
    },
    {
      id: "useMqs",
      name: "Use media queries",
      description:
        "What media queries to be used, empty string element for styles outside media queries",
      type: "stringArray",
    },
    {
      id: "usePseudos",
      name: "What pseudo classes/elements to use",
      description:
        "What pseudo-classes/-elements to be used, empty string element for all non-pseudo-classes and/or -elements",
      type: "stringArray",
    },
  ],
};

export default minifyStyles;
