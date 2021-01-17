<template>
  <div class="add">
    <div class="add-box">
      <form>
        <div class="list">
          <label for="account">用户名</label>
          <div class="input-box">
            <input
              v-model="account"
              id="account"
              type="text"
              name="account"
              autocomplete="on"
              placeholder="请输入用户名"
            >
          </div>
        </div>
        <div class="prompt">{{ promptAccount }}</div>
        <div class="list">
          <label for="pwd">密码</label>
          <div class="input-box">
            <input
              v-model="password"
              id="pwd"
              type="password"
              name="password"
              autocomplete="on"
              placeholder="请输入用户名"
            >
          </div>
        </div>
        <div class="prompt">{{ promptPassword }}</div>
        <div class="list">
          <label for="verify-pwd">确认密码</label>
          <div class="input-box">
            <input
              v-model="verifyPassword"
              id="verify-pwd"
              type="password"
              name="verifyPassword"
              autocomplete="on"
              placeholder="请输入用户名"
            >
          </div>
        </div>
        <div class="prompt">{{ promptVerifyPassword }}</div>
        <div class="submit-button" @click="submit">提交</div>
      </form>
    </div>
  </div>
</template>

<script>
import { apiUserAdd } from '@/api/user'
export default {
  name: 'Add',
  data () {
    return {
      account: '',
      password: '',
      verifyPassword: '',
      promptAccount: '',
      promptPassword: '',
      promptVerifyPassword: ''
    }
  },
  methods: {
    // 提交
    async submit() {
      const reg = /^\s*$/g; // 为空
      let status = true; // 状态
      if (reg.test(this.account)) {
        this.promptAccount = '用户名不能为空'
        status = false
      }
      if (reg.test(this.password)) {
        this.promptPassword = '密码不能为空'
        status = false
      }
      if (this.password !== this.verifyPassword) {
        this.promptVerifyPassword = '两次密码输入不一致'
        status = false
      }
      if (status) {
        const obj = {
          account: this.account,
          password: this.password
        }
        const postApiUserAdd = await apiUserAdd(obj)
        if (
          postApiUserAdd &&
          postApiUserAdd.data
        ) {
          this.$router.push('/system/user')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .add-box {

  }
  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    label {
      width: 6rem;
      margin-right: 1rem;
      font-size: 14px;
      text-align: right;
      color: #000;

    }
    .input-box {
      padding: 7px 10px;
      background: #fff;
      border: 1px solid #ccc;
    }
  }
  .prompt {
    height: 22px;
    line-height: 22px;
    padding-left: 7rem;
    font-size: 12px;
    color: #ff0000;
  }
  .submit-button {
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-left: 7rem;
    color: #fff;
    background: #F7992B;
    cursor: pointer;
    &:hover {
      background: #e6a23c;
    }
  }
}
</style>