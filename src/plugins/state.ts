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
  value?: any;
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
  const paramId = action?.paramId;
  const plugins = draft.enabledPlugins;
  const plugin = getPlugin(plugins, pluginId);

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
      const isEnabled = draft.enabledPlugins.some(
        (p) =>
          p.id === pluginId && p?.params?.some((param) => param.id === paramId)
      );

      if (isEnabled) {
        if (plugin?.params) {
          plugin.params = plugin?.params?.filter(
            (param) => param.id !== paramId
          );
        }
      } else {
        // Ensure the plugin is enabled
        pluginReducer(draft, { ...action, type: "set_param", value: true });
      }
      break;
    case "toggle_true_param":
      if (!plugin) {
        return;
      }

      let param = plugin.params.find((param) => param.id === paramId);
      let paramEnabled = param?.value === true;

      pluginReducer(draft, {
        ...action,
        type: "set_param",
        value: !paramEnabled,
      });

      break;
    case "set_param":
      if (!plugin) {
        return;
      }

      pluginReducer(draft, { type: "add_plugin", pluginId });
      plugin.params = plugin?.params?.filter((param) => param.id !== paramId);
      plugin!.params.push({
        id: paramId!,
        value: action.value,
      });
      break;
  }
};
