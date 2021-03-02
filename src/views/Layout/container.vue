<template>
  <el-container class="layout-content">
    <!-- 左侧meun -->
    <el-aside width="200px">
      <slot name="left"></slot>
    </el-aside>
    <!-- 右侧内容 -->
    <el-main>
      <!-- 面包屑 -->
      <breadCrumb />
     
      <!-- 页面内容 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import breadCrumb from "./breadCrumb.vue";
import { Component, Vue, Provide } from "vue-property-decorator";
import { BreadcrumbItem } from "element-ui";
@Component({
  components: { breadCrumb }
})
export default class Content extends Vue {}
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .content {
      padding: 10px;
      height: 90%;
      box-sizing: border-box;
    }
  }
}
</style>
 