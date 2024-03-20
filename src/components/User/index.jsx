import React, { useState } from 'react'
import styles from './style.module.css'
import { useStateValue } from '../../context/StateProvider';
import { NavLink, Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { motion } from 'framer-motion'


const auth = getAuth(app); 



import { app } from "../../config/fireBase.config"


export default function HeaderHome() {
    const [{ user }, dispatch] = useStateValue()
    const [menu, setMenu] = useState(false)

    const auth = getAuth(app)
    const handleLogOut = () => {
        auth.signOut().then(() => {
            window.localStorage.setItem("auth", "false")
        }).catch((e) => console.log(e));
        Navigate("/login")
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


                {window.innerWidth > 450 && <div className={!window.location.hash.includes("/dashboard") ? styles.userName : ""}>
                    <h3>{user?.name}</h3>
                    <p>role : {user?.role}</p>
                </div>}
            </div>

            {menu && <motion.div
                initial={{ opacity: 1, y: 100 }}
                animate={{ opacity: 20, y: 1 }}
                transition={{ duration: 0.7 }}

                className={styles.popupLogOut}
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
                {user && user?.role === 'admin' && <>
                    <hr />
                    <NavLink to={"/dashboard"}>
                        <p>
                            dashboard
                        </p>
                    </NavLink>
                    <hr />
                </>}
                <NavLink className={styles.logOut}>
                    <p onClick={handleLogOut}>
                        logOut
                    </p>
                </NavLink>
            </motion.div>}
        </div>
    )
}
