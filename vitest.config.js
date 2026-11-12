import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["tests/components/**/*.test.jsx"],
    setupFiles: ["tests/components/setup.js"],
    restoreMocks: true,
    // A local .env may switch the journey on; tests that need it mock the flag.
    env: { VITE_ENABLE_CURRICULUM_JOURNEY: "false" },
  },
});
