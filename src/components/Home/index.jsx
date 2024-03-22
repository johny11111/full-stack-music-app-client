import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import NavSide from '../NavSide';
import { useStateValue } from '../../context/StateProvider';
import { getAllAlbums } from '../../api';
import { reducerCases } from '../../context/constants';
import AlbumPage from '../AlbumPage';
import { motion } from 'framer-motion'

import AlbumCard from '../AlbumCard';
import { Navigate, Route, Routes } from 'react-router-dom';
import Search from '../Search';
import User from "../User"
export default function Home({ setScreenTime, screenTime, currentSongIndex, setCurrentSongIndex, setCurrentTime,
    currentTime }) {



    const [{ user, albums, audioRef }, dispatch] = useStateValue();
    const [albumsInSpanish, setAlbumsInSpanish] = useState(null)
    const [albumsInHebrew, setAlbumsInHebrew] = useState(null)


    useEffect(() => {
        if (user === null) {
            <div style={{ "width": "100vw", "position": "absolute", "top": "0" , "height": "100vh" }}>hello world</div>
        }
    }, [user])

    useEffect(() => {
        console.log(user);
        async function fetchData() {
            if (user === null) {
                return <div style={{ "width": "100vw", "position": "absolute" }}>hello world</div>
            }
            await getAllAlbums().then((data) => {

                dispatch({ type: reducerCases.SET_ALBUMS, albums: data.album });
            });
        }
        fetchData()
    }, [user]);

    useEffect(() => {
        if (albums) {
            const filter = albums?.filter(album => album.language === 'spanish')
            setAlbumsInSpanish(filter)

            const filterHebrew = albums.filter(album => album.language === 'Hebrew')
            setAlbumsInHebrew(filterHebrew)
        }
    }, [albums])





    return (
        <div className={styles.containerHome}>

            <div className={styles.grid}>
                <motion.div
                    initial={{ opacity: 1, y: 100 }}
                    animate={{ opacity: 20, y: 1 }}
                    transition={{ duration: 0.7 }}

                    className={styles.containerNavSide}>
                    <NavSide />
                </motion.div>
                <div className={styles.bodyContent}>
                    <Routes>
                        <Route path='/user' element={<User />} />
                        <Route path='/search' element={<Search audioRef={audioRef} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex} />} />
                        <Route path='/' element={<div className={styles.containerSongsH}>
                            <div className={styles.containerHomeContent}>
                                <div style={{ "height": "78lvh", "overflowY": "scroll", "direction": "rtl", "padding": "0.5rem" }} >
                                    <h3>אלבומים בספרדית</h3>
                                    <div className={styles.containerTitle}>
                                        {albumsInSpanish && albumsInSpanish.map((album, i) => (
                                            <AlbumCard key={album._id} album={album} i={i} />
                                        ))}
                                    </div>

                                    <h3>אלבומים בעברית</h3>
                                    <div className={styles.containerTitle}>
                                        {albumsInHebrew && albumsInHebrew.map((album, i) => (
                                            <AlbumCard key={album._id} album={album} i={i} />
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>} />

                        <Route path='/music/:id' element={<AlbumPage setScreenTime={setScreenTime} screenTime={screenTime} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex} audioRef={audioRef} currentTime={currentTime} setCurrentTime={setCurrentTime} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
