<script lang="ts">
export default {
  name: 'homeIndex'
}
</script>
<script setup lang="ts">
// 导入组件
import homeBannerVue from './components/home-banner.vue'
import homeCategoryVue from './components/home-category.vue'
import homeNewVue from './components/home-new.vue'
import homeHotVue from './components/home-hot.vue'
import homeBrandVue from './components/home-brand.vue'
import homeProductVue from './components/home-product.vue'
import homeSpecialVue from './components/home-special.vue'
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <homeCategoryVue />
        <!-- banner轮播图 -->
        <homeBannerVue />
      </div>
      <!-- 新鲜好物 -->
      <homeNewVue></homeNewVue>
      <!-- 人气推荐 -->
      <homeHotVue></homeHotVue>
      <!-- 热门品牌 -->
      <homeBrandVue></homeBrandVue>
      <!-- 产品区域 -->
      <homeProductVue></homeProductVue>
      <!-- 最新专题 -->
      <homeSpecialVue></homeSpecialVue>
    </div>
  </div>
</template>
<style scoped lang="less"></style>
