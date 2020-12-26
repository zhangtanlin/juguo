import request from '@/plugins/axios'

/**
 * 登陆
 * @param {object} [data]          - 登陆参数
 * @param {string} [data.account]  - 账号
 * @param {string} [data.password] - 密码
 */
export const apiLogin = (data) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户列表
 * @param {*} params
 */
export const apiUsers = (params) => {
  return request({
    url: '/api/user',
    method: 'get',
    params
  })
}

/**
 * 新增用户
 * @param {*} params
 */
export const apiUserAdd = (data) => {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  })
}

/**
 * 编辑用户
 * @param {object} [data]    - 更新用户接口参数
 * @param {object} [data.id] - *用户id
 */
export const apiUserEdit = (data) => {
  return request({
    url: '/api/user/edit',
    method: 'post',
    data
  })
}

/**
 * 删除用户
 * @param {object} [data]    - 删除用户接口参数
 * @param {object} [data.id] - *用户id
 */
export const apiUserDelete = (data) => {
  return request({
    url: '/api/user/delete',
    method: 'delete',
    data
  })
}
