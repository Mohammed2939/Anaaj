import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mov', '**/*.mp4', '**/*.webm'],
  server: {
    host: true, // exposes on all local network interfaces (0.0.0.0)
  },
})
