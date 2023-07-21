import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //src配置路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  // 代理跨域
  server: {
    proxy: {
      '/api': {
        target: 'http://101.43.241.101:63010/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
