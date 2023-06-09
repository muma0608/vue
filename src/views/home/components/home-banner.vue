<script lang="ts" setup>
import useStore from '@/stores'
import { storeToRefs } from 'pinia'

let { home } = useStore()
let { getBannerList } = home
getBannerList()
// 获取数据源
let { bannerList } = storeToRefs(home)
</script>
<template>
  <div class="home-banner">
    <!-- 轮播图   duration  控制时间间隔-->
    <XtxCarousel
    :list="bannerList"
    class="myCarousel"
    :auto-play="true"
    :time="2000" :data="bannerList" :duration="bannerList.length * 1000" 
  ></XtxCarousel>
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;
  ::v-deep a.carousel-btn.prev {
    left: 270px !important;
  }
  ::v-deep .carousel-indicator {
    transform: translateX(100px);
  }
}
</style>
