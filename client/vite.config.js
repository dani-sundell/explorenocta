import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      timeout: 10000,
      path: '@vite'
    }
  },
  build: {
    outDir: '../dist'
  },
  watch: {
    ignored: ['**/.npm/**', '**/node_modules/**']
  },
})