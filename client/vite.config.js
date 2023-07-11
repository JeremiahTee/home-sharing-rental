import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    server: {
      "/api": {
        target: "http://localhost:9000"
      },
      port: 3000
    },
    build: {
      outDir: "build"
    },
    plugins: [react()]
  };
});
