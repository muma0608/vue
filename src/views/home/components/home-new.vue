<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { dataLazy } from '@/utils/tools'
import homeSkeletonVue from './home-skeleton.vue'
import { useIntersectionObserver } from '@vueuse/core'
// import { ref } from 'vue'
let { home } = useStore()
let { getNewList } = home
let { newlist } = storeToRefs(home) 
let target = dataLazy(getNewList) // 获取数据源
// 当组件进入到可视区域时，才发送数据请求
let { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) { // isIntersecting 表示目标元素是否与视口交叉的布尔值
    getNewList()
    stop()
  }
})
</script>
<template>
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" subtitle="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <Transition name="fade">
        <!-- 面板内容 -->
        <ul class="goods-list" v-if="newlist.length > 0">
          <li v-for="item in newlist" :key="item.id">
            <RouterLink to="/">
              <img v-imglazy="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <!-- 骨架屏 -->
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
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
