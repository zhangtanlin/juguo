<template>
  <client-only>
    <div class="error">
      <div class="errorBox">
        <div class="banner">
          <img src="~assets/image/404.png" alt="加载失败" />
        </div>
        <h3>抱歉!您所访问的网页不存在</h3>
        <h6>请检查您输入的网址是否正确</h6>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style lang="scss" scoped>
// 错误界面
.error {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: wrap;
  align-content: center;
  justify-content: center;
  .errorBox {
    color: #fff;
    text-align: center;
    .banner {
      img {
        width: 20vw;
        height: auto;
      }
    }
    h3 {
      margin-bottom: 10px;
      font-weight: inherit;
    }
    h6 {
      margin-top: 0;
      font-weight: inherit;
    }
    .active {
      margin-top: 30px;
      a {
        color: #31c5ff;
      }
    }
  }
}
</style>
