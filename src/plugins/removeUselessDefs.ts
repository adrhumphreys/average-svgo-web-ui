import { PluginDef } from ".";

const removeUselessDefs: PluginDef = {
  id: "removeUselessDefs",
  name: "Remove useless defs",
  description: "Removes elements in <defs> without id",
  params: [],
};

export default removeUselessDefs;
