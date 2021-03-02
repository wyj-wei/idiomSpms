<template>
  <div class="user-dialog">
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="400px"
    >
      <el-form
        :rules="rules"
        ref="ruleForm"
        :model="formData"
        label-width="100px"
        size="small"
        class="form-box"
      >
        <el-form-item label="请选择角色" prop="role">
          <el-select v-model="formData.role" placeholder="请选择角色" @change="selectChange">
            <el-option
              v-for="(item,index) in options"
              :key="item+index"
              :label="item.role"
              :value="item.role"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入账号" prop="role">
          <el-input v-model="formData.username" placeholder="请输入课程名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { addUser } from "@/api/api";
import { Vue, Component, Prop, Provide, Emit } from "vue-property-decorator";
@Component({
  components: {}
})
export default class UserDialog extends Vue {
  @Emit("closeDialog") close() {}
  //！：强制解析必有值
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Array) options!: any;

  @Provide()
  formData: object = {
    key: "",
    role: "",
    username: "",
    des: ""
  };
  rules: any = {
    role: [{ required: true, message: "请选择角色", trigger: "change" }],
    username: [{ required: true, message: "请输入账号 ", trigger: "blur" }]
  };
  submitForm(fromName: string) {
    console.log(fromName);
    (this.$refs[fromName] as any).validate((valid: boolean) => {
      if (valid) {
        addUser(this.formData).then((res: any) => {
          console.log(res);
          this.close();
          this.$message.success(res.msg);
        });
      }
    });
  }
  handleClose() {
    this.close();
  }
  selectChange(select: string) {
    this.options.map((option: any) => {
      if (option.role == select) {
        (this as any).formData.key = option.key;
        (this as any).formData.des = option.des;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.user-dialog {
  .el-input,
  .el-select {
    width: 200px;
  }
}
</style>
