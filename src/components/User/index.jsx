import React, { useState } from 'react';
import styles from './style.module.css';
import { useStateValue } from '../../context/StateProvider';
import { NavLink } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { motion } from 'framer-motion';
import { app } from "../../config/fireBase.config";

export default function HeaderHome() {
    const [{ user , selectedSong  }] = useStateValue();
    const [menu, setMenu] = useState(false);

    const userPage = window.location.hash.includes("/user")

    const auth = getAuth(app);

    // קביעה האם המשתמש נמצא ב-Dashboard או Home
    const isDashboard = window.location.hash.includes("/dashboard");

    const handleLogOut = () => {
        auth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
    };

    return (
        <div className={`${styles.containerHeader} ${isDashboard ? styles.dashboard : styles.home}`}>
            <div
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
                className={styles.containerUser}>
                <div className={styles.containerImg}>
                    <img className={styles.img} src={user?.image} alt="userImg" referrerPolicy='no-referrer' />
                </div>

                {!isDashboard && (
                    <div className={styles.userName}>
                        <h3>{user?.name}</h3>
                        <p>role : {user?.role}</p>
                    </div>
                )}
            </div>

            {isDashboard ? (
                menu && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className={`${styles.popupLogOut} ${styles.dashboardText}`}
                        onMouseEnter={() => setMenu(true)}
                        onMouseLeave={() => setMenu(false)}
                    >
                        <NavLink to={"user/profile"}>
                            <p>profile</p>
                        </NavLink>
                        <NavLink to={"favorites"}>
                            <p>favorites</p>
                        </NavLink>
                        {user && user?.role === 'admin' && (
                            <>
                                <hr />
                                <NavLink to={"/dashboard"}>
                                    <p>dashboard</p>
                                </NavLink>
                                <hr />
                            </>
                        )}
                        <NavLink className={styles.logOut}>
                            <p onClick={handleLogOut}>logOut</p>
                        </NavLink>
                    </motion.div>
                )
            ) : (
                <div className={ userPage ? styles.optionMenuUser :`${styles.optionsMenu} ${styles.homeText}`}>
                    <NavLink to={"user/profile"}>
                        <p>profile</p>
                    </NavLink>
                    <NavLink to={"favorites"}>
                        <p>favorites</p>
                    </NavLink>
                    {user && user?.role === 'admin' && (
                        <>
                            <hr />
                            <NavLink to={"/dashboard"}>
                                <p>dashboard</p>
                            </NavLink>
                            <hr />
                        </>
                    )}
                    <NavLink className={styles.logOut}>
                        <p onClick={handleLogOut}>logOut</p>
                    </NavLink>
                </div>
            )}
        </div>
    );
}
