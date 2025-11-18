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
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "chakra-ui": ["@chakra-ui/react"],
          "testing": ["vitest", "@testing-library/react", "@testing-library/jest-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 kB if needed
  },
});
