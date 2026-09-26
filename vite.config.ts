import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/ia-presentation/",
  plugins: [
    {
      enforce: "pre",
      ...mdx(),
    },
    react({
      include: /\.[jt]sx?$|\.mdx$/,
    }),
    tailwindcss(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
