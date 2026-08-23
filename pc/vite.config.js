import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so this build works whether it's hosted at the domain
  // root or inside a subfolder like /pc/ (see the device-router setup).
  base: './',
  plugins: [react(), tailwindcss()],
})
