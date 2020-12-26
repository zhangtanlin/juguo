<template>
  <div class="sysUser">
    <!-- 查询条件 -->
    <el-row :gutter="10">
      <el-col :lg="4" :md="6" :sm="8" :xs="24" class="sysUserCol">
        <el-input
          v-model="form.account"
          clearable
          size="small"
          placeholder="账号"
        ></el-input>
      </el-col>
      <el-col :lg="4" :md="6" :sm="8" :xs="24" class="sysUserCol">
        <el-input
          v-model="form.name"
          clearable
          size="small"
          placeholder="用户名"
        ></el-input>
      </el-col>
      <el-col :lg="4" :md="6" :sm="8" :xs="24" class="sysUserCol">
        <el-input
          v-model="form.area_id"
          clearable
          size="small"
          placeholder="所属区域"
        ></el-input>
      </el-col>
      <el-col :lg="12" :md="6" :sm="8" :xs="24" class="sysUserCol">
        <el-button
          @click="getList"
          type="success"
          icon="el-icon-search"
          size="small"
        >
          查询
        </el-button>
        <el-button
          @click="handleClick('新增', 'Add')"
          type="danger"
          icon="el-icon-plus"
          size="small"
        >
          新增
        </el-button>
      </el-col>
    </el-row>
    <!-- 查询列表 -->
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="area_id"
        label="区域代码"
        align="center"
      ></el-table-column>
      <el-table-column prop="roles" label="角色" align="center">
        <!-- <template slot="scope">
          {{ scope.row.roles | filterRoles }}
        </template> -->
        <!-- <template slot-scope="scope">{{ scope.row.roles | filterRoles }}</template> -->
        <template slot-scope="scope">{{
          scope.row.roles | filterRoles
        }}</template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="账号状态"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="is_locked"
        label="是否锁定"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="is_disabled"
        label="是否禁用"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button
            @click="handleClick('查看', 'Show', scope.row)"
            type="success"
            size="mini"
            >查看</el-button
          >
          <el-button
            @click="handleClick('编辑', 'Edit', scope.row)"
            type="warning"
            size="mini"
            >编辑</el-button
          >
          <el-button @click="handlerDelete(scope.row)" type="danger" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="sPagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="prev, pager, next, sizes, total"
      ></el-pagination>
    </div>
    <!-- 弹出框内添加动态组件【使用is属性，加载不同组件（编辑/查看/新增）】 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <component
        :is="dialogComponent"
        :dialogForm="dialogForm"
        @childCancel="childCancel"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 导入
 * @requires [element-ui]    - 导入elementui相关组件
 * @requires [apiUsers]      - api列表
 * @requires [apiUserDelete] - api删除用户接口
 * @requires [Edit]          - 编辑组件
 * @requires [Add]           - 新增组件
 * @requires [Show]          - 查看组件
 */
