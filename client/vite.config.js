import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:8080",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
