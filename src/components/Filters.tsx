import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { Action, State, PluginState } from "../plugins/state";
import plugins from "../plugins";
import { Dispatch, useCallback } from "react";

const pluginEnabled = (plugins: Array<PluginState>, id: string) => {
  return plugins.some((p) => p.id === id);
};

type Props = {
  pluginState: State;
  dispatch: Dispatch<Action>;
};

const Filters = ({ pluginState, dispatch }: Props) => {
  const handleToggle = useCallback((pluginId) => {
    dispatch({
      type: "toggle_plugin",
      pluginId,
    });
  }, []);

  const handleParamToggle = useCallback((paramId, pluginId) => {
    dispatch({
      type: "toggle_param",
      pluginId,
      paramId,
    });
  }, []);

  console.log(pluginState);

  return (
    <form className="hidden lg:block">
      {plugins.map((plugin) => (
        <Disclosure
          as="div"
          key={plugin.id}
          defaultOpen={true}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {plugin.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {/* Default enabled/disabled for the plugin */}
                  <div className="flex items-center">
                    <input
                      id={`filter-${plugin.id}-itself`}
                      type="checkbox"
                      defaultChecked={pluginEnabled(
                        pluginState.enabledPlugins,
                        plugin.id
                      )}
                      onClick={() => handleToggle(plugin.id)}
                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${plugin.id}-itself`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      Enabled
                    </label>
                  </div>
                  {plugin.params
                    ? plugin.params.map((param) => (
                        <div key={param.id} className="flex items-center">
                          <input
                            id={`filter-${plugin.id}-${param.id}`}
                            type="checkbox"
                            onClick={() =>
                              handleParamToggle(param.id, plugin.id)
                            }
                            // defaultChecked={option.checked}
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${plugin.id}-${param.id}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {param.name}
                          </label>
                        </div>
                      ))
                    : null}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

export default Filters;
