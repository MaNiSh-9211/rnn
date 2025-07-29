import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.NODE_ENV === "development"
      ? [
          await import("@replit/vite-plugin-runtime-error-modal").then(m => m.default()),
          ...(process.env.REPL_ID 
            ? [await import("@replit/vite-plugin-cartographer").then(m => m.cartographer())]
            : [])
        ]
      : [])
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@assets": path.resolve(__dirname, "./attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/client"),
    emptyOutDir: true,
    manifest: true
  },
  base: "/",
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});
