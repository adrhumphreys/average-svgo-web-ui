import type { Reducer } from "use-immer";

type PluginParam = {
  id: string;
  value: any;
};

export type PluginState = {
  id: string;
  enabled: boolean;
  params: Array<PluginParam>;
};

export type State = {
  enabledPlugins: Array<PluginState>;
};

export type Action = {
  type: string;
  pluginId: string;
  paramId?: string;
};

export const initialPluginState = {
  enabledPlugins: [
    {
      id: "removeXMLProcInst",
      enabled: true,
      params: [],
    },
  ],
};

const pluginEnabled = (plugins: Array<PluginState>, pluginId: string) =>
  plugins.some((plugin) => plugin.id === pluginId);

const getPlugin = (plugins: Array<PluginState>, pluginId: string) =>
  plugins.find((plugin) => plugin.id === pluginId);

export const stateToConfig = (pluginState: State) => {
  return pluginState.enabledPlugins.map((plugin) => {
    if (plugin.params.length === 0) {
      return plugin.id;
    }

    return {
      name: plugin.id,
      params: plugin.params.reduce((prev: any, curr) => {
        prev[curr.id] = curr.value;
        return prev;
      }, {}),
    };
  });
};

export const pluginReducer: Reducer<State, Action> = (draft, action) => {
  const pluginId = action.pluginId;
  const plugins = draft.enabledPlugins;
  switch (action.type) {
    case "add_plugin":
      if (pluginEnabled(plugins, pluginId)) {
        return;
      }

      plugins.push({
        id: pluginId,
        enabled: true,
        params: [],
      });
      break;
    case "remove_plugin":
      draft.enabledPlugins = plugins.filter(
        (plugin: PluginState) => plugin.id !== pluginId
      );
      break;
    case "toggle_plugin":
      pluginReducer(draft, {
        ...action,
        type: pluginEnabled(plugins, pluginId) ? "remove_plugin" : "add_plugin",
      });
      break;
    case "toggle_param":
      const paramId = action?.paramId;
      const isEnabled = draft.enabledPlugins.some(
        (p) =>
          p.id === pluginId && p?.params?.some((param) => param.id === paramId)
      );

      if (isEnabled) {
        const plugin = getPlugin(plugins, pluginId);

        if (plugin?.params) {
          plugin.params = plugin?.params?.filter(
            (param) => param.id !== paramId
          );
        }
      } else {
        // Ensure the plugin is enabled
        pluginReducer(draft, { type: "add_plugin", pluginId });
        const plugin = getPlugin(plugins, pluginId);
        plugin!.params.push({
          id: paramId!,
          value: true,
        });
      }

      break;
  }
};
