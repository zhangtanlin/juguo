/**
 * @rquire [request] - 导入请求中间件【axios构建】
 */
import request from '@/utils/axios'

/**
 * 获取菜单
 * @param {*} params
 */
export const apiMenu = () => {
  return request({
    url: '/sys/resource/menu',
    method: 'post'
  })
}
