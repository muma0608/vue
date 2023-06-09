<script lang="ts" setup>
import { TSwiper } from '@/types/category'
import { ref } from 'vue'
let props = defineProps<{
  data: TSwiper[]
  autoPlay: boolean
  duration: number
}>()
// 选中图片的下标
let active = ref(0)
// 显示下一张
function next() {
  active.value = active.value + 1 >= props.data.length ? 0 : active.value + 1
}
// 显示上一张
function pre() {
  active.value = active.value - 1 < 0 ? props.data.length - 1 : active.value - 1
}
// 定义一个定时器
let timer: number | null = null
// 设置自动轮播的方法
function start() {
  // 判断是否需要自动轮播
  if (!props.autoPlay) return
  timer = window.setInterval(() => {
    next()
  }, props.duration)
}
// 设置结束轮播的方法
function end() {
  window.clearInterval(timer!)
}
start()
</script>
<script lang="ts">
export default {
  name: 'XtxCarousel'
}
</script>
<template>
  <div class="xtx-carousel" @mouseenter="end" @mouseleave="start">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: active === index }"
        v-for="(i, index) in data"
        :key="i.id"
      >
        <RouterLink to="/">
          <img :src="i.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="pre">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a href="javascript:;" class="carousel-btn next" @click="next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <div class="carousel-indicator">
      <span
        @mouseenter="active = index"
        :class="{ active: active === index }"
        v-for="(i, index) in data"
        :key="i.id"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
