import request from '@/plugins/axios'

/**
 * 获取角色列表【可以有分页条件，没有分页条件就查询全部】
 * @param {object} [params]             - 分页查询条件
 * @param {number} [params.id]          - 角色id
 * @param {string} [params.name]        - 角色名称
 * @param {string} [params.type]        - 角色类型【{1:表示超级管理员，2:操作员，3:审计员, 4:其他}枚举是从1开始】
 * @param {number} [params.currentPage] - 页码
 * @param {number} [params.pageSize]    - 每页显示的条数
 */
export const apiRoles = (params) => {
  return request({
    url: '/api/role',
    method: 'get',
    params
  })
}
