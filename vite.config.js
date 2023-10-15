import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { resolve } from "path"

export default defineConfig({
  build: {
    sourcemap: true,
    target: "modules",
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "MyLib",
      fileName: "widget",
      // formats: ["iife"],
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
})
