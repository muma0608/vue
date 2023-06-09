<script setup lang="ts">
// 1.0 - 图片的懒加载

import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
//  默认情况下不加载图片，当图片出现在可视区域时加载
let target = ref<HTMLImageElement | null>(null)
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  // 判断
  if (isIntersecting) {
    // 图片已经进入可视区域
    target.value!.src =
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg5.51tietu.net%2Fpic%2F2019-081204%2Fqawnb42z0yhqawnb42z0yh.jpg&refer=http%3A%2F%2Fimg5.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668044300&t=d426de5556bc15ededdd6e151828a202'
  }
})
</script>
<template>
  <h2>测试页面</h2>
  <h3>1.0 - 图片的懒加载</h3>
  <div style="width: 800px; height: 1000px; background-color: pink; margin: 0 auto"></div>
  <img ref="target" alt="" />
</template>
<style scoped lang="less"></style>
