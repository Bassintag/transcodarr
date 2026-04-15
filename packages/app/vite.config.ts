import { defineConfig } from "vite";
import router from "@tanstack/router-plugin/vite";
import { devtools } from "@tanstack/devtools-vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    router({ target: "react", autoCodeSplitting: true }),
    devtools(),
    tailwindcss(),
    viteReact(),
  ],
});

export default config;
