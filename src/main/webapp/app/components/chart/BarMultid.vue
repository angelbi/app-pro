<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart :option="option" :autoresize="true" :style="{ height: height + 'px' }"></v-chart>
  </div>
</template>

<script>
import { DataSet } from '@antv/data-set';
import { ChartEventMixins } from './mixins/ChartMixins';

export default {
  name: 'BarMultid',
  mixins: [ChartEventMixins],
  props: {
    title: {
      type: String,
      default: '',
    },
    dataSource: {
      type: Array,
      default: () => [
        { type: 'Jeecg', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, May: 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
        { type: 'Jeebt', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, May: 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 },
      ],
    },
    fields: {
      type: Array,
      default: () => ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
    },
    // 别名，需要的格式：[{field:'name',alias:'姓名'}, {field:'sex',alias:'性别'}]
    aliases: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number,
      default: 254,
    },
  },
  data() {
    return {
      adjust: [
        {
          type: 'dodge',
          marginRatio: 1 / 32,
        },
      ],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Forest', 'Steppe', 'Desert', 'Wetland'],
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['2012', '2013', '2014', '2015', '2016'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series',
            },
            data: [320, 332, 301, 334, 390],
          },
          {
            name: 'Steppe',
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
            data: [220, 182, 191, 234, 290],
          },
          {
            name: 'Desert',
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
            data: [150, 232, 201, 154, 190],
          },
          {
            name: 'Wetland',
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
            data: [98, 77, 101, 99, 40],
          },
        ],
      },
    };
  },
  computed: {
    data() {
      const dv = new DataSet.View().source(this.dataSource);
      dv.transform({
        type: 'fold',
        fields: this.fields,
        key: 'x',
        value: 'y',
      });

      // bar 使用不了 - 和 / 所以替换下
      let rows = dv.rows.map(row => {
        if (typeof row.x === 'string') {
          row.x = row.x.replace(/[-/]/g, '_');
        }
        return row;
      });
      // 替换别名
      rows.forEach(row => {
        for (let item of this.aliases) {
          if (item.field === row.type) {
            row.type = item.alias;
            break;
          }
        }
      });
      return rows;
    },
    scale() {
      return [
        {
          type: 'cat',
          dataKey: 'x',
        },
      ];
    },
  },
};
</script>

<style scoped></style>
