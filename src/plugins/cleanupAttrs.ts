import { PluginDef } from ".";

const cleanupAttrs: PluginDef = {
  id: "cleanupAttrs",
  name: "Cleanup attributes",
  description:
    "Cleanups attributes from newlines, trailing and repeating spaces",
  params: [
    {
      id: "newlines",
      name: "New lines",
      description: "Defaults to true",
      type: "trueBool",
      default: true,
    },
    {
      id: "trim",
      name: "Trim",
      description: "Defaults to true",
      type: "trueBool",
      default: true,
    },
    {
      id: "spaces",
      name: "Spaces",
      description: "Defaults to true",
      type: "trueBool",
      default: true,
    },
  ],
};

export default cleanupAttrs;
