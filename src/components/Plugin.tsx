import { useCallback, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import type { PluginDef } from "../plugins";
import type { PluginState } from "../plugins/state";
import PluginParam from "./PluginParam";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  plugin: PluginDef;
  dispatch: any;
  plugins: Array<PluginState>;
};

const pluginEnabled = (plugins: Array<PluginState>, id: string) => {
  return plugins.some((p) => p.id === id);
};

const Filter = ({ plugin, dispatch, plugins }: Props) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(pluginEnabled(plugins, plugin.id));
  }, [plugins]);

  const handleToggle = useCallback((pluginId) => {
    dispatch({
      type: "toggle_plugin",
      pluginId,
    });
  }, []);

  return (
    <div className="pb-4">
      <Switch.Group as="div" className="flex items-center justify-between pb-4">
        <span className="flex-grow flex flex-col">
          <Switch.Label
            as="span"
            className="text-sm font-medium text-gray-900"
            passive
          >
            {plugin.name}
          </Switch.Label>
          <Switch.Description as="span" className="text-sm text-gray-500">
            {plugin.description}
          </Switch.Description>
        </span>
        <Switch
          checked={enabled}
          onChange={() => handleToggle(plugin.id)}
          className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            )}
          />
        </Switch>
      </Switch.Group>

      {enabled ? (
        <div className="space-y-4">
          {plugin?.params
            ? plugin.params.map((param) => (
                <PluginParam
                  key={param.id}
                  param={param}
                  pluginId={plugin.id}
                  dispatch={dispatch}
                  enabledPlugins={plugins}
                />
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
