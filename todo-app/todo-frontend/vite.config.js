import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// export default defineConfig({
//   plugins: [react()],
//   use: {
//     baseURL: "http://localhost:5173",
//   },
//   server: {
//     proxy: {
//       "/todos": {
//         // target: "http://localhost:3000",
//         // target: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
//         target: import.meta.env.VITE_BACKEND_URL,
//         changeOrigin: true,
//       },
//     },
//   },
// });
