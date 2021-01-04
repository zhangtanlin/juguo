/**
 * 导入
 * @function [getStorage]   - storageStorage获取指定值
 * @function [clearStorage] - storageStorage清除指定值
 * @requires [Message]      - elementui的消息提示组件
 */
import { getStorage, clearStorage } from '@/utils/storage'
import axios from 'axios'
import config from '../config'

/**
 * 创建连接中间件
 */
const instance = axios.create({
  baseURL: config[process.env.NODE_ENV].ENV_API,
  timeout: 3000
})

/**
 * 请求之前
 * @function [getStorage] - storageStorage获取指定值
 */
instance.interceptors.request.use((request) => {
  request.headers.authorization = getStorage('token') || ''
  return request
})

/**
 * 请求之后
 * @param {number} [response.status]    - 请求状态码【类似http请求状态吗】
 * @param {any}    [response.data]      - 后端接口返回的数据
 * @param {number} [response.data.code] - 后端接口请求状态码【自定义状态码】
 * @param {object} [res]                - 获取后端接口返回值【不含框架自带的状态码】
 */
instance.interceptors.response.use((response) => {
  if (response && response.status !== 200) {
    clearStorage('token')
    clearStorage('user-info')
    window.location.href = '/'
    return
  }
  return response.data
})

/**
 * 导出连接中间件
 */
export default instance
