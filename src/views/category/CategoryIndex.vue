<script setup lang="ts">
import useStore from '@/stores'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import goodsItemVue from './components/goods-item.vue'
// 得到路径中的 id
let route = useRoute()
// let id = route.params.id
// 得到 cate store 模块
let { cate, home } = useStore()
let { getCateObj } = cate
let { getBannerList } = home
let { cateObj } = storeToRefs(cate)
let { bannerList } = storeToRefs(home)
// 侦听 id 的改变，如果 id 发生了改变，就需要重新发送请求
let unwatch = watchEffect(() => { // watchEffect 侦听响应式数据的变化
  let id = route.params.id
  // 判断当前路径
  if (route.fullPath === `/category/${id}`) {
    getCateObj(id as string)
    // 得到轮播图
    getBannerList()
  } else {
    unwatch()
  }
})
</script>
<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <XtxBread separator="/">
      <XtxBreadItem to="/home">首页</XtxBreadItem>
      <XtxBreadItem>{{ cateObj.name }}</XtxBreadItem>
    </XtxBread>
    <!-- 轮播图 -->
    <XtxCarousel
      :data="bannerList"
      :auto-play="true"
      :duration="2000"
      style="height: 500px"
    ></XtxCarousel>
    <!-- 所有二级分类 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="i in cateObj.children" :key="i.id">
          <a href="javascript:;">
            <img v-imglazy="i.picture" />
            <p>{{ i.name }}</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 分类关联商品 -->
    <div class="ref-goods" v-for="i in cateObj.children" :key="i.id">
      <div class="head">
        <h3>- {{ i.name }} -</h3>
        <p class="tag">温暖柔软，品质之选</p> 
        <XtxMore />
      </div>
      <div class="body">
        <goodsItemVue v-for="sub in i.goods" :key="sub.id" :data="sub" />
      </div>
    </div>
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
//分类关联商品样式
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
