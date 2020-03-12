import React from 'react';
import echarts from 'echarts';

interface Props {

}

export default class LineChart extends React.PureComponent<Props>{
  lineChart: React.RefObject<HTMLDivElement>;
  echartsIntance: typeof echarts;
  echart: any;
  constructor(props: Props) {
    super(props);
    this.lineChart = React.createRef();
    this.echartsIntance = echarts;
    this.echart = null;
  }

  componentDidMount() {
    if (!this.lineChart.current) return;
    this.echart = this.echartsIntance.init(this.lineChart.current);
    this.echart.setOption({
      title: {
        text: '折线图',
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
      tooltip: {
        trigger: 'axis',
      },
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
      color: ['#ff0000', '#009DFF']
    });
    this.setSeries();
  }

  setSeries = () => {
    this.echart.setOption({
      series: [{
        name: '销量',
        data: [320, 432, 601, 934, 1290, 1330, 1200],
        type: 'line',
      },
      {
        name: '进货',
        data: [420, 332, 701, 1230, 1190, 1430, 1480],
        type: 'line',
      }],
    })
  }

  render() {
    return React.createElement(
      'div',
      {
        ref: this.lineChart,
        style: {
          height: '100%',
          width: '100%',
        },
      },
      null
    )
  }
}