<script setup lang="ts">
// 测试数据
import useStore from '@/stores'
import { storeToRefs } from 'pinia'

let { cate } = useStore()
// 解构数据
let {cateList } = storeToRefs(cate)
// 解构方法
const { getCateList,show, hide } = cate
// 得到所有的分类数据
getCateList()
</script>
<template>
<ul class="app-header-nav">
  <li class="home"><RouterLink to="/home">首页</RouterLink></li>
  <!-- mouseenter 一级分类 -->
  <li 
    @mouseenter="show(item.id)"
    @mouseleave="hide(item.id)"
    @click="hide(item.id)"
    v-for="(item, index) in cateList"
    :key="index"
  >
    <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
    <!-- 添加二级分类结构 -->
    <div class="layer" :class="{ open: item.open }">
      <ul>
        <li @click="hide(item.id)" v-for="i in item.children" :key="i.id">
          <RouterLink :to="`/category/sub/${i.id}`">
            <img :src="i.picture" alt="" />
            <p>{{ i.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <!-- 添加二级分类结构 -->
  </li>
</ul>
</template>
<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    // 新增样式
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
// 新增样式
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>

