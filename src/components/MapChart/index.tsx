import React from 'react';
import echarts from 'echarts';
import chinaJson from 'echarts/map/json/china.json';

interface Props {
  data: Array<any>,
  geoCoordMap: object,
  geoCoordClick?: Function,
}

export default class MapChart extends React.PureComponent<Props> {
  mapChart: React.RefObject<HTMLDivElement>;
  echartsIntance: typeof echarts;
  echart: any;
  constructor(props: Props) {
    super(props);
    this.mapChart = React.createRef();
    this.echartsIntance = echarts;
    this.echart = null;
  }

  componentDidMount() {
    if (!this.mapChart.current) return;
    echarts.registerMap('china', chinaJson)
    this.echart = this.echartsIntance.init(this.mapChart.current);

    this.echart.setOption({
      title: {
        text: '全国总销售量',
        left: 'center',
        top: 10,
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const { seriesName, name, data } = params;
          const val = data.value[2];
          return `${seriesName}<br /> ${name}: ${val}`
        }
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false,
            color: '#19B78D'
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: '#009DFF',
            borderColor: '#111'
          },
          emphasis: {
            areaColor: '#0050B5'
          }
        }
      },
    });
    const { geoCoordClick } = this.props;
    if (geoCoordClick) {
      this.echart.on('click', 'series', (params: any) => {
        geoCoordClick(params);
      })
    }
    this.setSeries();
  }

  componentWillUnmount() {
    const { geoCoordClick } = this.props;
    if (geoCoordClick)
      this.echart.off('click', 'series');
  }

  setSeries = () => {
    const { data, geoCoordMap } = this.props;
    const convertData = () => {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
    const getMax = () => {
      const arr = data.map(item => item.value).sort((a, b) => b - a);
      return arr[0];
    }
    this.echart.setOption({
      visualMap: [{
        type: 'continuous',
        min: 0,
        max: getMax(),
      }],
      series: [
        {
          name: '销量',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(),
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#FFD400'
            }
          }
        },
      ]
    })
  }

  render() {
    return React.createElement(
      'div',
      {
        ref: this.mapChart,
        style: {
          height: '100%',
          width: '100%',
        }
      },
      null
    )
  }
}