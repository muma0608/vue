<script lang="ts">
export default {
  name: 'XtxCity'
}
</script>
<script lang="ts" setup>
// 控制下拉面板的显示与隐藏
import { ref,watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
let active = ref(false)
// 设置面板显示与隐藏
function toggle() {
  active.value = !active.value
}
// 设置 dom 元素
let target = ref(null)
// 点击其他地方，关闭面板 onClickOutside 用来判断点击的元素是否在指定的元素内
onClickOutside(target, () => {
  // 关闭选择框
  active.value = false
})
// 定义城市类型
type TCity = {
  code: string
  level: number
  name: string
  areaList: TCity[]
}
// 城市数据源
let cityList = ref<TCity[]>([])
// 备份城市数据源
let cacheList = ref<TCity[]>([])
// 获取城市数据源
async function getCityList () {
  let res = await axios.get<TCity[]>(
    'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
  )
  cityList.value = res.data
  cacheList.value = res.data
}
getCityList()
// 修改数据源（省->市，市->区，区->关闭面板）
function changeCity (city: TCity) {
  console.log(city)
  // 判断
  if (city.level === 0) {
    //  点击省
    // 数据源设置为点击省下的市
    cityList.value = city.areaList
  } else if (city.level === 1) {
    // 点击市
    // 数据源设置为点击市下的区
    cityList.value = city.areaList
  } else if (city.level === 2) {
    // 点击区
    // 关闭面板
    active.value = false
  }
}
// 侦听面板是否关闭，如果关闭，重置数据源
watchEffect(() => {
  if (!active.value) {
    cityList.value = cacheList.value
  }
})
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
  <span
    @click="changeCity(i)"
    class="ellipsis"
    v-for="i in cityList"
    :key="i.code"
  >
    {{ i.name }}
  </span>
</div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
