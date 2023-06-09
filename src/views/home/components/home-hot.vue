<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
// 获取数据自定义懒加载
import { dataLazy } from '@/utils/tools'
import homeSkeletonVue from './home-skeleton.vue'
import { useIntersectionObserver } from '@vueuse/core'
// import { ref } from 'vue'
let { home } = useStore()
let { getHotList } = home
// 获取数据源  storeToRefs 响应式渲染
let { hotList } = storeToRefs(home)
// 获取目标元素
let target = dataLazy(getHotList)
// useIntersectionObserver 钩子函数 用于异步查看目标元素或视口之间的交叉状态 进行解构赋值
let { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) { // isIntersecting 表示目标元素是否与视口交叉的布尔值
    getHotList()
    stop()
  }
})
</script>
<template>
    <div class="home-new" ref="target">
      <HomePanel title="人气推荐" subtitle="人气爆款 不容错过">
        <Transition name="fade">
          <!-- 面板内容 -->
          <ul class="goods-list" v-if="hotList.length > 0">
            <li v-for="item in hotList" :key="item.id">
              <RouterLink to="/">
                <img v-imglazy="item.picture" alt="" />
                <p class="name ellipsis">{{ item.title }}</p>
                <p class="price">{{ item.alt }}</p>
              </RouterLink>
            </li>
          </ul>
          <!-- 骨架屏组件 -->
          <homeSkeletonVue v-else></homeSkeletonVue>
        </Transition>
      </HomePanel>
    </div>
  </template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
