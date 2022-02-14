<template>
  <div :style="{ padding: '0 0 32px 32px', height: 254 }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart :option="saleOption" :autoresize="true" class="chart" style="height: 254px"></v-chart>
  </div>
</template>

<script>
import { echartsColor } from '@/constants';

const data = [];
for (let i = 0; i < 12; i += 1) {
  data.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y,
  }),
];
const scale = [
  {
    dataKey: 'x',
    min: 2,
  },
  {
    dataKey: 'y',
    title: '时间',
    min: 1,
    max: 22,
  },
];

export default {
  name: 'Bar',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.datasource = data;
  },
  data() {
    return {
      datasource: [],
      scale,
      tooltip,
      saleOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        color: echartsColor,
        title: {
          text: '极坐标双数值轴',
          show: false,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          data: data.map(item => item.x),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.map(item => item.y),
            type: 'bar',
            barWidth: '40%',
            nameLocation: 'center',
            barCategoryGap: '10%', // 柱形的间距
          },
        ],
        itemStyle: {
          color: '#379EFC',
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    };
  },
};
</script>
<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
