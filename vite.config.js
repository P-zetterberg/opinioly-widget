import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { resolve } from "path"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "Opinioly",
      fileName: "opinioly",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: () => `opinioly.js`,
        chunkFileNames: () => `opinioly.js`,
      },
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
        cssHash: ({ hash, css }) => `o-${hash(css)}`,
      },
    }),
  ],
})
