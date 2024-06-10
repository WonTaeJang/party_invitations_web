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
      '@party': resolve(__dirname, 'src/app/party'),
    }
  }
})
