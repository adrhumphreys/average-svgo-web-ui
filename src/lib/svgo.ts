import { optimize } from "svgo/dist/svgo.browser.js";
import { expose } from "comlink";

type Dimensions = { width?: number; height?: number };
type DimensionsPlugin<P extends object = never> = {
  name: string;
  type: "perItem" | "perItemReverse" | "full" | "visitor";
  params?: P | undefined;
  fn: (ast: any, params: P, info: any) => any;
};

const createDimensionsExtractor = () => {
  const dimensions: Dimensions = {};
  const plugin: DimensionsPlugin = {
    type: "visitor",
    name: "extract-dimensions",
    fn: () => {
      return {
        element: {
          // Node, parentNode
          enter: ({ name, attributes }: any, { type }: any) => {
            if (name === "svg" && type === "root") {
              if (
                attributes.width !== undefined &&
                attributes.height !== undefined
              ) {
                dimensions.width = Number.parseFloat(attributes.width);
                dimensions.height = Number.parseFloat(attributes.height);
              } else if (attributes.viewBox !== undefined) {
                const viewBox = attributes.viewBox.split(/,\s*|\s+/);
                dimensions.width = Number.parseFloat(viewBox[2]);
                dimensions.height = Number.parseFloat(viewBox[3]);
              }
            }
          },
        },
      };
    },
  };

  return [dimensions, plugin];
};

export const compress = (svgInput: string, settings: any) => {
  // setup plugin list
  const floatPrecision = Number(settings.floatPrecision);
  const plugins = settings.plugins;

  // for (const [name, active] of Object.entries(settings.plugins)) {
  //   if (!active) continue;

  //   const plugin = {
  //     name,
  //     params: {},
  //   };

  //   // TODO: revisit this
  //   // 0 almost always breaks images when used on `cleanupNumericValues`.
  //   // Better to allow 0 for everything else, but switch to 1 for this plugin.
  //   // plugin.params.floatPrecision =
  //   //   plugin.name === "cleanupNumericValues" && floatPrecision === 0
  //   //     ? 1
  //   //     : floatPrecision;

  //   plugins.push(plugin);
  // }

  // multipass optimization
  const [dimensions, extractDimensionsPlugin] = createDimensionsExtractor();
  const { data, error } = optimize(svgInput, {
    multipass: settings.multipass,
    plugins: [...plugins, extractDimensionsPlugin],
    js2svg: {
      indent: "  ",
      pretty: settings.pretty,
    },
  });

  if (error) throw new Error(error);

  return { data, dimensions };
};

export type SVGO = {
  process: (svgInput: string, settings: any) => any;
};

const worker = {
  process(svgInput: string, settings: any) {
    return compress(svgInput, settings);
  },
};

expose(worker);
