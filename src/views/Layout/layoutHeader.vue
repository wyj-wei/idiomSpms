<template>
  <div class="layout-header">
    <el-row>
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <div class="system-info">
          <img src="@/assets/images/logo.png" class="logo" alt @click="$router.push('./')" />
          <span class="title" @click="$router.push('./')">管理平台</span>
        </div>
      </el-col>
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <el-dropdown @command="userCommand" class="system-user" size="medium">
          <span class="userinfo-inner">
            <i class="fa fa-user-o"></i>
            {{getUser.username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
@Component({
  components: {}
})
export default class LayoutHeader extends Vue {
  @Getter("user") getUser: any;
  userCommand(command: string) {
    console.log(command);
    if (command == "logout") {
      this.$confirm(`是否退出当前${this.getUser.username}账号`, "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.removeItem("spmsToken");
        this.$message.success("退出成功");
        this.$router.push("./login");
      });
    }

    if (command == "usercenter") {
      console.log("个人中心");
      this.$router.push("/userInfo");
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-header {
  color: #f2f2f2;
  background: #495060;
  line-height: 64px;
  height: 64px;
  .system-info {
    height: 100%;
    .logo {
      cursor: pointer;
      display: block;
      float: left;
      transform: translateY(50%);
      margin-left: 2%;
      margin-right: 10px;
      height: 32px;
    }
    .title {
      cursor: pointer;
      font-size: 20px;
    }
  }

  .system-user {
    cursor: pointer;
    color: #f2f2f2;
    float: right;
    margin-right: 5%;
    font-size: 22px;
  }
}
</style>
 