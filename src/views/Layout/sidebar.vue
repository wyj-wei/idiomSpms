<template>
  <el-scrollbar class="scrollbar">
    <el-menu class="menu-side" router :default-active="pathRoute">
      <template v-for="item in getRouters">
        <span :key="item.name" v-if="item.hidden&&item.children&&item.children.length">
          <!-- 单个元素 -->
          <el-menu-item
            v-if="item.children.length==1"
            :key="item.name"
            :index="item.children[0].path"
          >
            <i
              v-if="item.children[0].meta.icon"
              :class="item.children[0].meta.icon"
              style="margin-right:15px;font-size:20px;"
            ></i>
            <span slot="title" v-if="item.children[0].meta.title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
          <!-- 多个元素 -->
          <el-submenu v-else :key="item.name" :index="item.children[0].path">
            <template slot="title">
              <i
                v-if="item.meta.icon"
                :class="item.meta.icon"
                style="margin-right:15px;font-size:20px;"
              ></i>
              <span slot="title" v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.name" :index="child.path">
              <i
                v-if="child.meta.icon"
                :class="child.meta.icon"
                style="margin-right:15px;font-size:20px;"
              ></i>
              <span slot="title" v-if="child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </el-submenu>
        </span>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { State, Getter, Mutation, Action } from "vuex-class";
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Sidebar extends Vue {
  @Getter("routers") getRouters: any;
  @Provide() pathRoute: string = "";
  @Watch("$route") routeChange(to: any) {
    this.pathRoute = to.path;
  }
  created() {
    this.pathRoute = this.$router.currentRoute.path;
  }
}
</script>

<style lang="scss" scoped>
.scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .menu-silde {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
 