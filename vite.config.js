import { realpathSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = realpathSync(process.cwd());

export default defineConfig({
  root: projectRoot,
  base: "./",
  plugins: [react()],
  server: {
    host: "localhost",
    port: 8000,
    strictPort: true,
  },
});
