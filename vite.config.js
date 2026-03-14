import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // Allow access from external devices on the network
    port: 30001, // Optional: You can change the port if needed
  },
});
