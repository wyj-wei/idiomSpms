<template>
  <div class="home">
    <div class="home-body">
      <h3 class="title">欢迎使用在线管理后台</h3>
      <el-button @click="openWin" type="pramiry">进入</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Home extends Vue {
  openWin(): void {
    window.open("https://www.baidu.com");
  }
}
</script>

<style lang="scss" scoped>
.home-body {
  text-align: center;
  .title {
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 200px;
  }
}
</style>
 