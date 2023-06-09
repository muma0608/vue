// 管理分类导航的数据
import { defineStore } from 'pinia'
// 导入 axios
import request from '@/utils/request'
// 导入类型
import { TResult, TRes, TCate, TCateObj, TSubCateObj } from '@/types/cate'
// 导入默认分类数据
import { topNavCategory } from '../counter'
// import { ref } from 'vue'
// 将默认的分类数据转为对象
const defaultNav = topNavCategory.map(item => {
  return {
    name: item
  }
})
// 定义 cate 模块
const useCateStore = defineStore('cate', {
  state: () => ({
    test: '我是测试数据',
    // 头部分类数据
    cateList: defaultNav as TCate[],
    // 一级分类对象
    cateObj: {} as TCateObj,
    // 二级分类对象
    subCateObj: {} as TSubCateObj



  }),
  // 定义 actions
  actions: {
    // 获取头部分类数据
    async getCateList() {
      const res = await request.get<TResult>('/home/category/head')
      setTimeout(() => {
        // 保存数据源
        this.cateList = res.data.result
        // 给每条数据动态添加 open 属性
        this.cateList.forEach(item => {
          item.open = false
        })
      }, 2000)
    },// 显示二级分类结构
    show(id: string) {
      // 找到 id 对应的一级分类
      const cate = this.cateList.find(item => item.id === id)
      // 修改二级分类结构的状态
      cate!.open = true
    },
    // 隐藏二级分类结构
    hide(id: string) {
      // 找到 id 对应的一级分类
      const cate = this.cateList.find(item => item.id === id)
      // 修改二级分类结构的状态
      cate!.open = false
    },
    // 获取一级分类对象
    async getCateObj(id: string) {
      const res = await request.get<TRes<TCateObj>>(`/category?id=${id}`)
      this.cateObj = res.data.result
    },
    // 获取二级分类对象
    async getSubCateObj(id: string) {
      const res = await request.get<TRes<TSubCateObj>>(
        `/category/sub/filter?id=${id}`
      )
      this.subCateObj = res.data.result
    }
  },
  getters: {}
})


export default useCateStore