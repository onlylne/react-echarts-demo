import React from 'react';
import echarts from 'echarts';

interface Props {
  hoursData: Array<String>,
  data: Array<Number>
}

export default class HoursChart extends React.PureComponent<Props> {
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
    const { hoursData } = this.props;
    this.echart.setOption({
      title: {
        text: '浏览时图',
        left: 'center',
        textStyle: {
          color: '#fff',
        }
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: 55,
        right: 30,
        top: 40,
        bottom: 46
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: hoursData,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          padding: [10, 0, 10, 0],
          rotate: 30,
          fontSize: 10
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        splitNumber: 3,
        splitLine: {
          lineStyle: {
            color: '#fff',
            type: 'dashed'
          }
        }
      },
      color: ['#009DFF']
    });
    this.setSeries();
  }

  componentDidUpdate() {
    this.setSeries();
  }

  setSeries = () => {
    const { data } = this.props;
    this.echart.setOption({
      series: [{
        name: '浏览',
        type: 'line',
        data: data,
        smooth: true
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