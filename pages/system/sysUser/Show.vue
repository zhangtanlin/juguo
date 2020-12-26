<template>
  <div class="sysUserShow">
    <!-- 详情/编辑弹出框 -->
    <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
      <el-row>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="账号:">
            {{ dialogForm.account || '暂无' }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="用户名:">
            {{ dialogForm.name || '暂无' }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="手机号码:">
            {{ dialogForm.phone || '暂无' }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="邮箱:">
            {{ dialogForm.email || '暂无' }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="年龄:">
            {{ dialogForm.age || '暂无' }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="区域id:">
            {{ dialogForm.area_id || '暂无' }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="是否激活:">
            {{ dialogForm.status | yesOrNo }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="是否锁定:">
            {{ dialogForm.is_locked | yesOrNo }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="是否禁用:">
            {{ dialogForm.is_disabled | yesOrNo }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="部门:">
            {{ dialogForm.department || '暂无' }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="公司:">
            {{ dialogForm.firm || '暂无' }}
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="头像:">
            {{ dialogForm.avatar || '暂无' }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
/**
 * 导入
 * @requires [element-ui] - 导入elementui相关组件
 */
import { Dialog, Row, Col, Form, FormItem } from 'element-ui'
export default {
  layout: 'sys',
  name: 'SysUserShow',
  components: {
    elDialog: Dialog,
    elRow: Row,
    elCol: Col,
    elForm: Form,
    elFormItem: FormItem
  },
  filters: {
    // 是/否状态
    yesOrNo(val) {
      switch (val) {
        case false:
          return '不'
        case true:
          return '是'
        default:
          return '未知'
      }
    }
  },
  props: {
    // 弹出框是否显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹出框title
    dialogTitle: {
      type: String,
      default: '编辑'
    },
    // 弹出框信息【父table组件的一行信息】
    dialogForm: {
      type: Object,
      default: () => {
        return {
          account: '',
          name: '',
          phone: '',
          email: '',
          age: '',
          area_id: '',
          status: '',
          is_locked: '',
          is_disabled: '',
          department: '',
          firm: '',
          avatar: ''
        }
      }
    }
  },
  methods: {
    /**
     * 取消/关闭弹出框按钮事件
     * @function [childCancel] - 父组件内关闭弹出框的方法
     */
    handleClose() {
      this.$emit('childCancel', false)
    }
  }
}
</script>
