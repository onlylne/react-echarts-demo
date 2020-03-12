import React, { useState, useEffect } from 'react';
import styles from './index.css'

interface Props {
  width: string,
  height: string,
  top?: number | string,
  left?: number | string,
  right?: number | string,
  bottom?: number | string,
  headerText: string,
  total: number,
  subitem: Array<{ name: string, value: number }>,
  show: boolean,
  onClose: Function,
}

const MapDetails = React.memo((props: Props) => {

  const containerStyle = {
    width: props.width,
    height: props.height,
    top: props.top,
    left: props.left,
    right: props.right,
    bottom: props.bottom,
    display: props.show ? 'block' : 'none',
  }

  const close = () => {
    props.onClose();
  }

  const { headerText, total, subitem = [] } = props;

  return (
    <div style={containerStyle} className={styles.containerStyle}>
      <div className={styles.close} onClick={close}>+</div>
      <div className={styles.header}>
        {headerText}
      </div>
      <div className={styles.salesData}>
        <div className={styles.total}>总销量: {total}</div>
        {
          subitem.map(item => (
            <div key={item.name} className={styles.subitem}>{item.name}: {item.value}</div>
          ))
        }
      </div>
    </div>
  )
})

export default MapDetails;

// export default function MapDetails(props: Props) {

//   const [show, setShow] = useState('none');

//   const containerStyle = {
//     width: props.width,
//     height: props.height,
//     top: props.top,
//     left: props.left,
//     right: props.right,
//     bottom: props.bottom,
//     display: show,
//   }

//   useEffect(() => {
//     console.log(props)
//   })

//   const { headerText, total, subitem = [] } = props;

//   return (
//     <div style={containerStyle} className={styles.containerStyle}>
//       <div className={styles.header}>
//         {headerText}
//       </div>
//       <div className={styles.salesData}>
//         <div className={styles.total}>总销量: {total}</div>
//         {
//           subitem.map(item => (
//             <div className={styles.subitem}>{item.name}: {item.value}</div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }