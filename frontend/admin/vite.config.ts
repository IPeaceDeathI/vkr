import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // proxy: {
  //   '/api': {
  //     target: 'https://localhost:5173',
  //     changeOrigin: true,
  //     secure: false,
  //     ws: true,
  //   }
  // },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // '@': '/constructor2/admin/src/',
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
    // outDir: '../../assets/',
    // outDir: '../../v0020/admin/dist/assets/',
    // outDir: '../../constructor2/admin/src/dist/assets/',
    outDir: './dist/', // Чтобы build работала нужно прям в /constructor2 хранить
  },
  // root: './constructor2/admin/dist/',
  // publicDir: process.env.NODE_ENV === 'production'
  //   ? '/constructor2/admin/dist/'
  //   : '/'
})
