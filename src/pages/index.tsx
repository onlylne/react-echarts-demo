import React, { useState, useEffect } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import HoursChart from '@/components/HoursChart';
import MapChart from '@/components/MapChart';
import MapDetails from '@/components/MapDetails';
import { saleData, geoCoordMap } from '@/assets/mapData';
import { getRandom, formatHours } from '@/utils/utils';
import styles from './index.css';

export default function () {

  const [date, setDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(moment().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);
    return () => clearInterval(timer);
  }, [])

  const hoursData = () => {
    let hours: string[] = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${formatHours(i)}-${formatHours(i + 1)}`)
    }
    return hours;
  }

  const [hoursValue, setHoursValue] = useState();

  useEffect(() => {
    const hours = new Date().getHours();
    let value: number[] = [];
    for (let i = 0; i < hours; i++) {
      if (i < 8) {
        value.push(getRandom(20, 50));
      } else if (i < 12) {
        value.push(getRandom(200, 200));
      } else if (i < 20) {
        value.push(getRandom(300, 400));
      } else {
        value.push(getRandom(10, 50));
      }
    }
    value.push(20);
    setHoursValue(value);
    const timer = setInterval(() => {
      value[value.length - 1] = value[value.length - 1] + 2;
      setHoursValue(value);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [show, setShow] = useState(false);
  const [headerText, setHeaderText] = useState();
  const [total, setTotal] = useState();
  const [subitem, setSubitem] = useState();

  const geoCoordClick = (params: any) => {
    setShow(true);
    setHeaderText(params.name);
    setTotal(params.data.value[2]);
    // test data
    setSubitem([{ name: '门店1', value: getRandom(10, 20) }, { name: '门店2', value: getRandom(10, 40) }, { name: '门店3', value: getRandom(10, 30) }]);
  }


  const MapDetailsProps = {
    show,
    width: '240px',
    height: '400px',
    top: '100px',
    right: '20px',
    total,
    subitem,
    headerText,
    onClose: () => {
      setShow(false);
    },
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}></div>
        <div className={styles.center}></div>
        <div className={styles.right}></div>
        <div className={styles.text}>Demo数据展示</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.main}>
        <div className={styles.chartsFlex}>
          <div className={styles.lineChart}>
            <LineChart />
          </div>
          <div className={styles.barChart}>
            <BarChart />
          </div>
          <div className={styles.pieChart}>
            <PieChart />
          </div>
        </div>

        <div className={classNames(styles.chartsFlex, styles.mgt_10)}>
          <div className={styles.hoursMinChart}>
            <HoursChart hoursData={hoursData()} data={hoursValue} />
          </div>
        </div>

        <div className={classNames(styles.chartsFlex, styles.mgt_10)}>
          <div className={styles.mapChart}>
            <MapChart data={saleData} geoCoordMap={geoCoordMap} geoCoordClick={geoCoordClick} />
            <MapDetails {...MapDetailsProps} />
          </div>
        </div>

      </div>
    </div>
  );
}
