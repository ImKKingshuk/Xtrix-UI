import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: ["./src/**"],
      Accordion: ["./src/UI/Components/Accordion/index.ts"],
      Avatar: ["./src/UI/Components/Avatar/index.ts"],
      Card: ["./src/UI/Components/Card/index.ts"],
      ThemeProvider: ["./src/UI/Providers/ThemeProvider/index.ts"],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: "esm",
    },
  ],
  output: {
    target: "web",
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: "classic",
      },
    }),
  ],
});
