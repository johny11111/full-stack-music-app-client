import React from 'react'
import styles from './style.module.css'


export default function Loading() {
    return (
        <div className={styles.containerLoading}>
            <div className={styles.Loading}>
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>

            </div>
        </div>
    )
}
