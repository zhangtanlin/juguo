import request from '@/plugins/axios'

/**
 * 上传之前的验证
 * @param {object} [data]     - 参数
 * @param {string} [data.md5] - md5值
 */
export const apiUploadBefore = (data) => {
  return request({
    url: '/api/upload/before',
    method: 'post',
    data
  })
}
