import { PluginDef } from ".";

const removeDesc: PluginDef = {
  id: "removeDesc",
  name: "Remove desc",
  description: "Removes <desc>",
  params: [
    {
      id: "removeAny",
      name: "Remove any",
      description:
        "Removes any description, even ones that could be used for accessibility",
      type: "boolean",
    },
  ],
};

export default removeDesc;
