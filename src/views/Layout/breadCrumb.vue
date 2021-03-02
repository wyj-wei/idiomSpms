<template>
  <div class="top">
    <i class="fa fa-reorder"></i>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        :to="{path:item.path}"
        v-for="(item,index) in breadcrumbItems"
        :key="index"
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class BreadCrumb extends Vue {
  @Provide() breadcrumbItems: any[] = []; //面包屑
  created() {
    this.initBread(this.$route);
  }
  @Watch("$route") routeChange(to: any) {
    this.initBread(to);
  }
  initBread(router: any) {
    // console.log(this.$router)
    let items = [{ path: "/", title: "后台管理系统" }];

    for (const index in router.matched) {
      // console.log(router.matched[index]);
      if (router.matched[index].meta && router.matched[index].meta.title) {
        items.push({
          path: router.matched[index].path || "/",
          title: router.matched[index].meta.title
        });
      }
    }
    this.breadcrumbItems = items;
  }
}
</script>

<style lang="scss" scoped>
.top {
  background: #fff;
  height: 54px;
  border-right: none;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  i {
    font-size: 20px;
    cursor: pointer;
    padding-left: 16px;
  }
  .breadcrumb {
    cursor: pointer;
    padding-left: 16px;
  }
}
</style>
 