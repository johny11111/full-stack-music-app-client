import React, { useState } from 'react'
import styles from './style.module.css';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion"
import { HTMLFactory } from 'react';
import HeaderHome from '../User'
import User from '../User';



// import Logo from '../../assets/images/logo.png';

export default function NavSide({ setMenuClicked, MenuClicked }) {

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

  const [path, setPath] = useState(window.location.pathname)
  return (
    <motion.div
      animate={"open"}
      variants={variants}

      className={styles.containerNavSide}>
      <div className={styles.HeaderBody}>
        <div>  <User /></div>
      </div>

      <NavLink to={"/"} >
        <div className={styles.divImg}>
          <img className={styles.img} src="../../../RmusicLogo.jpg" alt="icon" />
        </div>
      </NavLink>

      <div className={styles.containerUl}>
        <motion.ul
          initial={{ opacity: 1, x: 90 }}
          animate={{ opacity: 90, x: 1 }}
          transition={{ duration: 0.5 }}
        >
          <li onClick={() => setMenuClicked(prev => !prev)} ><NavLink to={"/"}>home</NavLink></li>
          <li onClick={() => setMenuClicked(prev => !prev)} ><NavLink to={"/music"}>music</NavLink></li>
          <li onClick={() => setMenuClicked(prev => !prev)} ><NavLink to={"/search"}>search</NavLink></li>
          <li onClick={() => setMenuClicked(prev => !prev)} ><NavLink to={"/contact"}>contact us</NavLink></li>
        </motion.ul>
      </div>
    </motion.div>
  )
}
