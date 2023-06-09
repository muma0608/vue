// 管理所有的全局组件
import { App } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import XtxSkeleton from './skeleton/SkeletonIndex.vue'
import XtxCarousel from './carousel/carouselIndex.vue'
import XtxMore from './more/moreIndex.vue'
import XtxBread from './bread/breadIndex.vue'
import XtxBreadItem from './bread/breadItem.vue'
import XtxCity from './city/cityIndex.vue'
// 加入本地图片
import defaultImg from '@/assets/images/200.png'
// 将全局组件封装到插件中
export default {
  install (Vue: App) {
    // 全局注册组件
    Vue.component('XtxSkeleton', XtxSkeleton)
    Vue.component('XtxCarousel', XtxCarousel)
    Vue.component('XtxMore', XtxMore)
    Vue.component('XtxBread', XtxBread)
    Vue.component('XtxBreadItem', XtxBreadItem)
    Vue.component('XtxCity', XtxCity)
    // 注册自定义图片加载指令
    Vue.directive('imglazy', {
      mounted (el, binding) {
        // el：使用自定义指令的 dom 元素
        // binding.value：自定义指令使用时赋值的值
        // 判断 el 元素是否进入可视区
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 加载图片
            el.src = binding.value
            // 图片加载失败的事件
            el.onerror = function () {
              // 给图片设置默认图片
              el.src = defaultImg
            }
            // 一旦图片加载完毕后，应该停止判断
            stop()
          }
        })
      }
    })
  }
}

