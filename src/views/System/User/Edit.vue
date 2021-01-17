<template>
  <div class="edit">
    <div class="form">
      <div class="item-box">
        <label>账号</label>
        <InputBox v-model:value="form.account" placeholder="请输入账号" />
      </div>
      <div class="item-box">
        <label>用户名</label>
        <InputBox v-model:value="form.name" placeholder="请输入用户名" />
      </div>
      <div class="item-box">
        <label>电话号码</label>
        <InputBox v-model:value="form.phone" placeholder="请输入电话号码" />
      </div>
      <div class="item-box">
        <label>年龄</label>
        <InputBox v-model:value="form.age" placeholder="请输入年龄" />
      </div>
      <div class="item-box">
        <label>区域id</label>
        <InputBox v-model:value="form.area_id" placeholder="请输入区域id" />
      </div>
      <div class="item-box">
        <label>部门</label>
        <InputBox v-model:value="form.department" placeholder="请输入部门" />
      </div>
      <div class="item-box">
        <label>公司</label>
        <InputBox v-model:value="form.firm" placeholder="请输入公司" />
      </div>
      <div class="item-box">
        <label>角色</label>
        <InputBox v-model:value="form.roles" placeholder="请输入角色" />
      </div>
      <div class="item-box">
        <label>是否激活</label>
        <SelectBox v-model:value="form.status" :list="selectStatus" />
      </div>
      <div class="item-box">
        <label>是否锁定</label>
        <SelectBox v-model:value="form.is_locked" :list="selectStatus" />
      </div>
      <div class="item-box">
        <label>是否禁用</label>
        <SelectBox v-model:value="form.is_disabled" :list="selectStatus" />
      </div>
      <div class="item-box">
        <button class="btn" @click="submit">
          <i class="icon icon-search"></i>
          提交
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUserById, apiUserEdit} from '@/api/user'
import InputBox from '@/components/InputBox.vue'
import SelectBox from '@/components/SelectBox.vue'
import { removeEmpty } from '@/utils/tools'
export default {
  name: 'User',
  components: {
    InputBox,
    SelectBox,
  },
  data () {
    return {
      // 是否激活
      selectStatus: [
        {
          id: 0,
          name: '否',
        },
        {
          id: 1,
          name: '是',
        }
      ],
      // 表单
      form: {
        id: this.$route.params.id,
        account: '',
        name: '',
        phone: '',
        age: '',
        area_id: '',
        status: '',
        is_locked: '',
        is_disabled: '',
        department: '',
        firm: '',
        roles: '',
      }
    }
  },
  created() {
    this.getListById()
  },
  methods: {
    // 根据id获取列表
    async getListById() {
      const getApiUserById = await apiUserById({id: this.form.id})
      this.form.account = getApiUserById.account
      this.form.account = getApiUserById.account
      this.form.name = getApiUserById.name
      this.form.phone = getApiUserById.phone
      this.form.age = getApiUserById.age
      this.form.area_id = getApiUserById.area_id
      this.form.status = getApiUserById.status
      this.form.is_locked = getApiUserById.is_locked
      this.form.is_disabled = getApiUserById.is_disabled
      this.form.department = getApiUserById.department
      this.form.firm = getApiUserById.firm
      this.form.roles = getApiUserById.roles
    },
    // 修改提交
    async submit() {
      const newForm = removeEmpty(this.form);
      const postApiUserEdit = await apiUserEdit(newForm)
      if (postApiUserEdit && postApiUserEdit.data) {
        console.log('编辑成功')
      } else {
        console.log('编辑失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.edit {}
</style>