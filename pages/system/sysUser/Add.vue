<template>
  <div class="sysUserAdd">
    <!-- 详情/编辑弹出框 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col
          :lg="{ offset: 8, span: 8 }"
          :md="{ offset: 4, span: 16 }"
          :sm="{ span: 24 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ offset: 8, span: 8 }"
          :md="{ offset: 4, span: 16 }"
          :sm="{ span: 24 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ offset: 8, span: 8 }"
          :md="{ offset: 4, span: 16 }"
          :sm="{ span: 24 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="确认密码" prop="verifyPassword">
            <el-input
              v-model="form.verifyPassword"
              type="password"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right;">
      <el-button @click="handleClose" type="warning">取消</el-button>
      <el-button @click="submitForm('form')" type="danger">新增</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 导入
 * @requires [element-ui] - 导入elementui相关组件
 * @api      [apiUserAdd] - api新增用户
 */
import {
  Dialog,
  Row,
  Col,
  Input,
  Select,
  Option,
  Button,
  Form,
  FormItem,
  Message
} from 'element-ui'
import { apiUserAdd } from '@/api/user'
export default {
  name: 'SysUserEdit',
  layout: 'sys',
  components: {
    elDialog: Dialog,
    elRow: Row,
    elCol: Col,
    elInput: Input,
    elSelect: Select,
    elOption: Option,
    elButton: Button,
    elForm: Form,
    elFormItem: FormItem
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
    }
  },
  data() {
    /**
     * 验证用户名
     */
    const accountFn = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9]{4,20}$/.test(this.form.account)) {
        callback(new Error('账号应为4-20位的数字字母'))
      }
      callback()
    }
    /**
     * 验证密码
     */
    const passwordFn = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9]{6,20}$/.test(this.form.password)) {
        callback(new Error('密码应为6-20位的数字字母'))
      }
      callback()
    }
    /**
     * 验证确认密码
     */
    const verifyPasswordFn = (rule, value, callback) => {
      if (/^s*$/g.test(this.form.verifyPassword)) {
        callback(new Error('验证码不能为空'))
      }
      if (this.form.verifyPassword !== this.form.password) {
        callback(new Error('密码和确认密码不一致'))
      }
      callback()
    }
    return {
      /**
       * 表单
       * @param {object} [form]                - 新增用户需要的参数
       * @param {string} [form.account]        - 账号
       * @param {string} [form.password]       - 密码
       * @param {string} [form.verifyPassword] - 确认密码
       */
      form: {
        account: '',
        password: '',
        verifyPassword: ''
      },
      /**
       * 表单验证规则
       */
      rules: {
        account: [
          { required: true, message: '请输入账号名', trigger: 'blur' },
          { validator: accountFn, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: passwordFn, trigger: 'blur' }
        ],
        verifyPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: verifyPasswordFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 取消/关闭弹出框按钮事件
     * @function [clearVerify] - 清除表单验证
     * @function [childCancel] - 父组件内关闭弹出框的方法
     */
    handleClose() {
      this.clearVerify()
      this.$emit('childCancel', false)
    },
    /**
     * 清除表单验证
     * @function [resetFields] - elementui表单重置，将所有字段值重置为初始值并移除校验结果
     */
    clearVerify() {
      this.$refs.form.resetFields()
    },
    /**
     * 新增
     * @api [postApiUserAdd]   - 新增用户
     * @function [clearVerify] - 清除验证规则
     * @function [handleClose] - 关闭弹出框
     */
    async submitForm(formName) {
      const that = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const postApiUserAdd = await apiUserAdd(this.form)
          if (
            typeof postApiUserAdd.data !== 'undefined' &&
            postApiUserAdd.data !== null
          ) {
            Message.success('新增成功')
            that.clearVerify()
            that.handleClose()
            return false
          }
          Message.error('新增失败')
        } else {
          return false
        }
      })
    }
  }
}
</script>
