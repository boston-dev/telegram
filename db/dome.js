const axios=require('axios')
/**
 * @instance axios默认设置
 * @type {AxiosInstance}
 */
const http = axios.create({
  timeout: 60000,
  headers: { 'X-REQUESTED-WITH': 'XMLHttpRequest','Cache-Control': 'no-cache' }
})
http.get('https://www.javdove8.xyz/search/videos?search_query=%E6%AF%8D%E4%B9%B3').then(res =>{
  console.log(res.data)
})
