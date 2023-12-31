import axios from 'axios'
import { ElMessage } from 'element-plus'

const request1 = axios.create({
  baseURL: 'http://101.43.241.101:63010/',
  timeout: 5000
})
// 请求拦截器
request1.interceptors.request.use((config) => {
  return config
})
// 响应拦截器
request1.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  // let status = error.response.status
  ElMessage({ type: error, message: error.message })
  return Promise.reject(new Error(error.message))
})
// 对外暴露
export default request1