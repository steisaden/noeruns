import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use base from env when deploying to GitHub Pages for correct asset paths
  base: process.env.VITE_BASE || '/',
})
