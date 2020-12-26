/**
 * @rquire [request] - 导入请求中间件【axios构建】
 */
import request from '@/plugins/axios'

/**
 * 获取菜单
 * @param {*} params
 */
export const apiMenu = (params) => {
  return request({
    url: '/api/resource/menu',
    method: 'get',
    params
  })
}
