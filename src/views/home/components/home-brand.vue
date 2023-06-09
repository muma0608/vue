<script lang="ts" setup name="HomeBrand">
import HomePanel from './home-panel.vue'
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { dataLazy } from '@/utils/tools'
import homeSkeletonVue from './home-skeleton.vue'
import { ref } from 'vue'

let { home } = useStore()
let { getBrandList } = home
let { brandList } = storeToRefs(home)
// 数据的懒加载
let target = dataLazy(getBrandList)
// 保存状态的变量
let index = ref(0)
</script>

<template>
  <div ref="target">
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
      <template v-slot:right>
        <a
          href="javascript:;"
          class="iconfont icon-angle-left prev"
          :class="{ disabled: index === 0 }"
          @click="index = 0"
        ></a>
        <a
          href="javascript:;"
          class="iconfont icon-angle-right next"
          :class="{ disabled: index === 1 }"
          @click="index = 1"
        ></a>
      </template>
      <div class="box" ref="box">
        <Transition name="fade">
          <ul
            class="list"
            v-if="brandList.length > 0"
            :style="{ transform: `translateX(${-index * 1240}px)` }"
          >
            <li v-for="i in brandList" :key="i.id">
              <RouterLink to="/">
                <img v-imglazy="i.picture" alt="" />
              </RouterLink>
            </li>
          </ul>
          <homeSkeletonVue v-else></homeSkeletonVue>
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
