<script lang="ts">
export default {
  name: 'GoodsInfo'
}
</script>
<script lang="ts" setup>
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
// 图片组件
import goodsImageVue from './components/goods-image.vue'
import goodsSalesVue from './components/goods-sales.vue'
// import goodsNameVue from './components/goods-name.vue'
let route = useRoute()
let { goods } = useStore()
let { getGoodsObj } = goods
let { goodsObj } = storeToRefs(goods)
// 接受一个回掉函数作为参数  可以追踪回掉函数的响应式数据，数据变化重新进行函数回掉
watchEffect(() => {
  let id = route.params.id as string
  getGoodsObj(id)
})
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/home">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goodsObj.categories?.[1]?.id}`">
          {{ goodsObj.categories?.[1]?.name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goodsObj.categories?.[0]?.id}`">
          {{ goodsObj.categories?.[0]?.name }}
        </XtxBreadItem>
        <XtxBreadItem to="/">{{ goodsObj.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 左 -->
        <div class="media">
          <goodsImageVue :data="goodsObj.mainPictures"></goodsImageVue>
          <goodsSalesVue></goodsSalesVue>
        </div>
        <!-- 右 -->
        <div class="spec">
          <goodsNameVue :data="goodsObj"></goodsNameVue>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
