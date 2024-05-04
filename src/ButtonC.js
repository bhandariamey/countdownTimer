import React from 'react'
import styles from './ButtonC.module.css'
export default function ButtonC(props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.time}>{props.time}</p>
      <p className={styles.text}>{props.text}</p>
    </div>
  )
}
