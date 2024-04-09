import React from 'react'
import styles from "./style.module.css";
import { NavLink } from 'react-router-dom'
import { IoSearch, IoHomeOutline, IoLibrary } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";



export default function NavBottom() {
    return (
        <div className={styles.containerNavBottom}>
            <NavLink to={"main/music/65dc006a8ec083f5cc8b5992"}>
                <IoLibrary className={styles.Icon}   />
                <p>library</p>
            </NavLink>
            <NavLink to={"main/search"}>
                <IoSearch className={styles.Icon} />
                <p>search</p>
            </NavLink>
            <NavLink to={"/main"}>
                <IoHomeOutline className={styles.Icon} />
                <p>home</p>

            </NavLink>
            <NavLink to={"main/user"}>
                <FaRegUser className={styles.Icon} />
                <p>user</p>

            </NavLink>
        </div>
    )
}
