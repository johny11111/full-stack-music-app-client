import React from 'react'
import styles from "./style.module.css";
import { NavLink } from 'react-router-dom'
import { IoSearch, IoHomeOutline, IoLibrary } from "react-icons/io5";


export default function NavBottom() {
    return (
        <div className={styles.containerNavBottom}>
            <NavLink to={"/library"}>
                <IoLibrary className={styles.Icon}   />
                <p>library</p>
            </NavLink>
            <NavLink to={"/search"}>
                <IoSearch className={styles.Icon} />
                <p>search</p>
            </NavLink>
            <NavLink to={"/"}>
                <IoHomeOutline className={styles.Icon} />
                <p>home</p>

            </NavLink>
        </div>
    )
}