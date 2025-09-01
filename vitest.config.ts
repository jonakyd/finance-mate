import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      clearMocks: true,
      include: ["**/*.test.{ts,tsx}"],
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
        headless: true,
      },
    },
  }),
);