import {
  Row,
  Col,
  Input,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Form,
  FormItem,
  Message,
  MessageBox
} from 'element-ui'
import { apiUsers, apiUserDelete } from '@/api/user'
import Add from './Add'
import Show from './Show'
import Edit from './Edit'
export default {
  layout: 'sys',
  name: 'SysUser',
  components: {
    elRow: Row,
    elCol: Col,
    elInput: Input,
    elSelect: Select,
    elOption: Option,
    elButton: Button,
    elTable: Table,
    elTableColumn: TableColumn,
    elPagination: Pagination,
    elDialog: Dialog,
    elForm: Form,
    elFormItem: FormItem,
    Edit,
    Show,
    Add
  },
  filters: {
    // 角色{1:超级管理员,2:操作员,3:审计员, 4:其他}
    filterRoles(value) {
      switch (value) {
        case '1':
          return '超级管理员'
        case '2':
          return '操作员'
        case '3':
          return '审计员'
        case '4':
          return '其他'
        default:
          return '未知'
      }
    }
  },
  data() {
    return {
      /**
       * 是或否状态
       */
      options: [
        {
          value: 0,
          label: '否'
        },
        {
          value: 1,
          label: '是'
        }
      ],
      /**
       * 查询条件
       * @param {string} [account] - 账户名
       * @param {string} [name]    - 姓名
       * @param {number} [area_id] - 区域代码
       */
      form: {
        account: undefined,
        name: undefined,
        area_id: undefined
      },
      /**
       * 列表
       */
      tableData: [],
      /**
       * 分页条件
       * @param {number} [currentPage] - 当前选中的页码
       * @param {number} [pageSize]    - 每页显示的条数
       * @param {array}  [pageSizes]   - 每页显示的条数可选条件
       * @param {number} [total]       - 总条数
       */
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      total: 0,
      /**
       * 弹出框
       * @param {string} [dialogVisible]   - 弹出框是否显示
       * @param {string} [dialogTitle]     - 弹出框标题【el-dialog的title】
       * @param {object} [dialogForm]      - 弹出框信息【当前表格行的信息】
       * @param {string} [dialogComponent] - 弹出框中的组件【Add/Edit/Show】
       */
      dialogVisible: false,
      dialogTitle: '',
      dialogForm: {},
      dialogComponent: ''
    }
  },
  created() {
    /**
     * 挂载
     * @function getList - 获取列表
     */
    this.getList()
  },
  methods: {
    /**
     * 界面上（新增/查看/编辑）按钮的事件【弹出框动态加载】
     * @param {string}  [title]     - 【参数】弹出框标题
     * @param {string}  [component] - 【参数】弹出框所调用的组件【Add/Edit/Show】
     * @param {object}  [row]       - 【参数】当前选中的信息行
     * @param {boolean} [dialogVisible]   - 弹出框是否显示
     * @param {string}  [dialogTitle]     - 弹出框标题
     * @param {object}  [dialogForm]      - 弹出框内展示的表单信息
     * @param {string}  [dialogComponent] - 弹出框调用的组件
     */
    handleClick(title, component, row) {
      this.dialogVisible = true
      this.dialogTitle = title
      this.dialogForm = row || {}
      this.dialogComponent = component
    },
    /**
     * 子组件内的关闭弹出框事件【子组件调用父组件的方法】
     * @param {boolean} [val]           - 【参数】子组件传递的是否显示弹出框的boolean参数
     * @param {boolean} [dialogVisible] - 弹出框是否显示
     * @param {number}  [currentPage]   - 页码
     * @function [getList] - 获取列表
     */
    childCancel(val) {
      this.dialogVisible = false
      this.currentPage = 1
      this.getList()
    },
    /**
     * 查询列表
     * @param {object} [obj]         - 查询列表接口需要的参数
     * @param {object} [getApiUsers] - api查询列表接口调用
     * @param {array}  [tableData]   - 列表【展示列表】
     * @param {number} [total]       - 列表总数
     */
    async getList() {
      const obj = Object.assign(
        this.form,
        { currentPage: this.currentPage },
        { pageSize: this.pageSize }
      )
      const getApiUsers = await apiUsers(obj)
      if (!!getApiUsers.data || Array.isArray(getApiUsers.data.list)) {
        this.tableData = getApiUsers.data.list
        this.total = getApiUsers.data.total
      }
    },
    /**
     * 切换页码时
     * @param {number} [currentPage] - 当前选中的页码
     * @function [getList] - 查询列表
     */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    /**
     * 改变每页显示条数时
     * @param {number} [currentPage] - 重置当前选中的页码
     * @param {number} [pageSize]    - 每页显示的条数
     * @function [getList] - 查询列表
     */
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getList()
    },
    /**
     * 删除
     * @param {object} [obj]         - 删除接口需要的参数
     * @api      [deleteApiUserDelete] - api删除用户接口
     * @param {number} [currentPage] - 页码
     * @function [getList]             - 获取用户列表
     */
    handlerDelete(row) {
      MessageBox.alert('确认删除该用户？', '删除用户', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: async (action) => {
          const obj = {
            id: row.id
          }
          const deleteApiUserDelete = await apiUserDelete(obj)
          if (deleteApiUserDelete.data) {
            Message.success('删除成功')
            this.currentPage = 1
            this.getList()
          } else {
            Message.info('删除失败')
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sysUser {
  // 当前组件内的el-col添加padding-bottom
  .sysUserCol {
    padding-bottom: 10px;
  }
}
</style>
