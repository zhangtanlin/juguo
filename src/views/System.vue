<template>
  <div class="home">
    <header class="header">
      <div class="header-logo">
        <div
          :style="{ width: leftMenuWidth }"
          :class="[
            'header-logoBox',
            leftMenuWidth < 200 ? 'header-active' : ''
          ]"
        >
          <img src="@/assets/logo.png" alt="加载失败">
        </div>
        <Back/>
      </div>
      <div class="header-user">
        <SelectBox :show-border="false">
          <template v-slot:title>{{ userName }}</template>
          <template v-slot:options>
            <div v-for="(item, index) in selectList" :key="index">
              <div class="header-option">
                <i :class="item.icon"></i>
                <div class="header-option-text" @click="selectChange(item)">{{ item.name }}</div>
              </div>
            </div>
          </template>
        </SelectBox>
      </div>
    </header>
    <div class="content">
      <aside class="aside">
        <LeftMenu :menu="menu" />
      </aside>
      <main class="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { apiLogout } from '@/api/user'
import { apiMenu } from '@/api/resource'
import Back from '@/components/Back.vue'
import SelectBox from '@/components/SelectBox'
import LeftMenu from '@/components/LeftMenu'
import { getStorage, clearStorage } from '@/utils/storage.js'
export default {
  name: 'Home',
  components: {
    Back,
    SelectBox,
    LeftMenu
  },
  data() {
    return {
      // 下拉框
      selectList: [
        {
          id: '1',
          name: '用户',
          icon: 'icon-user',
          link: '/system/user'
        },
        {
          id: '2',
          name: '退出',
          icon: 'icon-exit'
        }
      ],
      // 菜单
      menu: [],
      leftMenuWidth: '200px',
      userName: getStorage('userName')
    }
  },
  mounted() {
    this.getMenu()
  },
  methods: {
    // 头部显示/隐藏左侧边栏
    showAside () {
      this.isCollapse = !this.isCollapse
      if (this.leftMenuWidth === '200px') {
        this.leftMenuWidth = '40px'
      } else {
        this.leftMenuWidth = '200px'
      }
    },
    //获取菜单
    async getMenu() {
      const getApiMenu = await apiMenu()
      if (Array.isArray(getApiMenu.data) && getApiMenu.data.length) {
        this.menu = getApiMenu.data
      }
    },
    // 下拉框
    async selectChange (item) {
      if (item.id === '1') {
        this.$router.push(item.link)
      }
      if (item.id === '2') {
        const getApiLogout = await apiLogout()
        if (getApiLogout) {
          clearStorage('token')
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.home {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  // 头部
  .header {
    height: 40px;
    border-bottom: 1px solid #cecece;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-logo {
      display: flex;
      align-items: center;
      .header-logoBox {
        height: 40px;
        width: 200px;
        text-align: center;
        transition: width 0.3s;
        transition-timing-function: ease-in-out;
        img {
          height: 30px;
          padding: 5px;
        }
      }
    }
    .header-user {
      padding-right: 10px;
      text-align: right;
      i {
        font-size: 25px;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
      .header-option {
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          color: #fff;
          background: $default-color;
        }
        i {
          font-size: 12px;
          margin-right: 5px;
        }
      }
      
    }
  }
  // 内容区
  .content {
    flex: 1;
    display: flex;
    // 菜单栏
    .aside {
      border-right: 1px solid #e6e6e6;
    }
    // 内容区
    .main {
      flex: 1;
      padding: 10px;
    }
  }
}
</style>
