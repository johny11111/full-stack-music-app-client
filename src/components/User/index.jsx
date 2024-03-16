import React, { useState } from 'react'
import styles from './style.module.css'
import { useStateValue } from '../../context/StateProvider';
import { NavLink, Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import NavSide from '../NavSide';

const auth = getAuth(app); // או getAuth() אם אתה רוצה להשתמש באפליקציה שהוגדרה מראש

const handleLogOut = () => {
    auth.signOut().then(() => {
        window.localStorage.setItem("auth", "false")
    }).catch((e) => console.log(e));
    Navigate("/login", { replace: true })
}

import { app } from "../../config/fireBase.config"


export default function HeaderHome() {
    const [{ user }, dispatch] = useStateValue()
    const [menu, setMenu] = useState(false)

    const auth = getAuth(app)
    const handleLogOut = () => {
        auth.signOut().then(() => {
            window.localStorage.setItem("auth", "false")
        }).catch((e) => console.log(e));
        Navigate("/login", { replace: true })
    }

    return (
        <div className={styles.containerHeader}>
            

            <div
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
                className={styles.containerUser}>
                <div className={styles.containerImg}>
                    <img className={styles.img} src={user?.image} alt="userImg" referrerPolicy='no-referrer' />
                </div>
                <div className={!window.location.pathname.includes("/dashboard") ? styles.userName : ""}>
                    <h3>{user?.name}</h3>
                    <p>role : {user?.role}</p>
                </div>
            </div>
            {menu && <div className={styles.popupLogOut}
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
            >
                <NavLink to={"user/profile"}>
                    <p>
                        profile
                    </p>
                </NavLink>
                <NavLink to={"favorites"}>
                    <p>
                        favorites
                    </p>
                </NavLink>
                <hr />
                {user && user?.role === 'admin' && <>
                        <NavLink to={"/dashboard"}>
                            <p>
                                dashboard
                            </p>
                        </NavLink>
                        <hr />
                    </>}
                <NavLink>
                    <p onClick={handleLogOut}>
                        logOut
                    </p>
                </NavLink>
            </div>}
        </div>
    )
}
