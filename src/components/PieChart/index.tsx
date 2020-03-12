import React from 'react';
import echarts from 'echarts';

interface Props {

}

export default class PieChart extends React.PureComponent<Props> {
  pieChart: React.RefObject<HTMLDivElement>;
  echartsIntance: typeof echarts;
  echart: any;
  constructor(props: Props) {
    super(props);
    this.pieChart = React.createRef();
    this.echartsIntance = echarts;
    this.echart = null;
  }

  componentDidMount() {
    if (!this.pieChart.current) return;
    this.echart = this.echartsIntance.init(this.pieChart.current);
    this.echart.setOption({
      title: {
        text: '饼状图',
        left: 'center',
        textStyle: {
          color: '#fff',
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br />{b}:{c} ({d}%)'
      },
      grid: {
        left: 55,
        right: 10
      },
      series: [{
        name: '销售源',
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
      }],
    });
    this.setSeries();
  }

  setSeries = () => {
    this.echart.setOption({
      series: [{
        data: [
          {value: '360', name: '淘宝'},
          {value: '510', name: '京东'},
          {value: '420', name: '当当'},
          {value: '230', name: '门店1'},
          {value: '390', name: '门店2'},
        ],
      }],
    })
  }


  render() {
    return React.createElement(
      'div',
      {
        ref: this.pieChart,
        style: {
          height: '100%',
          width: '100%',
        },
      }
      , null
    )
  }
}
