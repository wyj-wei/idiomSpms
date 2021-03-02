<template>
  <div class="user-info">
    <div class="img-box">
      <h2 class="title">About me</h2>
      <img :src="require('@/assets/images/'+getUser.key+'.jpg')" alt />
      <h4>{{getUser.username}}</h4>
    </div>
    <div class="info-box">
      <h2 class="title">Account</h2>
      <el-form :model="userData" class="form-box">
        <el-form-item label="用户名">
          <el-input v-model="getUser.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userData.pwd" type="pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="onSubmit"
            :loading="loading"
            :disabled="!userData.pwd"
            type="primary"
          >修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { editPwd } from "@/api/api";
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
@Component({
  components: {}
})
export default class UserInfo extends Vue {
  @Getter("user") getUser: any;

  @Provide() userData: { username: string; pwd: string } = {
    username: "",
    pwd: ""
  };
  @Provide() loading: boolean = false;
  onSubmit() {
    console.log(this.userData);
    this.loading = true;
    // (this as any).$axios
    //   .post("/api/users/changePwd", this.userData)
    //   .then((res: any) => {
    //     console.log(res );
    //   });
    editPwd(this.userData).then((res: any) => {
      console.log(res);
      this.loading = false;
      this.$message({
        message: res.data.msg,
        type: "success"
      });
    });
  }
  created() {
    console.log(this.getUser);
    this.userData.pwd = "123456";
    this.userData.username = this.getUser.username;
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  height: 95%;
  overflow: hidden;
  color: #606266;
  .img-box,
  .info-box {
    flex: 1;
    text-align: center;
    padding: 20px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    height: 100%;
    background: #fff;
    margin: 5px;
    .title {
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
      text-align: left;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .img-box {
    img {
      height: 100px;
      border-radius: 50%;
    }
    h4 {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .info-box {
    .form-box {
      padding: 10px;
    }
  }
}
</style>
 