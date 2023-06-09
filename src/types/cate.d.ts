// 定义类型
export type TResult = {
  code: string
  msg: string
  result: TCate[]
}
// 定义一个通用的返回数据类型
export type TRes<T> = {
  code: string
  msg: string
  result: T
}
// 一级分类
export type TCate = {
  id: string
  name: string
  picture: string
  children: TCate[]
  goods: TGoods[]
  open: boolean // 控制二级分类的显示与隐藏
}

export type TGoods = {
  id: string
  name: string
  desc: string
  price: string
  picture: string

}
// 人气推荐的数据类型
export type THot = {
  id: string
  picture: string
  title: string
  alt: string
}
// 热门品牌类型数据
export type TBrand = {
  id: string
  name: string
  logo: string
  picture: string
  type: null
  desc: string
  place: string
}
// 定义产品区域类型
export type ProductItem = {
  id: string
  name: string
  picture: string
  saleInfo: string
  children: {
    id: string
    name: string
    layer: number
    parent?: any
  }[]
  goods: TGoods[]
}
// 定义最新专题类型
export type SpecialItem = {
  classificationId: string
  collectNum: number
  cover: string
  createTime: string
  creator: string
  detailsUrl: string
  id: string
  isDelete: number
  lowestPrice: number
  replyNum: number
  summary: string
  title: string
  updateTime: string
  viewNum: number
}
// 定义一级分类类型
export type TCateObj = {
  id: string
  name: string
  picture: null
  children: TSubCateObj[]
}
// 定义二级分类类型
export type TSubCateObj = {
  id: string
  name: string
  picture: string
  parentId: string
  parentName: string
  goods: TGoods[]
  categories: {
    id: string
    name: string
    layer: number
    parent: null
  }[]
  brands: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type: null
    desc: string
    place: string
  }[]
  saleProperties: {
    id: string
    name: string
    properties: {
      id: string
      name: string
    }[]
  }[]
}
// 商品详情
export type TGoodsDetail = {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  brand: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type: null
    desc: null
    place: null
  }[]
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: string[]
  videoScale: number
  mainPictures: string[]
  specs: {
    name: string
    id: string
    values: {
      name: string
      picture: string
      desc: string
    }[]
  }[]
  skus: {
    id: string
    skuCode: string
    price: string
    oldPrice: string
    inventory: number
    specs: {
      name: string
      valueName: string
    }[]
  }[]
  categories: {
    id: string
    name: string
    layer: number
    parent: {
      id: string
      name: string
      layer: number
      parent: null
    }
  }[]
  details: {
    pictures: string[]
    properties: {
      name: string
      value: string
    }[]
  }[]
  isPreSale: boolean
  isCollect: null
  recommends: null
  userAddresses: null
  similarProducts: TGoods[]
  hotByDay: TGoods[]
  evaluationInfo: null
}


