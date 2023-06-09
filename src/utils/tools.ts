// 专门用来封装额外的辅助方法
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// 实现数据的懒加载
export function dataLazy(callback: () => void) {
    // 获取 dom 元素
    const target = ref<HTMLElement | null>(null)
    // 侦听元素是否出现在可视区域
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            if (isIntersecting) {
                console.log('useIntersectionObserver')
                // 执行逻辑代码
                callback()
                stop()
            }
        },
        {
            threshold: 0 // 让元素只要有一个像出现在可视区域中时就会触发函数
        }
    )
    // 返回 target
    return target
}

