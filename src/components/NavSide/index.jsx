import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import User from '../User';

export default function NavSide({ isPlayerActive }) {
  const [playerActive, setPlayerActive] = useState(isPlayerActive || false);

  useEffect(() => {
    setPlayerActive(isPlayerActive);
  }, [isPlayerActive]);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <motion.div
      animate={"open"}
      variants={variants}
      className={`${styles.containerNavSide} ${playerActive ? styles.playerActive : styles.noPlayer}`}
    >
      <div className={styles.containerUl}>
        <li><NavLink to={"/main"}>home</NavLink></li>
        <li><NavLink to={"/main/search"}>search</NavLink></li>
        <li><NavLink to={"/main/library"}>library</NavLink></li>
      </div>
      <div className={styles.HeaderBody}>
        <User />
      </div>
    </motion.div>
  );
}
