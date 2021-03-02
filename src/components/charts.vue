<template>
  <div
    class="charts"
    ref="mychart"
    :style="{ width: chartWidth, height: chartHeight }"
  ></div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";

import echarts from "echarts";
@Component({
  components: {}
})
export default class Charts extends Vue {
  @Prop({ type: String, default: "line" }) readonly chartType!: string;
  @Prop(Object) chartData!: string | null;

  @Provide()
  chartWidth: string = "";
  chartHeight: string = "";

  drawChart() {
    let chart = echarts.init(this.$refs.mychart as HTMLCanvasElement);
    if (echarts == undefined) {
      console.log("echarts init dom is failded");
      return;
    }

    switch (this.chartType) {
      case "line":
        chart.setOption(this.getneratorLine());
        break;
      case "bar":
        chart.setOption(this.getneratorBar());
        break;
      case "pie":
        chart.setOption(this.getneratorPie());
        break;
      default:
        break;
    }
  }

  getneratorLine(): object {
    return {
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };
  }
  getneratorBar(): object {
    return {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar"
        }
      ]
    };
  }
  getneratorPie(): object {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ]
        }
      ]
    };
  }

  generator() {
    //生成宽高
    this.chartWidth = `${document.body.offsetWidth * 0.8}px`;
    this.chartHeight = `${document.body.offsetHeight * 0.6}px`;
  }

  created() {
    this.generator();
  }
  mounted() {
    this.drawChart();
  }
}
</script>

<style lang="scss" scoped></style>
