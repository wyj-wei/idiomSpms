<template>
  <div class="account-data">
    <div class="option-box">
      <el-button size="small" type="primary" @click="handleAdd">新增用户</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%" v-loading="loading">
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-select
            v-if="scope.row.edit"
            v-model="scope.row.role"
            @change="selectChange(scope.row)"
          >
            <el-option
              v-for="(item,index) in options"
              :key="item+index"
              :label="item.role"
              :value="item.role"
            ></el-option>
          </el-select>
          <span v-else>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.username"></el-input>
          <span v-else>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="des"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.username!='admin'">
          <!-- <span>{{scope.row.role}}</span> -->
          <el-button
            size="mini"
            @click="handleSuccess(scope.$index,scope.row)"
            type="success"
            v-if="scope.row.edit"
          >完成</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" v-else>编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDetele(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <userDialog :dialogVisible="dialogVisible" :options="options" @closeDialog="closeDialog"></userDialog>
  </div>
</template>

<script lang="ts">
import userDialog from "./userDialog.vue";
import { getUserTable, editUser, deleteUser } from "@/api/api";
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({
  components: { userDialog }
})
export default class AccountData extends Vue {
  @Provide()
  tableData: any[] = [];
  loading: boolean = false;
  dialogVisible: boolean = false;
  options: any = [
    {
      key: "admin",
      role: "管理员",
      des: "admin"
    },
    {
      key: "editor",
      role: "客服",
      des: "editor"
    },
    {
      key: "visiotr",
      role: "游客",
      des: "visiotr"
    }
  ];

  closeDialog() {
    this.dialogVisible = false;
    this.getData();
  }

  selectChange(item: any) {
    this.options.map((option: any) => {
      if (option.role == item.role) {
        item.key = option.key;
        item.des = option.des;
      }
    });
  }
  getData() {
    this.loading = true;
    getUserTable().then((res: any) => {
      res.datas.forEach((item: any) => {
        item.edit = false;
      });

      this.tableData = res.datas;
      this.loading = false;
    });
  }

  handleDetele(index: number, row: any) {
    deleteUser(row).then((res: any) => {
      this.$message.success(res.msg);
      this.tableData.splice(index, 1);
    });
  }

  handleSuccess(index: number, row: any) {
    editUser(row).then((res: any) => {
      this.$message.success(res.msg);
    });
    row.edit = false;
  }
  handleEdit(index: number, row: any) {
    row.edit = true;
  }
  handleAdd() {
    this.dialogVisible = true;
  }
  created() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.account-data {
  height: 100%;
  .option-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
  }
}
</style>
