// 导入 vue
import { createApp } from 'vue'
// 导入根组件
import App from './App.vue'
// 导入 normalize
import 'normalize.css'
// 导入公共的样式文件
import '@/assets/styles/common.less'
// 导入路由
import router from '@/router'
// 导入 pinia
import { createPinia } from 'pinia'
// 导入全局组件
import plugin from './components/Index'
// 创建 pinia 实例
const pinia = createPinia()

// 创建 vue 实例
createApp(App)
  .use(router)
  .use(pinia)
  .use(plugin)
  .mount('#app')