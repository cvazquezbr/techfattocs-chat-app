import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/v3': {
        target: 'https://api.agendor.com.br/v3',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v3/, ''),
      },
    },
  },
})
