import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置项
  resolve: {
    // 配置别名
    alias: {
      // path.resolve：拼接路径
      // __dirname：当得当前文件的绝对路径
      '@': path.resolve(__dirname, './src')
    }
  },
  // 自动导入 less 文件
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import '@/assets/styles/variables.less';
          @import '@/assets/styles/mixins.less';
        `
      }
    }
  }
})