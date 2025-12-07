import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Vite workaround for localhost binding issues on some systems
  // https://github.com/vitejs/vite/issues/16522#issuecomment-2436694341
  server: { host: "127.0.0.1" },
});
