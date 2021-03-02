<template>
  <div class="table-data">
    <div class="search-box">
      <el-input size="small" v-model="searchVal" placeholder="请输入课程名称"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width:100%" :height="tHeight">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column label="课程名称" prop="title"></el-table-column>
      <el-table-column width="120" label="课程级别" prop="level"></el-table-column>
      <el-table-column width="120" label="技术栈" prop="type"></el-table-column>
      <el-table-column width="120" label="报名人数" prop="count"></el-table-column>
      <el-table-column width="120" label="上线日期" prop="date"></el-table-column>
      <el-table-column v-if="getUser.key != 'visitor'" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" ref="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="size"
        :total="total"
        layout="total,sizes,prev,pager,next,jumper"
      ></el-pagination>
    </div>
    <editDialog :dialogVisible="dialogVisible" :formData="formData" @closeDialog="closeDialog"></editDialog>
  </div>
</template>

<script lang="ts">
import { getTable, searchTable, EditDelete } from "@/api/api";
import { State, Getter, Mutation, Action } from "vuex-class";
import { Component, Vue, Provide } from "vue-property-decorator";
import editDialog from "./editDialog.vue";
@Component({
  components: { editDialog }
})
export default class TableData extends Vue {
  @Getter("user") getUser: any;

  @Provide()
  loading: boolean = false;
  searchVal: string = "";
  tHeight: number = document.body.offsetHeight - 270;
  tableData: any = [];
  page: number = 1;
  size: number = 5;
  total: number = 0;

  dialogVisible: boolean = false;
  formData: object = {
    title: "",
    type: "",
    level: "",
    count: "",
    date: "",
    _id: ""
  };
  handleDelete(index: number, row: any) {
    console.log(row);
    this.$confirm("是否删除该条数据, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    })
      .then(() => {
        EditDelete(row._id).then((res: any) => {
          this.$message.success("删除成功!");
          this.tableData.splice(index, 1);
        });
      })
      .catch(() => {});
  }
  handleEdit(index: number, row: any) {
    this.formData = row;
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  loadData(): void {
    let data = {
      page: this.page,
      size: this.size
    };
    this.loading = true;
    getTable(data).then((res: any) => {
      this.tableData = res.data.list;
      this.total = res.data.total;
      this.loading = false;
    });
  }
  loadSerachData(): void {
    let data = {
      page: this.page,
      size: this.size,
      searchVal: this.searchVal
    };
    this.loading = true;
    searchTable(data).then((res: any) => {
      this.tableData = res.datas.list;
      this.total = res.datas.total;
      this.loading = false;
    });
  }

  handleCurrentChange(val: number): void {
    this.page = val;
    this.searchVal ? this.loadSerachData() : this.loadData();
  }
  handleSizeChange(val: number): void {
    this.size = val;
    this.page = 1;
    this.searchVal ? this.loadSerachData() : this.loadData();
  }

  handleSearch(): void {
    this.page = 1;
    this.searchVal ? this.loadSerachData() : this.loadData();
  }

  created() {
    this.loadData();
    console.log(this.getUser);
  }
}
</script>

<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>
