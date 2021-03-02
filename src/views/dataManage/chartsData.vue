<template>
  <div class="charts-data">
    <el-tabs type="border-card" v-model="tabPostion">
      <el-tab-pane label="拆线图" name="line">
        <charts :chartData="chartData" chartType="line"></charts>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">
        <charts :chartData="chartData" chartType="bar"></charts>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="pie">
        <charts :chartData="chartData" chartType="pie"></charts>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import charts from "@/components/charts.vue";
@Component({
  components: { charts }
})
export default class ChartsData extends Vue {
  @Provide()
  tabPostion: string = "line";
  chartData: any = {
    xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yAxisData: [820, 932, 901, 934, 1290, 1330, 1320]
  };
}
</script>

<style lang="scss" scoped></style>
