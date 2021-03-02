<template>
  <el-dialog
    title="编辑课程"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="600px"
  >
    <el-form
      :rules="rules"
      ref="ruleForm"
      :model="formData"
      label-width="100px"
      size="small"
      class="form-box"
    >
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item label="课程等级" prop="level">
        <el-select v-model="formData.level" placeholder="请输入课程等级">
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报名人数" prop="count">
        <el-input v-model="formData.count" placeholder="请输入报名人数"></el-input>
      </el-form-item>
      <el-form-item label="上线时间" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="技术栈" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio label="vue" name="type"></el-radio>
          <el-radio label="react" name="type"></el-radio>
          <el-radio label="node" name="type"></el-radio>
          <el-radio label="小程序" name="type"></el-radio>
          <el-radio label="angular" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取消</el-button>
      <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { EditTable } from "@/api/api";
import { Vue, Component, Prop, Provide, Emit } from "vue-property-decorator";
@Component({
  components: {}
})
export default class EditDialog extends Vue {
  @Emit("closeDialog") close() {}
  //！：强制解析必有值
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Object) formData!: {
    title: string;
    type: string;
    level: string;
    count: string;
    date: string;
    _id: string;
  };

  @Provide() rules: any = {
    title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
    level: [{ required: true, message: "请输入课程等级", trigger: "change" }],
    count: [{ required: true, message: "请输入报名人数 ", trigger: "blur" }],
    date: [
      {
        type: "string",
        required: true,
        message: "请选择日期",
        rigger: "change"
      }
    ],
    type: [{ required: true, message: "请选择技术栈", trigger: "change" }]
  };
  submitForm(fromName: string) {
    console.log(fromName);
    (this.$refs[fromName] as any).validate((valid: boolean) => {
      if (valid) {
        EditTable(this.formData).then((res: any) => {
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
  created() {
    console.log(this.dialogVisible, this.formData);
  }
}
</script>

<style scoped></style>
