import React from 'react'
import styles from "./style.module.css";
import { NavLink } from 'react-router-dom'
import { IoSearch, IoHomeOutline, IoLibrary } from "react-icons/io5";


export default function NavBottom() {
    return (
        <div className={styles.containerNavBottom}>
            <NavLink to={"/library"}>
                <IoLibrary />
                <p>library</p>
            </NavLink>
            <NavLink to={"/search"}>
                <IoSearch />
                <p>search</p>
            </NavLink>
            <NavLink to={"/"}>
                <IoHomeOutline />
                <p>home</p>

            </NavLink>
        </div>
    )
}
