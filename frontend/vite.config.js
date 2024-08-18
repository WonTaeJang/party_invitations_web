import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@img': resolve(__dirname, 'src/assets/img'),
      '@api': resolve(__dirname, 'src/api'),
      '@party': resolve(__dirname, 'src/app/party'),
      '@admin': resolve(__dirname, 'src/app/admin'),
      '@store': resolve(__dirname, 'src/stores'),
    }
  },
  server: {
    // host: true
  }
})
