<template>
  <div class="password">
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
          <h3>找回密码</h3>
        </div>
        <!-- username -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- email -->
        <el-form-item prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="邮箱">
            <i slot="prefix" class="fa fa-envelope-o"></i>
          </el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <el-button
            :loading="loading"
            @click.native.prevent="handleSubmit"
            type="primary"
            style="width:100%"
          >确认</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>
<script lang="ts">
// import  from 'vue'
import { Component, Vue, Provide } from "vue-property-decorator";
import LoginHeader from "./LoginHeader.vue";
import { login, forget } from "../../api/api";
@Component({
  components: { LoginHeader }
})
export default class Password extends Vue {
  @Provide() loading: boolean = false;
  @Provide() ruleForm: {
    username: string;
    email: string;
  } = {
    username: "",
    email: ""
  };
  @Provide() rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    email: [
      { required: true, message: "请输入邮箱地址", trigger: "blur" },
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur", "change"]
      }
    ]
  };

  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        // console.log(this.ruleForm);
        forget(this.ruleForm).then(
          (res: any) => {
            this.loading = false;
            // console.log(res);
            this.$message.success(res.msg);
            setTimeout(() => {
              this.$router.push("./login");
            }, 2000);
          },
          (err: any) => {
            this.loading = false;
          }
        );
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.password {
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
}
</style>