<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" class="left-col">
      <el-card shadow="hover">
        <div class="user">
          <img class="userImg" :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="logininfo">
          <p>
            上次登录时间：
            <span>2021-7-19</span>
          </p>
          <p>
            上次登录地点：
            <span>武汉</span>
          </p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;">
        <el-table :data="tableData">
          <el-table-column
            v-for="(item, index) in tableLabel"
            :key="item.id"
            :prop="index"
            :label="item"
            align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px; ">
      <div class="num">
        <el-card
          class="numcard"
          v-for="item in countData"
          :key="item.name"
          :body-style="{display: 'flex', padding: 0}"
          style="width: 32%"
        >
          <i
            class="numicon"
            :class="`el-icon-${item.icon}`"
            :style="{background: item.color, padding: '20px'}"
          ></i>
          <div class="detail" style="padding-left: 10px; padding-right: 10px">
            <p class="detailnum">{{item.value}}</p>
            <p class="detailtxt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="margin-top: 10px;">
        <div style="height: 26vh;" ref="echarts1"></div>
      </el-card>
      <div class="graph" style="display: flex; justify-content: space-between; margin-top: 5px;">
        <el-card style="width: 49%;">
          <div style="height: 24vh;" ref="echarts2"></div>
        </el-card>
        <el-card style="width: 49%;">
          <div style="height: 24vh;" ref="echarts3"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../../api/data.js";
import * as echarts from "echarts";

export default {
  name: "HomePage",
  data() {
    return {
      userImg: require("../../src/assets/images/user_avatar.png"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },

      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ]
    };
  },
  methods: {
    initLineChart(data) {
      const echarts1 = echarts.init(this.$refs.echarts1);

      const orderData = data.orderData;
      const xAxis = Object.keys(orderData.data[0]);

      var echarts1Option = {};
      echarts1Option.xAxis = {
        data: xAxis
      };
      echarts1Option.yAxis = {};
      echarts1Option.legend = {
        data: xAxis
      };
      // console.log(xAxis, "xAxis");
      echarts1Option.series = [];
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: "line"
        });
      });
      // console.log(echarts1Option, "echarts1Option");

      echarts1.setOption(echarts1Option);
    },

    initBarChart(data) {
      const echarts2 = echarts.init(this.$refs.echarts2);
      const userData = data.userData;
      const echarts2Option = {
        legend: {
          textStyle: {
            color: "#333"
          }
        },
        grid: {
          left: "20%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          },
          axisLabel: {
            interval: 0,
            color: "#333"
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              }
            }
          }
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map(item => item.new),
            type: "bar"
          },
          {
            name: "活跃用户",
            data: userData.map(item => item.active),
            type: "bar"
          }
        ]
      };

      echarts2.setOption(echarts2Option);
    },

    initPieChart(data) {
      const echarts3 = echarts.init(this.$refs.echarts3);
      const videoData = data.videoData;
      const echarts3Option = {
        tooltip: {
          trigger: "item"
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        series: [
          {
            data: videoData,
            type: "pie"
          }
        ]
      };

      echarts3.setOption(echarts3Option);
    },

    initCharts(data) {
      this.initLineChart(data);
      this.initBarChart(data);
      this.initPieChart(data);
    }
  },
  mounted() {
    getData().then(res => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
      }
      console.log(res, "res");
      // console.log(data, "data");

      this.initCharts(data);
    });
  }
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.userImg {
  width: 30%;
  height: 30%;
}

.left-col {
  margin-top: 20px;
}

.numicon {
  display: inline-block;
  text-align: center;
  font-size: 3em;
}

.num {
  display: flex;
  flex-wrap: wrap;
  height: 190px;
  gap: 10px 10px;
}
</style>