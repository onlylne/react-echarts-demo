import React from 'react';
import echarts from 'echarts';

interface Props {

}

export default class BarChart extends React.PureComponent<Props> {
  barChart: React.RefObject<HTMLDivElement>;
  echartsIntance: typeof echarts;
  echart: any;
  constructor(props: Props) {
    super(props);
    this.barChart = React.createRef();
    this.echartsIntance = echarts;
    this.echart = null;
  }

  componentDidMount() {
    if (!this.barChart.current) return;
    this.echart = this.echartsIntance.init(this.barChart.current);
    this.echart.setOption({
      title: {
        text: '柱形图',
        left: 'center',
        textStyle: {
          color: '#fff',
        }
      },
      legend: {
        data: ['销量', '进货'],
        top: '26',
        textStyle: {
          color: '#bbb'
        }
      },
      tooltip: {},
      grid: {
        left: 55,
        right: 10
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          padding: [10, 0, 10, 0]
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          padding: [10, 0, 10, 10]
        }
      },
      series: [{
        name: '销量',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
        }
      },
      {
        name: '进货',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
        }
      }],
      color: ['#ff0000', '#009DFF']
    });
    this.setSeries();
  }

  setSeries = () => {
    this.echart.setOption({
      series: [{
        name: '销量',
        data: [320, 432, 601, 934, 1290, 1330, 1200],
        type: 'bar',
      },
      {
        name: '进货',
        data: [420, 332, 701, 1230, 1190, 1430, 1480],
        type: 'bar',
      }],
    })
  }

  render() {
    return React.createElement(
      'div',
      {
        ref: this.barChart,
        style: {
          height: '100%',
          width: '100%',
        },
      },
      null
    )
  }
}