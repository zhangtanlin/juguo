<template>
  <div class="sysUserEdit">
    <!-- 详情/编辑弹出框 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="账号">
            <el-input v-model="form.account" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="用户名">
            <el-input v-model="form.name" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="邮箱">
            <el-input v-model="form.email" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="年龄">
            <el-input v-model="form.age" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="区域id">
            <el-input v-model="form.area_id" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="是否激活">
            <el-select
              v-model="form.status"
              size="mini"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="是否锁定">
            <el-select
              v-model="form.is_locked"
              size="mini"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="是否禁用">
            <el-select
              v-model="form.is_disabled"
              size="mini"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="部门">
            <el-input v-model="form.department" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="公司">
            <el-input v-model="form.firm" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 8 }"
          :md="{ span: 8 }"
          :sm="{ span: 12 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="角色">
            <el-select
              v-model="form.roles"
              size="mini"
              placeholder="请选择角色"
            >
              <el-option
                v-for="(item, index) in roles"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :lg="{ span: 24 }"
          :md="{ span: 24 }"
          :sm="{ span: 24 }"
          :xs="{ span: 24 }"
        >
          <el-form-item label="头像">
            <!-- 自定义分片上传 -->
            <MultipartUpload />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right;">
      <el-button @click="handleClose" type="warning">取消</el-button>
      <el-button @click="handleSubmit" type="danger">提交</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 导入
 * @requires [element-ui]      - 导入elementui相关组件
 * @requires [apiUserEdit]     - api编辑用户
 * @requires [apiRoles]        - api角色列表
 * @requires [MultipartUpload] - 自定义分片上传组件
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
import { apiUserEdit } from '@/api/user'
import { apiRoles } from '@/api/role'
import MultipartUpload from '@/components/MultipartUpload'
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
    elFormItem: FormItem,
    MultipartUpload
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
  data() {
    return {
      // 是或否状态
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
       * 角色
       * @param {array}  [roles] - 角色列表
       * @param {string} [roles.value] - 角色id
       * @param {string} [roles.labek] - 角色名
       */
      roles: [],
      /**
       * 编辑表单
       */
      form: {
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
  },
  watch: {
    /**
     * 监听父节点传过来的dialogForm
     * @function [handler] - watch自带的监听方法
     * @param {boolean} [deep]      - 是否深度监听
     * @param {boolean} [immediate] - 是否立即执行
     */
    dialogForm: {
      handler(newVal, oldVal) {
        this.form = newVal
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    /**
     * 挂载
     * @function [getRoles] - 获取角色列表
     */
    this.getRoles()
  },
  methods: {
    /**
     * 获取角色列表
     * @api [getApiRoles] - api获取角色列表
     * @param {object} [obj]       - 把后端返回的数据进行解构
     * @param {string} [obj.value] - 角色id【注意后端返回的是数值，但是这里显示需要字符串】
     * @param {string} [obj.label] - 角色名
     */
    async getRoles() {
      const getApiRoles = await apiRoles()
      if (!!getApiRoles.data && Array.isArray(getApiRoles.data.list)) {
        this.roles = []
        for (const iterator of getApiRoles.data.list) {
          const obj = {
            value: String(iterator.id),
            label: iterator.name
          }
          this.roles.push(obj)
        }
      }
    },
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
     * @function [clearValidate] - elementui清除验证方法
     */
    clearVerify() {
      this.$refs.form.clearValidate()
    },
    /**
     * 编辑
     * @param {object} [obj] - 编辑接口需要的参数
     * @api      [postApiUserEdit] - api编辑接口
     * @function [clearVerify]     - 清除验证规则并初始化数据
     * @function [handleClose]     - 关闭弹出框
     */
    async handleSubmit() {
      const obj = Object.assign(this.form, {
        id: Number(this.form.id) || undefined,
        age: Number(this.form.age) || undefined,
        status: Number(this.form.status) || undefined,
        is_locked: Number(this.form.is_locked) || undefined,
        is_disabled: Number(this.form.is_disabled) || undefined
      })
      const postApiUserEdit = await apiUserEdit(obj)
      if (postApiUserEdit.data) {
        Message.success('编辑成功')
        this.clearVerify()
        this.handleClose()
      } else {
        Message.error('编辑失败')
      }
    }
  }
}
</script>
