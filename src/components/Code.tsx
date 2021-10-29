import { wrap, Remote } from "comlink";
import { useEffect, useState } from "react";
import { Highlight } from "../lib/highlighter";
import Worker from "../lib/highlighter?worker";
import "prismjs/themes/prism.css";

type Props = {
  source: string | null;
};

const Code = ({ source }: Props) => {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (!source) {
      return;
    }

    const doit = async () => {
      const highlight: Remote<Highlight> = wrap(new Worker());
      const result = await highlight.process(source.data);
      setCode(result);
    };
    doit();
  }, [source]);

  if (!code || !source) {
    return (
      <pre className=" language-markup">
        <code className="prism-code language-markup">loading</code>
      </pre>
    );
  }

  return (
    <pre className="language-markup">
      <code
        className="prism-code language-markup"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </pre>
  );
};

export default Code;
