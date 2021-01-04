<template>
  <div :class="[
    'table',
    showBorder ? 'border' : ''
  ]">
    <div v-if="listHeader && listHeader.length" class="table-header">
      <div
        v-for="(item, index) in listHeader"
        :key="index"
        class="table-header-list"
      >{{ item.name }}</div>
      <div class="table-header-list">操作</div>
    </div>
    <div
     v-if="list && list.length"
      class="table-content"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        class="table-list"
      >
        <template
          v-for="(obj, i) in listHeader"
          :key="i"
        >
          <div
            v-if="Object.keys(item).includes(obj.value)"
            class="table-item"
          >{{ item[obj.value] }}</div>
        </template>
        <div class="table-item">
          <button class="table-btn" @click="edit(item.id)">编辑</button>
          <button class="table-btn" @click="del(item.id)">删除</button>
        </div>
      </div>
    </div>
    <div v-else class="table-content">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    // 是否显示边框
    showBorder: {
      type: Boolean,
      default: true
    },
    // 头部
    listHeader: {
      type: Array,
      default: () => []
    },
    // 列表
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 编辑
    edit: {
      type: Function,
      default: () => {}
    },
    // 删除
    del: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.table {
  margin: 10px 0;
  padding: 10px;
  font-size: 14px;
  .table-header {
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #cecece;
    display: flex;
    .table-header-list {
      flex: 1;
      @include overflowEllipsis;
    }
  }
  .table-content {
    line-height: 30px;
    text-align: center;
    .table-list {
      padding: 5px 0;
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      justify-content: center;
      align-items: center;
      .table-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .table-btn {
          margin: 5px 5px 5px 0;
          padding: 2px 7px;
          font-size: 13px;
          color: #fff;
          background: #ff0000;
          cursor: pointer;
          &:hover {
            background: crimson;
          }
        }
      }
    }
  }
}
.border {
  border: 1px solid #cecece;
}
</style>
