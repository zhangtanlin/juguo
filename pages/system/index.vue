<template>
  <div class="sysLogin">
    <div class="sysLoginBox">
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            type="primary"
            size="small"
            style="width: 100%;"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/**
 * 导入
 * @requires [setSession]   - 设置session
 * @requires [mapState]     - vuex获取数据方法
 * @requires [mapMutations] - vuex设置数据方法
 */
import { Form, FormItem, Input, Button } from 'element-ui'
import { apiLogin } from '@/api/user'
import { setSession } from '@/utils/session'
export default {
  name: 'SysLogin',
  components: {
    elForm: Form,
    elFormItem: FormItem,
    elInput: Input,
    elButton: Button
  },
  data() {
    return {
      /**
       * 登陆表单
       * @param {object} [form]          - 表单
       * @param {object} [form.account]  - 账号
       * @param {object} [form.password] - 密码
       */
      form: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    /**
     * 登陆
     * @api [postApiLogin] - 登陆接口调用
     * @function [setSession] - 把相关信息
     * @function [setToken]   - vuex设置user模块的token方法
     */
    async login() {
      const postApiLogin = await apiLogin(this.form)
      if (
        typeof postApiLogin.data !== 'undefined' &&
        postApiLogin.data !== null
      ) {
        setSession('token', postApiLogin.data.token)
        setSession('userName', this.form.account)
        this.$router.push('/system/home')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sysLogin {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
