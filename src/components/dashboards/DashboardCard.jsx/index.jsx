import React from 'react'
import styles from './style.module.css';

export default function DashboardCard({ icon, name, count }) {
  return (
    <div className={styles.containerCard}>
      {icon}
      <p>{name}</p>
      <p>count {count}</p>
    </div>
  )
}
