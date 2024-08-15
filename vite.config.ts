import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // hey! 👋 over here
    globals: true,
    setupFiles: "./setupTest.ts",
  },
});
