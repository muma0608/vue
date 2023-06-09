<script setup lang="ts">
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
let route = useRoute()
let { cate } = useStore()
let { getSubCateObj } = cate
let { subCateObj } = storeToRefs(cate)
// 调用方法得到数据
//  侦听页面的路由的改变
watchEffect(() => {
  // 得到 id
  let id = route.params.id as string
  // 获取数据源
  getSubCateObj(id)
})
</script>
<template>
  <!-- 二级分类页面 -->
  <div class="container">
    <!-- 面包屑导航区域 -->
    <XtxBread>
      <XtxBreadItem to="/home">首页</XtxBreadItem>
      <XtxBreadItem :to="`/category/${subCateObj.parentId}`">
        {{ subCateObj.parentName }}
      </XtxBreadItem>
      <XtxBreadItem>{{ subCateObj.name }}</XtxBreadItem>
    </XtxBread>
    <!-- 筛选区 -->
    <!-- 商品展示区 -->
  </div>
</template>
<style scoped lang="less">
h3 {
  font-size: 28px;
  color: #666;
  font-weight: normal;
  text-align: center;
  line-height: 100px;
}
.sub-list {
  margin-top: 20px;
  background-color: #fff;
  ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;
    li {
      width: 168px;
      height: 160px;
      a {
        text-align: center;
        display: block;
        font-size: 16px;
        img {
          width: 100px;
          height: 100px;
        }
        p {
          line-height: 40px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
