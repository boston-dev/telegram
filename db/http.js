import axios from 'axios';
/**
 * @instance axios默认设置
 * @type {AxiosInstance}
 */
const http = axios.create({
  baseURL: 'https://freescatv.com',
  timeout: 60000,
  headers: { 'X-REQUESTED-WITH': 'XMLHttpRequest','Cache-Control': 'no-cache' }
})

/**
 * 请求拦截处理
 */
http.interceptors.request.use(req => {
  let defaultParams = {
    ajax:1 
  }
  req.params=Object.assign(defaultParams,req.params)
  return req
}, err => Promise.reject(err))

/**
 * 定义不触发toast的返回码
 * @type {number[]}
 */
const NOTOASTCODE = [
  380002, //pp支付失败
  380400
]
// 对数据返回进行拦截
http.interceptors.response.use(res => {

  return res.data
}, err => Promise.reject(err))

export default http