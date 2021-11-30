import { Action, State } from "../plugins/state";
import plugins from "../plugins";
import { Dispatch } from "react";
import Plugin from "./Plugin";
import CopyButton from "./CopyButton";
import PasteCode from "./PasteCode";

type Props = {
  currentCode: string;
  pluginState: State;
  dispatch: Dispatch<Action>;
};

const Plugins = ({ pluginState, dispatch, currentCode }: Props) => {
  return (
    <div className="lg:block pt-4">
      <div className="pb-8">
        {plugins.map((plugin) => (
          <Plugin
            key={plugin.id}
            plugin={plugin}
            dispatch={dispatch}
            plugins={pluginState.enabledPlugins}
          />
        ))}
      </div>
      <CopyButton text={currentCode} />
      <PasteCode />
    </div>
  );
};

export default Plugins;
