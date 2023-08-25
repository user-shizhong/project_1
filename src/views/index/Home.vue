<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card class="in">
          <div class="fl">
            <p>本月进件</p>
            <p style="font-weight: bold">6588</p>
            <p>
              +20.12%
              <span style="font-size: 12px">与上月同比</span>
            </p>
          </div>
          <i class="el-icon-edit ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="allin">
          <div class="fl">
            <p>本月进件</p>
            <p style="font-weight: bold">6588</p>
            <p>
              +20.12%
              <span style="font-size: 12px">与上月同比</span>
            </p>
          </div>
          <i class="el-icon-share ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="allout">
          <div class="fl">
            <p>本月进件</p>
            <p style="font-weight: bold">6588</p>
            <p>
              +20.12%
              <span style="font-size: 12px">与上月同比</span>
            </p>
          </div>
          <i class="el-icon-suitcase ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="out">
          <div class="fl">
            <p>本月进件</p>
            <p style="font-weight: bold">6588</p>
            <p>
              +20.12%
              <span style="font-size: 12px">与上月同比</span>
            </p>
          </div>
          <i class="el-icon-wallet ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="mt">
      <el-col :span="18">
        <el-card>
          <div slot="header">数据统计分析</div>
          <div style="height: 240px" ref="analysis"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">进件统计分析</div>
          <div style="height: 240px" ref="percent"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="mt">
      <el-col :span="12" >
        <el-card style="height: 700px;">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height: 700px;">
          <el-calendar v-model="value"> </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get } from "@/utils/http";
import * as echarts from "echarts";
export default {
  data() {
    return {
      value:new Date(),
      xdate: [],
      ydate: [],
    };
  },
  mounted() {
    this.getDate();
    this.drawPie();
  },
  methods: {
    drawline() {
      var myChart = echarts.init(this.$refs.analysis);
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xdate,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.ydate,
            type: "line",
            smooth: true,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "red", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "blue", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    drawPie() {
      var myChart = echarts.init(this.$refs.percent);
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    async getDate() {
      const { data } = await get("/line");
      for (let key in data) {
        this.xdate.push(key);
        this.ydate.push(data[key]);
      }
      // this.date =data
      console.log(this.xdate, this.ydate);
      this.drawline();
    },
  },
};
</script>

<style lang="less" scoped>
.ico {
  float: right;
  font-size: 90px;
  color: rgba(255, 255, 255, 0.3);
}
.in {
  background-color: #4f88ff;
}
.allin {
  background-color: #5050ff;
}
.allout {
  background-color: #f49b3b;
}
.out {
  background-color: #f26075;
}
</style>