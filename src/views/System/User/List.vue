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
      <div class="btn" @click="add()"><i class="icon-add"></i>新增</div>
    </div>

    <!-- 列表行 -->
    <TableBox
      :list="list"
      :list-header="listHeader"
      @on-edit="edit"
      @on-detail="det"
      @on-delete="del"
    />

    <!-- 分页 -->
    <div v-if="total">
      <PaginationBox
        :page="page"
        :size="pageSize"
        :total="total"
        :change-page="changePage"
        :change-size="changeSize"
      />
    </div>

    <!-- 弹出框 -->
    <popup-box :show="popupShow" @on-change="changePopup">
      <UserAdd
        v-if="type==1"
        @on-submit="addSubmit"
      />
      <UserEdit
        v-else-if="type==2"
      />
      <UserShow
        v-else
      />
    </popup-box>

  </div>
</template>

<script>
import { apiUsers, apiUserAdd } from '@/api/user'
import InputBox from '@/components/InputBox.vue'
import SelectBox from '@/components/SelectBox.vue'
import TableBox from '@/components/TableBox'
import PaginationBox from '@/components/PaginationBox'
import { removeEmpty } from '@/utils/tools'
import PopupBox from '@/components/PopupBox.vue'
import Add from './Add.vue'
import Edit from './Edit.vue'
import Show from './Show.vue'
export default {
  name: 'List',
  components: {
    InputBox,
    SelectBox,
    TableBox,
    PaginationBox,
    PopupBox,
    UserAdd: Add,
    UserEdit: Edit,
    UserShow: Show,
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
          value: 'area'
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
      // 弹出框
      popupShow: false, // 弹出框是否显示
      type: 0, // 当前显示的内容{0: 详细信息，1:新增，2:编辑}
      detail: {}, // 详情信息
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 分页
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
      const getApiUsers = await apiUsers(obj)
      if (Array.isArray(getApiUsers.data.list)) {
        this.list = getApiUsers.data.list
        this.total = Number(getApiUsers.data.total)
      }
    },
    // 新增
    add() {
      this.type = 1;
      this.changePopup();
    },
    // 新增（弹出框-新增-提交）
    async addSubmit(data) {
      let tempData = {
        account: data.account,
        password: data.password,
      };
      const postApiUserAdd = await apiUserAdd(tempData);
      if (
        postApiUserAdd &&
        postApiUserAdd.data
      ) {
        console.log('新增成功', data)
        this.changePopup()

      }
    },
    // 编辑
    edit(id) {
      this.list.forEach(element => {
        if (element.id === id) {
          this.detail = element;
        }
      });
      this.changePopup();
      this.type = 2;
    },
    // 详情
    det(id) {
      this.list.forEach(element => {
        if (element.id === id) {
          this.detail = element;
        }
      });
      this.changePopup();
      this.type = 0;
    },
    // 删除
    del(id) {
      console.log('删除', id);
    },
    // 切换弹出框状态
    changePopup() {
      this.popupShow = !this.popupShow ?? false;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.user {
  width: 100%;
  height: 100%;
  position: relative;
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