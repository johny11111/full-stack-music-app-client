import React, { useState } from 'react'
import styles from './style.module.css';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion"
import User from '../User';



export default function NavSide() {

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

  return (
    <motion.div
      animate={"open"}
      variants={variants}

      className={styles.containerNavSide}>
      <div className={styles.HeaderBody}>
        <div>  <User /></div>
      </div>


      <div className={styles.containerUl}>
        <motion.ul
          initial={{ opacity: 1, x: 90 }}
          animate={{ opacity: 90, x: 1 }}
          transition={{ duration: 0.5 }}
        >
          <li><NavLink to={"/"}>home</NavLink></li>
          {/* <li><NavLink to={"/music"}>music</NavLink></li> */}
          <li><NavLink to={"/search"}>search</NavLink></li>
          <li><NavLink to={"/library"}>library</NavLink></li>
        </motion.ul>
      </div>
    </motion.div>
  )
}
