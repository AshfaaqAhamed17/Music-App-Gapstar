import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
  server: {
    allowedHosts: ["orthogonally-improper-sherman.ngrok-free.dev"],
  },
  build: {
    assetsInlineLimit: 4096,
    assetsDir: "assets",
  },
});
