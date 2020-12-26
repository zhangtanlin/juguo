/**
 * 导入
 * @requires [Toast]        - vant的弹出提示框组件
 * @requires [getSession]   - sessionStorage获取指定值
 * @requires [setSession]   - sessionStorage保存指定值
 * @requires [clearSession] - sessionStorage清除指定值的
 * @requires [axios]        - axios方法
 * @require  [env]          - 导入环境变量
 */
import { Toast } from 'vant'
import axios from 'axios'
import env from '../env'
import { getSession, setSession, clearSession } from '~/utils/session.js'
/**
 * 验证是否有token【有就不进行操作，没有就请求token】
 * @function  [verifyToken] - 验证是否有token的函数
 * @pfunction [setSession] - 发起注册【请求接口，获取token】
 * @param {array}   [isTokenArr]     - 没有token的请求
 * @param {boolean} [isRegistering]  - 当前请求是否在注册【当前请求是否带有token】
 * @param {promise} [resolve]        - 当前请求【异步】
 * @param {string}  [envSlice]       - 截取当前环境的前三个长度【dev（开发）/pro（生产）】
 * @param {string}  [verifyTokenUrl] - 请求token的url
 * @param {promise} [getNewToken]    - 发起注册【请求接口，获取token】
 */
let isTokenArr = []
let isRegistering = false
function register() {
  if (process.client) {
    return new Promise(async (resolve) => {
      isTokenArr.push(resolve)
      if (!isRegistering) {
        isRegistering = true
        try {
          const envSlice = process.env.NODE_ENV.slice(0, 3)
          const verifyTokenUrl =
            env[envSlice].ENV_API + '/api/traveler/register'
          const getNewToken = await axios({
            url: verifyTokenUrl,
            method: 'post'
          })
          setSession('token', getNewToken.data.data.token)
        } catch (error) {
          return Promise.reject(error || '接口调用失败')
        } finally {
          isTokenArr.forEach((item) => {
            item()
          })
          isTokenArr = []
        }
      }
    })
  }
}
/**
 * axios拦截器【请求之前】
 * @function [register] - 请求注册方法【获取token方法】
 */
export default function({ $axios, redirect }) {
  /**
   * 请求之前
   * @function [getSession]         - sessionStorage获取指定值
   * @function [setSession]         - sessionStorage保存指定值
   * @param {string} [surroundings] - 获取环境变亮的前三个值【dev:开发环境,pro:生产环境】
   * @api      [verifyHasToken]     - 如果没有客户端没有token，就请求token的接口
   */
  $axios.interceptors.request.use(
    async (config) => {
      if (!getSession('token')) {
        await register(config)
      }
      config.headers.Authorization = getSession('token')
      return config
    },
    (error) => {
      return Promise.reject(error || '接口调用失败')
    }
  )
  /**
   * 请求之后
   * @param {number} [response.status]    - 请求状态码【类似http请求状态吗】
   * @param {number} [response.data.code] - 后端接口请求状态码【自定义状态码】
   */
  $axios.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.code === 200) {
        return response
      }
      // token错误
      if (response.data.code === 1002 || response.data.code === 5005) {
        clearSession('token')
        clearSession('userInfo')
        window.location.href = '/'
      }
      return Promise.reject(response.data.msg || '接口调用失败')
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  /**
   * 请求异常处理
   * @requires [Toast] - vant的弹出提示框组件
   */
  $axios.onError((error) => {
    Toast({
      type: 'fail',
      message: error
    })
    const code = parseInt(error.response && error.response.status)
    // 404错误
    if (code === 400) {
      redirect('/400')
    }
    // 500错误
    if (code === 500 || code === 504) {
      redirect('/500')
    }
  })
}
