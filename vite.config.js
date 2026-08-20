import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    // 로컬 개발 시 /api 요청을 실서버로 프록시 (VITE_PROXY_TARGET으로 변경 가능)
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'https://timebank.hbinserver.cloud',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
