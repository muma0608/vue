<script setup lang="ts">
// 导入组件
import AppTopNavVue from './components/app-topnav.vue'
import AppHeaderVue from './components/app-header.vue'
import AppFooterVue from './components/app-footer.vue'
import AppHeaderStickyVue from './components/app-header-sticky.vue'
</script>
<script lang="ts">
export default {
  name: 'loginIndex'
}
</script>
<template>
   <!-- 吸顶组件 -->
   <AppHeaderStickyVue></AppHeaderStickyVue>
  <!-- 顶部通栏组件 -->
  <AppTopNavVue></AppTopNavVue>
  <!-- 导航区域 -->
  <AppHeaderVue></AppHeaderVue>
  <!-- 二级路由的出口 -->
  <router-view></router-view>
  <!-- 底部通栏组件 -->
  <AppFooterVue></AppFooterVue>
</template>
<style scoped lang="less"></style>

