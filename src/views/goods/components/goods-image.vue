<script lang="ts" setup name="GoodsImage">
import { ref, computed } from 'vue'

import { useMouseInElement } from '@vueuse/core'
// 定义一个 data 用来保存图片的地址
defineProps<{
  data: string[]
}>()
// 定义一个 acitve 用来保存选中图片的下标
let active = ref(0)
// 定义 dom 元素对象
let target = ref(null)
// isOutside: 判断指针是否出现在中图中
//  elementX: 鼠标距离元素左上角的水平距离
//  elementY: 鼠标距离元素左上角的垂直距离  useMouseInElement用来获取指针元素
let { elementX, elementY, isOutside } = useMouseInElement(target)
// 使用计算属性来控制 elementX & elementY 的取值
let point = computed(() => { // computed 用来计算属性
  let x = 0
  let y = 0
  x = elementX.value - 100
  x < 0 ? (x = 0) : x
  x > 200 ? (x = 200) : x
  y = elementY.value - 100
  y < 0 ? (y = 0) : y
  y > 200 ? (y = 200) : y
  return {
    x,
    y
  }
})
</script>
<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div
      class="large"
      v-if="!isOutside"
      :style="[
        {
          backgroundImage: `url(${data[active]})`,
          backgroundPosition: `${-2 * point.x}px ${-2 * point.y}px`
        }
      ]"
    ></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="data?.[active]" alt="" />
      <!-- 遮罩层 -->
      <div
        v-if="!isOutside"
        class="layer"
        :style="{ left: `${point.x}px`, top: `${point.y}px` }"
      ></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li
        v-for="(item, index) in data"
        :key="index"
        :class="{ active: active === index }"
        @mouseenter="active = index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
