import { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import { wrap, Remote } from "comlink";
import Worker from "./lib/svgo?worker";
import Code from "./components/Code";
import { svg } from "./test";
import Preview from "./components/Preview";
import Header from "./components/Header";
import Filters from "./components/Filters";
import {
  initialPluginState,
  pluginReducer,
  stateToConfig,
} from "./plugins/state";
import type { SVGO } from "./lib/svgo";

const tabs = [
  { name: "Preview", key: "preview" },
  { name: "Code", key: "code" },
];

function App() {
  const [activeTab, setActiveTab] = useState("preview");

  const [pluginState, dispatch] = useImmerReducer(
    pluginReducer,
    initialPluginState
  );

  const [compressed, setCompressed] = useState<string | null>(null);

  const code = svg();

  useEffect(() => {
    if (!code) {
      return;
    }
    const doit = async () => {
      console.log(stateToConfig(pluginState));
      const highlight: Remote<SVGO> = wrap(new Worker());
      const result = await highlight.process(code, {
        plugins: stateToConfig(pluginState),
      });
      setCompressed(result);
    };
    doit();
  }, [code, pluginState]);
  // const comp = compress(code, { plugins: [] });
  // console.log(comp);

  return (
    <div className="App">
      <div className="bg-white">
        <main className="px-4 sm:px-6 lg:px-8">
          <Header
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            <div className="lg:col-span-3">
              {activeTab === "preview" ? <Preview html={code} /> : null}
              {activeTab === "code" ? <Code source={compressed} /> : null}
            </div>
            <Filters pluginState={pluginState} dispatch={dispatch} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
