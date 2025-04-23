import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "import.meta.env.PINATA_JWT": JSON.stringify(process.env.PINATA_JWT),
    "import.meta.env.PINATA_GATEWAY": JSON.stringify(process.env.PINATA_GATEWAY)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
