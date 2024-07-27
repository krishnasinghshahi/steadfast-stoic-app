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
    proxy: {
      '/dhanSymbols': 'http://localhost:3000',
      '/flattradeSymbols': 'http://localhost:3000',
      '/shoonyaSymbols': 'http://localhost:3000',
      '/flattradeApi': {
        target: 'https://authapi.flattrade.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/flattradeApi/, '')
      },
      '/shoonyaApi': {
        target: 'https://api.shoonya.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/shoonyaApi/, '')
      },
      '/dhanApi': {
        target: 'https://api.dhan.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dhanApi/, '')
      }
      // '/dhanApi': {
      //   target: 'https://api.dhan.in',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/dhanApi/, '')
      // }
    }
  }
})
