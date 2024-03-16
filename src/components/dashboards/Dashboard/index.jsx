import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import NavSide from '../../NavSide';
import { GoHome } from "react-icons/go";
import User from '../../User/index.jsx';
import { getAllUsers } from '../../../api/index.js';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useStateValue } from '../../../context/StateProvider';
import { reducerCases } from '../../../context/constants';
import { getAllSongs , getAllAlbums , getAllArtists } from '../../../api/index.js';


import DashboardHome from '../DashboardHome';
import DashboardArtist from '../DashboardArtist';
import DashboardSongs from '../DashboardSongs';
import DashboardUsers from '../DashboardUsers';
import DashboardArtists from '../DashboardArtist';
import DashboardAlbums from '../DashboardAlbums';
import DashboardNowSong from '../DashboardNowSong/index.jsx';
import Header from '../../Header/index.jsx';

export default function Dashboard() {
  const [activeLink, setActiveLink] = useState(null);

  const [{ users, artists, albums, songs }, dispatch] = useStateValue()


  useEffect(() => {
    if (!users) {
      getAllUsers().then((res) => {
        dispatch({ type: reducerCases.SET_USERS, users: res.user });
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [])
  
  useEffect(() => {
    if (!songs) {
      getAllSongs().then((data) => {
        dispatch({ type: reducerCases.SET_SONGS, songs: data?.songs });
      })
    }
  }, [])

  useEffect(() => {
    if (!albums) {
      getAllAlbums().then((data) => {
        dispatch({ type: reducerCases.SET_ALBUMS, albums: data?.album });
      })
    }
  }, [])

  useEffect(() => {
    if (!artists) {
      getAllArtists().then((data) => {
        console.log("data" , data);
        dispatch({ type: reducerCases.SET_ARTISTS, artists: data?.artist });
      })
    }
  }, [])

  

  return (
    <div>
      <User />
      <Header />
      
      <div className={styles.divD}>
        <NavLink
          onClick={() => setActiveLink('home')}
          className={`${styles.navLink} ${activeLink === 'home' ? styles.active : ''}`}
          to={"/dashboard"} // שינוי כאן
        >
          <GoHome className={styles.iconHome} />
        </NavLink>


        <NavLink
          onClick={() => setActiveLink('songs')}
          className={`${styles.navLink} ${activeLink === 'songs' ? styles.active : ''}`}
          to={"/dashboard/songs"}
        >
          songs
        </NavLink>

        <NavLink
          onClick={() => setActiveLink('users')}
          className={`${styles.navLink} ${activeLink === 'users' ? styles.active : ''}`}
          to={"/dashboard/users"}
        >
          users
        </NavLink>

        <NavLink
          onClick={() => setActiveLink('artists')}
          className={`${styles.navLink} ${activeLink === 'artists' ? styles.active : ''}`}
          to={"/dashboard/artists"}
        >
          artists
        </NavLink>
        <NavLink
          onClick={() => setActiveLink('albums')}
          className={`${styles.navLink} ${activeLink === 'albums' ? styles.active : ''}`}
          to={"/dashboard/albums"}
        >
          albums
        </NavLink>
      </div>

      <div className={styles.containerBody}>
        {/* <Routes>
        <Route path='/dashboard/home'  element={<DashboardHome />}/>
       </Routes> */}
        {window.location.pathname === "/dashboard" && <DashboardHome />}
        {window.location.pathname === "/dashboard/songs" && <DashboardSongs />}
        {window.location.pathname === "/dashboard/users" && <DashboardUsers />}
        {window.location.pathname === "/dashboard/artists" && <DashboardArtists />}
        {window.location.pathname === "/dashboard/albums" && <DashboardAlbums />}
        {window.location.pathname === "/dashboard/nowSong" && <DashboardNowSong />}

      </div>

    </div>
  );
}
