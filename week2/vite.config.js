import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/2022vue3collect/week2/dist//',
  plugins: [vue()],
})
