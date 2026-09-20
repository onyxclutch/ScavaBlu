import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const esp32Target = env.VITE_ESP32_URL || 'http://192.168.1.17'

  return {
    plugins: [react()],

    // GitHub Pages
    base: '/SCAVABLU/',

    // ESP32 connection for local development
    server: {
      proxy: {
        '/esp32': {
          target: esp32Target,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/esp32/, '') || '/',
        },
      },
    },
  }
})