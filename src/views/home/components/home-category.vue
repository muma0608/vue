<script lang="ts">
export default {
  name: 'HomeCategory'
}
</script>
<script lang="ts" setup>
// // 导入骨架屏组件
// import xtxSkeleton from '@/components/skeleton/SkeletonIndex.vue'

import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { TGoods } from '@/types/cate'
let { cate } = useStore()
let { cateList } = storeToRefs(cate)
// 当前选中分类的 id
let cateId = ref('')
// 当前选中分类的商品数据源
let goods = ref<TGoods[] | undefined>({} as TGoods[])
// 根据 cateId 得到商品数据   watch 监听响应式数据变化
watch(cateId, newV => {
  let obj = cateList.value.find(item => item.id === newV) 
  goods.value = obj?.goods // 有可能没有数据
})
</script>
<template>
  <div class="home-category">
    <ul class="menu" @mouseleave="cateId = ''">
      <li
        v-for="i in cateList"
        :key="i.id"
        @mouseenter="cateId = i.id"
        :class="{ active: cateId === i.id }"
      >
        <RouterLink to="/">{{ i.name }}</RouterLink>
        <!-- 二级导航的判断 -->
        <template v-if="i.children">
          <RouterLink to="/">{{ i.children?.[0]?.name }}</RouterLink>
          <RouterLink to="/">{{ i.children?.[1]?.name }}</RouterLink>
        </template>
        <template v-else>
          <xtxSkeleton
            bg="#474747"
            :width="50"
            :height="20"
            :animated="true"
            :fade="false"
          ></xtxSkeleton>
          <xtxSkeleton
            style="margin-left: 10px"
            bg="#474747"
            :width="50"
            :height="20"
            :animated="false"
            :fade="true"
          ></xtxSkeleton>
        </template>
      </li>
      <!-- 分类推荐的弹层 - start -->
      <div class="layer">
        <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
        <ul>
          <li v-for="i in goods" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" alt="" />
              <div class="info">
                <p class="name ellipsis-2">{{ i.name }}</p>
                <p class="desc ellipsis">{{ i.desc }}</p>
                <p class="price"><i>¥</i>{{ i.price }}</p>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 分类推荐的弹层 - end -->
    </ul>
  </div>
</template>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    > li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: @xtxColor;
      }
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
