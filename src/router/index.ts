// 管理路由
import { createRouter, createWebHashHistory } from 'vue-router'
// 导入 layout
import layout from '@/views/layout/layoutIndex.vue'
const router = createRouter({
  // 设置路由模式  
  history: createWebHashHistory(),
  scrollBehavior: () => {
    return {
      top: 0,
    }
  },
  // 设置路由对象
  routes: [
    { path: '/', redirect: '/layout' },
    {
      path: '/test',
      component: () => import('@/views/viewsTest.vue')
    },
    {
      path: '/layout',
      component: layout,
      children: [
        // 首页
        { path: '/home', component: () => import('@/views/home/HomeIndex.vue') },
        // 一级分类
        {
          path: '/category/:id',
          component: () => import('@/views/category/CategoryIndex.vue')
        },
        // 二级分类
        {
          path: '/category/sub/:id',
          component: () => import('@/views/subcategory/subcategoryIndex.vue')
        },
        // 商品详情
        {
          path: '/category/goods/:id',
          component: () => import('@/views/goods/goodsIndex.vue')
        }
      ]
    },
    { path: '/login', component: () => import('@/views/login/loginIndex.vue') }
  ]
})

// 暴露路由对象
export default router