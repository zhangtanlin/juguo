<template>
  <div class="popup">
    <div class="popup-box">
      <div class="popup-header">
        <div class="title">{{ title }}</div>
        <div class="btn icon-close"></div>
      </div>
      <div class="popup-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '提示'
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.popup {
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.75);
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .popup-box {
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    .popup-header {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #cecece;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        color: #ccc;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
  }
  .popup-content {

  }
}
.popup-show {
  display: flex;
}
</style>
