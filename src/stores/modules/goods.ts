// 保存商品信息
import { defineStore } from 'pinia'
import request from '@/utils/request'
import { TRes, TGoodsDetail } from '@/types/cate'
const useGoodsStore = defineStore('goods', {
  state: () => ({
    // 商品数据源
    goodsObj: {} as TGoodsDetail
  }),
  actions: {
    // 获取商品数据源
    async getGoodsObj (id: string) {
      const res = await request.get<TRes<TGoodsDetail>>(`/goods?id=${id}`)
      this.goodsObj = res.data.result
    }
  }
})
export default useGoodsStore
