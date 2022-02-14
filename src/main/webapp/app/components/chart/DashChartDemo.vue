<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <v-chart :option="option" :autoresize="true" style="height: 300px"></v-chart>
  </div>
</template>

<script>
import { registerShape } from 'viser-vue';

registerShape('point', 'pointer', {
  draw(cfg, container) {
    let point = cfg.points[0];
    point = this.parsePoint(point);
    const center = this.parsePoint({
      x: 0,
      y: 0,
    });
    container.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y + 15,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    return container.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});

const scale = [
  {
    dataKey: 'value',
    min: 0,
    max: 9,
    tickInterval: 1,
    nice: false,
  },
];

const data = [{ value: 7.0 }];

export default {
  name: 'DashChartDemo',
  props: {
    datasource: {
      type: Number,
      default: 7,
    },
    title: {
      type: String,
      default: '',
    },
  },
  created() {
    if (!this.datasource) {
      this.chartData = data;
    } else {
      this.chartData = [{ value: this.datasource }];
    }
    this.getChartData();
  },
  watch: {
    datasource: function (val) {
      this.chartData = [{ value: val }];
      this.getChartData();
    },
  },
  methods: {
    getChartData() {
      if (this.chartData && this.chartData.length > 0) {
        this.abcd = this.chartData[0].value * 10;
      } else {
        this.abcd = 70;
      }
    },
    getHtmlGuideHtml() {
      return (
        '<div style="width: 300px;text-align: center;">\n' +
        '<p style="font-size: 14px;color: #545454;margin: 0;">' +
        this.title +
        '</p>\n' +
        '<p style="font-size: 36px;color: #545454;margin: 0;">' +
        this.abcd +
        '%</p>\n' +
        '</div>'
      );
    },
    getArcGuide2End() {
      return [this.chartData[0].value, 0.945];
    },
  },
  data() {
    return {
      chartData: [],
      height: 400,
      scale: scale,
      abcd: 70,
      axisLabel: {
        offset: -16,
        textStyle: {
          fontSize: 18,
          textAlign: 'center',
          textBaseline: 'middle',
        },
      },
      axisSubTickLine: {
        length: -8,
        stroke: '#fff',
        strokeOpacity: 1,
      },
      axisTickLine: {
        length: -17,
        stroke: '#fff',
        strokeOpacity: 1,
      },
      arcGuide1Start: [0, 0.945],
      arcGuide1End: [9, 0.945],
      arcGuide1Style: {
        stroke: '#CBCBCB',
        lineWidth: 18,
      },
      arcGuide2Start: [0, 0.945],
      arcGuide2Style: {
        stroke: '#1890FF',
        lineWidth: 18,
      },
      htmlGuidePosition: ['50%', '100%'],
      htmlGuideHtml: `
        <div style="width: 300px;text-align: center;">
          <p style="font-size: 14px;color: #545454;margin: 0;">${this.title}</p>
          <p style="font-size: 36px;color: #545454;margin: 0;">${this.abcd}%</p>
        </div>
      `,
      option: {
        series: [
          {
            type: 'gauge',
            progress: {
              show: true,
              width: 18,
            },
            axisLine: {
              lineStyle: {
                width: 18,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: '#999',
              },
            },
            axisLabel: {
              distance: 25,
              color: '#999',
              fontSize: 18,
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 25,
              itemStyle: {
                borderWidth: 10,
              },
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 80,
              offsetCenter: [0, '70%'],
            },
            data: [
              {
                value: 70,
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
