// 统一管理所有的 pinia store
import useCateStore from './modules/category'
import home from './home'
import useGoodsStore from './modules/goods'

export default function useStore () {
  return {
    cate: useCateStore(),
    home: home(),
    goods: useGoodsStore()

  }
}
