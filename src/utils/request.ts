// 管理网络请求
import axios from 'axios'
// 创建 axios 副本对象
const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000
})
// 设置请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 设置响应拦截器
request.interceptors.response.use(
  response => {
    return response
  },
  err => {
    return Promise.reject(err)
  }
)
// 暴露对象
export default request

