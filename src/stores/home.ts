// 管理 home 中所有的数据源
import request from '@/utils/request'
import { defineStore } from 'pinia'
import { TResult, TSwiper } from '@/types/category'
import { TGoods, THot, TBrand, ProductItem, SpecialItem } from '@/types/cate'

// defineStore  用来定义一个 store
const home = defineStore('home', {
  state: () => ({
    // 轮播图的数据源
    bannerList: [] as TSwiper[],
    // 新鲜好物
    newlist: [] as TGoods[],
    // 人气推荐
    hotList: [] as THot[],
    // 热门品牌
    brandList: [] as TBrand[],
    // 产品区域数据
    productList: [] as ProductItem[],
    // 最新专题数据
    specialList: [] as SpecialItem[]

  }),
  actions: {
    // 获取轮播图数据源
    async getBannerList() {
      const res = await request.get<TResult<TSwiper[]>>('/home/banner')
      // 保存数据
      this.bannerList = res.data.result
    },
    // 获取新鲜好物数据源
    async getNewList() {
      const res = await request.get<TResult<TGoods[]>>('/home/new')
      setTimeout(() => { 
        // 保存数据
        this.newlist = res.data.result
      }, 2000)

    },
    // 获取人气推荐数据源
    async getHotList() {
      const res = await request.get<TResult<THot[]>>('/home/hot')
      setTimeout(() => {
        // 保存数据
        this.hotList = res.data.result
      }, 2000)
    },
    // 获取热门品牌数据源
    async getBrandList() {
      const res = await request.get<TResult<TBrand[]>>('/home/brand')
      setTimeout(() => {
        this.brandList = res.data.result
      }, 2000)
    },
    // 得到产品区域的数据
    async getProductList() {
      const res = await request.get<TResult<ProductItem[]>>('/home/goods')
      this.productList = res.data.result
    },
    // 得到最新专题的数据
    async getSpecialList() {
      const res = await request.get<TResult<SpecialItem[]>>('/home/special')
      this.specialList = res.data.result
    }
  },
  getters: {}
})
export default home

