import { Remote, wrap } from "comlink";
import Worker from "./svgo?worker";

type WorkerDef = {
  process: (svgInput: string, settings: any) => any;
};

export const compress = async (svgInput: string, settings: any) => {
  const highlight: Remote<WorkerDef> = wrap(new Worker());
  return await highlight.process(svgInput, settings);
};
