// 定义一个通用的返回数据类型
export type TResult<T> = {
  code: string
  msg: string
  result: T
}
// 定义返回的轮播图的元素类型
export type TSwiper = {
  id: string
  imgUrl: string
  hrefUrl: string
  type: string
}




