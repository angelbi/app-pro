<template>
  <div class="antv-chart-mini">
    <div class="chart-wrapper" style="height: 46px">
      <v-chart class="chart" :option="option" :autoresize="true"></v-chart>
    </div>
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

export default {
  name: 'MiniArea',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
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
  data() {
    return {
      data: [],
      option: {
        color: echartsColor,
        title: {
          text: '极坐标双数值轴',
          show: false,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: sourceData.map(item => item[this.x]),
          show: false,
        },
        grid: {
          show: false,
          left: 4,
          right: 4,
          top: 5,
          bottom: 5,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data: sourceData.map(item => item[this.y]),
            type: 'line',
            smooth: true,
            areaStyle: {},
          },
        ],
      },
    };
  },
  computed: {
    scale() {
      return [
        { dataKey: 'x', title: this.x, alias: this.x },
        { dataKey: 'y', title: this.y, alias: this.y },
      ];
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
};
</script>

<style lang="less" scoped>
@import 'chart';
.chart {
  width: 100%;
  height: 100%;
}
</style>
