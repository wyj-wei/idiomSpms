<template>
  <div class="login-page">
    <div class="page-center">
      <div class="info">
        <span>管理平台</span>
      </div>
      <div class="container">
        <slot name="container"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import  from 'vue'
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class LayoutHeader extends Vue {}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;

  .page-center {
    position: absolute;
    width: 450px;
    height: 540px;
    margin: auto;
    top: 150px;
    right: 0;
    left: 0;
    .info {
      text-align: center;
      font-size: 32px;

      height: 50px;
    }
    .container {
      border-radius: 5px;
      background-clip: padding-box;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px soild #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
  }
}
</style>