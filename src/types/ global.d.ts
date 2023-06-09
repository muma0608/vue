// 注册全局组件的类型
import XtxSkeleton from '@/components/skeleton/SkeletonIndex.vue'
import XtxCarousel from '@/components/carousel/carouselIndex.vue'
import XtxMore from '@/components/more/moreIndex.vue'
import XtxBread from '@/components/bread/breadIndex.vue'
import XtxBreadItem from '@/components/bread/breadItem.vue'
import XtxCity from '@/components/city/cityIndex.vue'
// 声明全局组件的类型
declare module 'vue' {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton
    XtxCarousel: typeof XtxCarousel
    XtxMore: typeof XtxMore
    XtxBread: typeof XtxBread
    XtxBreadItem: typeof XtxBreadItem
    XtxCity: typeof XtxCity
  }
}

