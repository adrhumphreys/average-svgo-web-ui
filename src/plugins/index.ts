import removeXMLProcInst from "./removeXMLProcInst";
import inlineStyles from "./inlineStyles";

type PluginDef = {
  id: string;
  name: string;
  params?: Array<{
    id: string;
    name: string;
    type: "boolean" | "number" | "string";
  }>;
};

const plugins = [removeXMLProcInst, inlineStyles] as Array<PluginDef>;

export default plugins;
