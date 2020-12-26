<template>
  <div class="leftMenu">
    <div v-for="(item, index) in menu" :key="index">
      <el-submenu :index="index.toString()" v-if="item.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <left-menu :menu="item.children"></left-menu>
      </el-submenu>
      <el-menu-item :index="item.href" v-else>
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
/**
 * 导入
 * @requires [setSession] - 设置session
 */
import { MenuItem, Submenu } from 'element-ui'
export default {
  name: 'LeftMenu',
  components: {
    elMenuItem: MenuItem,
    elSubmenu: Submenu
  },
  props: {
    /**
     * 父节点传递的参数
     */
    menu: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      /**
       * 是否折叠测边栏
       */
      isCollapse: false
    }
  }
}
</script>

<style scoped>
/* 左侧菜单缩小时的样式 */
.el-menu--collapse .el-menu-item span,
.el-menu--collapse .el-submenu .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
