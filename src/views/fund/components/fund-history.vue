<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '600px'
    },
    height: {
      type: String,
      default: '600px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.setOptions(this.chartData)
    },
    setOptions({dateList, valueList, percentageList, gridTradeList}) {
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: '历史净值曲线',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: <br>净值: {c0} <br> 日涨幅: {c1}',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['CMCC', 'CTCC',],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: dateList,
        //   data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
        }],
        yAxis: [{
          type: 'value',
          min: "dataMin",
          max: "dataMax",
          name: '历史净值',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '净值',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          markPoint: {
            symbolSize: 20,
            data: gridTradeList,
          },
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12

            }
          },
          data: valueList
        },
        {
          name: '涨幅',
          data: percentageList,
          type: 'line',
          // 显示数值
          // itemStyle : { normal: {label : {show: true}}}
        },
        // }, {
        //   name: 'CTCC',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'circle',
        //   symbolSize: 5,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   },
        //   areaStyle: {
        //     normal: {
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: 'rgba(0, 136, 212, 0.3)'
        //       }, {
        //         offset: 0.8,
        //         color: 'rgba(0, 136, 212, 0)'
        //       }], false),
        //       shadowColor: 'rgba(0, 0, 0, 0.1)',
        //       shadowBlur: 10
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: 'rgb(0,136,212)',
        //       borderColor: 'rgba(0,136,212,0.2)',
        //       borderWidth: 12

        //     }
        //   },
        //   data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
        // }, {
        //   name: 'CUCC',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'circle',
        //   symbolSize: 5,
        //   showSymbol: false,
        //   lineStyle: {
        //     normal: {
        //       width: 1
        //     }
        //   },
        //   areaStyle: {
        //     normal: {
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: 'rgba(219, 50, 51, 0.3)'
        //       }, {
        //         offset: 0.8,
        //         color: 'rgba(219, 50, 51, 0)'
        //       }], false),
        //       shadowColor: 'rgba(0, 0, 0, 0.1)',
        //       shadowBlur: 10
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: 'rgb(219,50,51)',
        //       borderColor: 'rgba(219,50,51,0.2)',
        //       borderWidth: 12
        //     }
        //   },
        //   data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
        // }
        ]
      })
    }
  }
}
</script>
