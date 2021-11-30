import { ClipboardCopyIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

type Props = {
  text: string;
};

const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    setTimeout(() => {
      setCopied(false);
      console.log(text);
    }, 2000);
  }, [copied]);

  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => setCopied(true)}
    >
      <ClipboardCopyIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      {copied ? "Copied" : "Add to clipboard"}
    </button>
  );
};

export default CopyButton;
