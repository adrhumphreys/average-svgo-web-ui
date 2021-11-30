import { useCallback, useEffect } from "react";
import type { PluginState } from "../plugins/state";

type Props = {
  pluginId: string;
  param: any;
  dispatch: any;
  enabledPlugins: Array<PluginState>;
};

const paramEnabled = (
  plugins: Array<PluginState>,
  pluginId: string,
  paramId: string
) => {
  return plugins.some(
    (plugin) =>
      plugin.id === pluginId &&
      plugin.params.some((param) => param.id === paramId)
  );
};

const FilterParam = ({ pluginId, param, dispatch, enabledPlugins }: Props) => {
  const handleParamToggle = useCallback((paramId, pluginId) => {
    if (param.type === "trueBool") {
      dispatch({
        type: "toggle_true_param",
        pluginId,
        paramId,
      });
      return;
    }

    dispatch({
      type: "toggle_param",
      pluginId,
      paramId,
    });
  }, []);

  const defaultVal = param?.default;
  useEffect(() => {
    if (!defaultVal) return;

    dispatch({
      type: "set_param",
      pluginId,
      paramId: param.id,
      value: defaultVal,
    });
  }, [defaultVal]);

  return (
    <div key={param.id} className="flex items-center">
      <input
        id={`filter-${pluginId}-${param.id}`}
        type="checkbox"
        onClick={() => handleParamToggle(param.id, pluginId)}
        defaultChecked={paramEnabled(enabledPlugins, pluginId, param.id)}
        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
      />
      <label
        htmlFor={`filter-${pluginId}-${param.id}`}
        className="ml-3 text-sm text-gray-600"
      >
        {param.name}
      </label>
    </div>
  );
};

export default FilterParam;
