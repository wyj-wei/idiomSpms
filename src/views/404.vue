<template>
  <div class="error">
      <el-button @click="$router.go('-1')">返回上一页</el-button>
      <el-button @click="$router.push('./')">回到首页</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
</style>
 