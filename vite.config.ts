import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 8080, // This can be overridden if port is already in use
    strictPort: false,
    cors: true,
  },
  build: {
    outDir: "dist",
    sourcemap: process.env.NODE_ENV !== "production",
  },
});