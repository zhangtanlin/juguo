<!-- 管理系统布局 -->
<template>
  <div class="sLayout">
    <el-container class="sContainer">
      <el-header class="sHeader" height="40px">
        <div class="sHeaderBox">
          <div class="sHeaderLogo">
            <div v-bind:style="{ width: leftMenuWidth }" class="sHeaderLogoBox">
              <!-- <img src="~assets/image/squarelogo.png" alt="加载失败" /> -->
            </div>
            <div class="sHeaderActive">
              <i @click="showAside" class="el-icon-s-grid"></i>
            </div>
          </div>
          <div class="sHeaderUser">
            <el-dropdown :hide-on-click="false" @command="changeDropdown">
              <i class="el-icon-user-solid"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container class="sInnerContainer">
        <el-aside width="initial" class="sAside">
          <el-menu :collapse="isCollapse" :router="true" class="sMenu">
            <LeftMenu :menu="menu" />
          </el-menu>
        </el-aside>
        <el-main class="sMain">
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
/**
 * 导入
 * @requires [element-ui]   - element相关组件
 * @requires [apiMenu]      - api获取菜单接口
 * @requires [LeftMenu]     - 左侧菜单栏
 * @requires [clearSession] - 清除sessionStorage
 */
import {
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MessageBox,
  Message
} from 'element-ui'
import { apiMenu } from '@/api/resource'
import LeftMenu from '@/components/LeftMenu'
import { clearSession } from '../utils/session'
export default {
  components: {
    elContainer: Container,
    elAside: Aside,
    elHeader: Header,
    elMain: Main,
    elMenu: Menu,
    elDropdown: Dropdown,
    elDropdownMenu: DropdownMenu,
    elDropdownItem: DropdownItem,
    LeftMenu
  },
  data() {
    return {
      // 是否折叠侧边栏菜单栏
      isCollapse: false,
      // 菜单
      menu: [],
      leftMenuWidth: '200px'
    }
  },
  mounted() {
    /**
     * 挂载
     * @function [getMenu] - 获取菜单列表
     */
    this.getMenu()
  },
  methods: {
    /**
     * 头部显示/隐藏左侧边栏
     */
    showAside() {
      this.isCollapse = !this.isCollapse
      if (this.leftMenuWidth === '200px') {
        this.leftMenuWidth = '65px'
      } else {
        this.leftMenuWidth = '200px'
      }
    },
    /**
     * 获取菜单
     * @api [apiMenu] - 获取菜单接口的返回值
     * @param {object} [getApiMenu] - 获取菜单接口的返回值
     */
    async getMenu() {
      const getApiMenu = await apiMenu()
      if (Array.isArray(getApiMenu.data) && getApiMenu.data.length) {
        this.menu = getApiMenu.data
      } else {
        console.log('妈蛋数据错了')
      }
    },
    /**
     * 用户信息下拉框选择事件
     * @param  {string} [argument] - dropdownItem的command属性值
     */
    async changeDropdown(argument) {
      if (argument === 'logout') {
        // 退出
        MessageBox.alert('确认退出当前登陆?', '温馨提示', {
          confirmButtonText: '确定',
          callback: async (action) => {
            try {
              const { data } = await this.$axios.delete('/api/user/logout')
              if (typeof data !== 'undefined' && data !== null && data) {
                clearSession('userName')
                clearSession('token')
                this.$router.push('/system')
              }
            } catch (error) {
              Message.success('退出失败')
            }
          }
        })
      } else {
        console.log('其他', argument)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sContainer {
  background-color: #fff;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  // 头部
  .sHeader {
    padding: 0;
    border-bottom: 1px solid #cecece;
    .sHeaderBox {
      display: flex;
      align-items: center;
      .sHeaderLogo {
        display: flex;
        align-items: center;
        .sHeaderLogoBox {
          height: 40px;
          width: 200px;
          background-color: #ffb000;
          text-align: center;
          transition: width 0.3s;
          transition-timing-function: ease-in-out;
          img {
            height: 100%;
          }
        }
        .sHeaderActive {
          font-size: 20px;
          padding-left: 10px;
          i {
            cursor: pointer;
            font-weight: bolder;
          }
        }
      }
      .sHeaderUser {
        flex: 1;
        padding-right: 10px;
        text-align: right;
        i {
          font-size: 25px;
          cursor: pointer;
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
  .sInnerContainer {
    flex: 1;
    width: 100%;
    overflow: auto;
    // 菜单栏
    .sAside {
      background-color: #343d41;
      border-right: 1px solid #e6e6e6;
      .sMenu {
        border-right-width: 0;
        &:not(.el-menu--collapse) {
          width: 200px;
        }
      }
    }
    // 内容区
    .sMain {
      padding: 10px;
    }
  }
}
</style>
