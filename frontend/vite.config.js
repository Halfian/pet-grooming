import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/services": "http://localhost:5000",
      "/auth": "http://localhost:5000",
      "/bookings": "http://localhost:5000",
      "/users": "http://localhost:5000",
      "/pets": "http://localhost:5000"
    }
  } 
})
