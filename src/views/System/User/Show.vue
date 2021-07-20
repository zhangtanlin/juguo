<template>
  <div class="show">
    详情
    <div class="show-header">
      <div class="show-header">
        <div class="title">{{ title }}</div>
      </div>
      <div class="show-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserShow',
  data () {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.show {
  color: #ffff00;
  .show-header {
    height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #cecece;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        height: 24px;
        font-size: 12px;
        color: #000;
        cursor: pointer;
        &:hover {
          color: #ccc;
        }
      }
  }
}
</style>