/**
 * 导入
 * @function [getSession]   - sessionStorage获取指定值
 * @function [clearSession] - sessionStorage清除指定值
 * @requires [Message]      - elementui的消息提示组件
 */
import { getSession, clearSession } from '@/utils/session'
import { Message } from 'element-ui'
import axios from 'axios'
import env from '../env'

/**
 * 创建连接中间件
 */
const instance = axios.create({
  baseURL: env[process.env.NODE_ENV].ENV_API,
  timeout: 3000
})

/**
 * 请求之前
 * @function [getSession] - sessionStorage获取指定值
 */
instance.interceptors.request.use((config) => {
  config.headers.authorization = getSession('token') || ''
  return config
})

/**
 * 请求之后
 * @param {number} [response.status]    - 请求状态码【类似http请求状态吗】
 * @param {any}    [response.data]      - 后端接口返回的数据
 * @param {number} [response.data.code] - 后端接口请求状态码【自定义状态码】
 * @param {object} [res]                - 获取后端接口返回值【不含框架自带的状态码】
 */
instance.interceptors.response.use((response) => {
  const res = response.data
  // 根据返回的code值来做不同的处理(和后端约定)
  switch (res.code) {
    // 未登录 清除已登录状态
    case 401:
      clearSession('token')
      clearSession('userName')
      this.$router.push('/system')
      break
    // 没有权限
    case 403:
      if (res.message !== null) {
        Message.error(res.message)
      } else {
        Message.error('未知错误')
      }
      break
    // 服务器错误
    case 500:
      if (res.message !== null) {
        Message.error(res.message)
      } else {
        Message.error('未知错误')
      }
      break
    // 正常
    default:
      return res
  }
})

/**
 * 导出连接中间件
 */
export default instance
