import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use((config) => {
  return config
})
// 响应拦截器
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  // let status = error.response.status
  ElMessage({ type: error, message: error.message })
  return Promise.reject(new Error(error.message))
})
// 对外暴露
export default request