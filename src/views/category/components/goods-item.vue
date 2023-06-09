<script lang="ts" setup>
import { TGoods } from '@/types/cate'
defineProps<{
  data: TGoods
}>()
</script>
<template>
  <RouterLink :to="`/goods/${data.id}`" class="goods-item">
    <img v-imglazy="data.picture" alt="" />
    <p class="name ellipsis">{{ data.name }}</p>
    <p class="desc ellipsis">{{ data.desc }}</p>
    <p class="price">&yen;{{ data.price }}</p>
  </RouterLink>
</template>

<script lang="ts">
export default {
  name: 'GoodsItem'
}
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
