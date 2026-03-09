import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1/api": {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    }
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
