import React from 'react';
import styles from "./style.module.css";
import { motion } from 'framer-motion'

export default function Song({ song, i , handleClick }) {
    return (
        <motion.div
            initial={{ opacity: 1, y: 100 }}
            animate={{ opacity: 20, y: 1 }}
            transition={{ duration: 0.7 }}
            className={styles.containerSongHome}
            onClick={() => handleClick(song)}
            key={i}
        >
            <p>{i + 1}</p>
            <h4>{song?.name}</h4>
        </motion.div>
    )
}
