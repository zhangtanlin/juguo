// 文本框组件
<template>
  <div class="input-box">
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="change"
    />
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    // 默认选中值
    value: {
      type: [String, Number],
      default: ''
    },
    // 提示
    placeholder: {
      type: String,
      default: '请输入'
    },
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    change (e) {
      const value = e.target.value
      this.$emit('update:value', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-box {
  height: 32px;
  padding: 0 5px;
  border: 1px solid #cecece;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    height: 30px;
    line-height: 30px;
    border: none;
    outline: none;
  }
}
</style>
