<template>
  <div class="left-menu">
    <div
      v-for="(item, index) in menu"
      :key="index"
      class="list"
    >
      <div
        v-if="item.children"
        :index="index.toString()"
      >
        <div
          :class="[
            'list-title',
            item.id === checkedId ? 'list-active' : ''
          ]"
          @click="showChild(item.id)"
        >
          <i :class="`icon ${item.icon}`" />
          <span>{{ item.name }}</span>
        </div>
        <div
          :class="[
            'list-box',
            item.id === checkedId ? 'list-box-active' : ''
          ]"
        >
          <left-menu :menu="item.children" />
        </div>
      </div>
      <router-link v-else :to="item.href" class="list-link">
        <i :class="`icon ${item.icon}`" />
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftMenu',
  props: {
    //父节点传递的参数
    menu: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      // 选中的值
      checkedId: 0
    }
  },
  methods: {
    // 显示子组件
    showChild(id) {
      this.checkedId = 0;
      this.checkedId = id
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu {
  text-align: center;
  .list {
    width: 200px;
    line-height: 40px;
    .list-title,
    .list-link {
      width: 100%;
      height: 100%;
      color: #000;
      text-decoration: none;
      display: block;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #F7992B;
      }
    }
    .list-active {
      color: #fff;
      background: #F7992B;
    }
    .list-box {
      height: 0;
      overflow: hidden;
      transition: height 3s;
    }
    .list-box-active {
      height: auto;
    }
    .icon {
      margin-right: 10px;
    }
  }
}
</style>
