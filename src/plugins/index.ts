import removeXMLProcInst from "./removeXMLProcInst";
import cleanupAttrs from "./cleanupAttrs";
import inlineStyles from "./inlineStyles";
import mergeStyles from "./mergeStyles";
import removeDoctype from "./removeDoctype";
import removeComments from "./removeComments";
import removeMetadata from "./removeMetadata";
import removeTitle from "./removeTitle";
import removeDesc from "./removeDesc";
import removeUselessDefs from "./removeUselessDefs";
import removeXMLNS from "./removeXMLNS";

export type PluginDef = {
  id: string;
  name: string;
  description: string;
  params: Array<{
    id: string;
    name: string;
    description: string;
    type: "boolean" | "number" | "string" | "stringArray" | "trueBool";
    default?: any;
  }>;
};

const plugins = [
  cleanupAttrs,
  removeXMLProcInst,
  inlineStyles,
  mergeStyles,
  removeDoctype,
  removeComments,
  removeMetadata,
  removeTitle,
  removeDesc,
  removeUselessDefs,
  removeXMLNS,
] as Array<PluginDef>;

export default plugins;
