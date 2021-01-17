<template>
  <div class="user">
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
        <label>手机号码</label>
        <InputBox v-model:value="form.phone" placeholder="请输入手机号码" />
      </div>
      <div class="item-box">
        <label>邮箱</label>
        <InputBox v-model:value="form.email" placeholder="请输入邮箱" />
      </div>
      <div class="item-box">
        <label>区域代码</label>
        <InputBox v-model:value="form.area" placeholder="请输入区域代码" />
      </div>
      <div class="item-box">
        <label>是否激活</label>
        <SelectBox v-model:value="form.status" :list="selectStatus" />
      </div>
      <div class="item-box">
        <button class="btn" @click="getList">
          <i class="icon icon-search"></i>
          搜索
        </button>
      </div>
    </div>
    <div class="active">
      <router-link
        to="/system/user/add"
        class="btn"
      >
        <i class="icon-add"></i>
        新增
      </router-link>
    </div>
    <TableBox
      :list="list"
      :list-header="listHeader"
      :edit="edit"
      :del="del"
    />
    <div v-if="total">
      <PaginationBox
        :page="page"
        :size="pageSize"
        :total="total"
        :change-page="changePage"
        :change-size="changeSize"
      />
    </div>
  </div>
</template>

<script>
import { apiUsers } from '@/api/user'
import InputBox from '@/components/InputBox.vue'
import SelectBox from '@/components/SelectBox.vue'
import TableBox from '@/components/TableBox'
import PaginationBox from '@/components/PaginationBox'
import { removeEmpty } from '@/utils/tools'
export default {
  name: 'User',
  components: {
    InputBox,
    SelectBox,
    TableBox,
    PaginationBox
  },
  data () {
    return {
      // 是否激活
      selectStatus: [
        {
          id: '1',
          name: '已激活',
        },
        {
          id: '2',
          name: '未激活',
        }
      ],
      // 查询条件
      form: {
        account: '',
        name: '',
        phone: '',
        email: '',
        area: '',
        status: '',
      },
      // 分页
      page: 1,
      pageSize: 2,
      total: 0,
      // 弹出框是否显示
      popupShow: false,
      // 列表头部
      listHeader: [
        {
          name: 'ID',
          value: 'id'
        },
        {
          name: '账号',
          value: 'account'
        },
        {
          name: '名称',
          value: 'name'
        },
        {
          name: '电话',
          value: 'phone'
        },
        {
          name: '年龄',
          value: 'age'
        },
        {
          name: '区域id',
          value: 'area_id'
        },
        {
          name: '角色',
          value: 'roles'
        },
        {
          name: '状态',
          value: 'status'
        },
      ],
      // 列表
      list: [],
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    /**
     * 分页
     * @function changePage 切换页码
     * @function changeSize 切换每页显示的条数
     */
    changePage(page) {
      this.page = page
      this.getList()
    },
    changeSize(item) {
      if (Object.keys(item)) {
        this.page = 1
        this.pageSize = item.value
        this.getList()
      }
    },
    // 查询列表
    async getList() {
      const newForm = removeEmpty(this.form);
      const obj = Object.assign(newForm, {
        page: this.page,
        pageSize: this.pageSize
      });
      console.log('obj', obj)
      const getApiUsers = await apiUsers(obj)
      console.log('getApiUsers', getApiUsers)
      if (Array.isArray(getApiUsers.data.list)) {
        this.list = getApiUsers.data.list
        this.total = Number(getApiUsers.data.total)
      }
    },
    // 编辑
    edit(id) {
      if (id) {
        this.$router.push(`/system/user/edit/${id}`)
      }
    },
    // 删除
    del(id) {
      if (id) {
        console.log('删除id', id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.user {
  .active {
    display: flex;
    .btn {
      margin-right: 10px;
    }
  }
  .user-content {
    border: 1px solid #cecece;
  }
}
</style>