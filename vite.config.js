import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.themoviedb.org/3', // The target TMDB API
        changeOrigin: true, // This ensures the proxy works correctly
        rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' prefix before sending the request
      }
    }
  }
})
