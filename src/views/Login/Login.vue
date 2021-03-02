<template>
  <div class="login">
    <LoginHeader>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        slot="container"
      >
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <!-- username -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <el-button
            :loading="isLogin"
            @click.native.prevent="handleSubmit"
            type="primary"
            style="width:100%"
          >登录</el-button>
        </el-form-item>
        <!-- other -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">七天内自动登录</el-checkbox>
          <el-button type="text" class="forget" @click="$router.push('./password')">忘记密码？</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
// import  from 'vue'
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import LoginHeader from "./LoginHeader.vue";
import { login } from "../../api/api";
@Component({
  components: { LoginHeader }
})
export default class Login extends Vue {
  // 存储用户信息
  @Action("setUser") setUser: any;
  @Provide() ruleForm: {
    username: string;
    pwd: string;
    autoLogin: boolean;
  } = {
    username: "",
    pwd: "",
    autoLogin: true
  };
  @Provide() isLogin: boolean = false;
  @Provide() rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    pwd: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
    ]
  };

  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        this.isLogin = true;
        login(this.ruleForm).then(
          (res: any) => {
            this.isLogin = false;
            console.log(res);
            this.setUser(res.token);
            localStorage.setItem("spmsToken", res.token);
            this.$router.push("./")
          },
          (err: any) => {
            this.isLogin = false;
            console.log(err);
          }
        );
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login-bg.png");
  background-repeat: no-repeat;
  // background-position: center;
  background-size: cover;
  // background-attachment: fixed;
  // background-size: 100%;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  i {
    font-size: 14px;
    margin-left: 8px;
    color: #333;
  }
  .forget {
    float: right;
  }
}
</style>