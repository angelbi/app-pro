<template>
  <div :style="{ width: width == null ? 'auto' : width + 'px' }">
    <v-chart :option="option" :autoresize="true"> </v-chart>
  </div>
</template>

<script>
import moment from 'dayjs';
import { echartsColor } from '@/constants';

const sourceData = [];
const beginDay = new Date().getTime();

for (let i = 0; i < 10; i++) {
  sourceData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10),
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
    max: 30,
  },
];

export default {
  name: 'MiniBar',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: 200,
    },
    // x 轴别名
    x: {
      type: String,
      default: 'x',
    },
    // y 轴别名
    y: {
      type: String,
      default: 'y',
    },
  },
  created() {
    if (this.dataSource.length === 0) {
      this.option.xAxis.data = sourceData.map(item => item[this.x]);
      this.option.series.data = sourceData.map(item => item[this.y]);
    } else {
      this.option.xAxis.data = this.sourceData.map(item => item[this.x]);
      this.option.series.data = this.sourceData.map(item => item[this.y]);
    }
  },
  data() {
    return {
      tooltip,
      data: [],
      scale,
      option: {
        color: echartsColor,
        title: {
          text: '极坐标双数值轴',
          show: false,
        },
        grid: {
          show: false,
          left: 4,
          right: 4,
          top: 5,
          bottom: 5,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: sourceData.map(item => item[this.x]),
          show: false,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data: sourceData.map(item => item[this.y]),
            type: 'bar',
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
@import 'chart';
.chart {
  width: 100%;
  height: 100%;
}
</style>
