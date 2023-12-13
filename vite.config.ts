import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    resolve: {
        alias: [{ find: "~", replacement: "/src" }],
    },
    server: {
        host: 'localhost',
        port: 3000,
        headers: [
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
          ],
    },
    
});
