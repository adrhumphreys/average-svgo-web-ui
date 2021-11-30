import { PluginDef } from ".";

const removeXMLNS: PluginDef = {
  id: "removeXMLNS",
  name: "Remove XML namespaces",
  description: "Removes xmlns attribute (for inline svg, disabled by default)",
  params: [
    {
      id: "additionalNamespaces",
      name: "Additional namespaces",
      description: "Remove custom namespace",
      type: "stringArray",
    },
  ],
};

export default removeXMLNS;
