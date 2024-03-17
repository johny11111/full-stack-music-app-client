import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import NavSide from '../NavSide';
import { useStateValue } from '../../context/StateProvider';
import { getAllAlbums } from '../../api';
import { reducerCases } from '../../context/constants';
import AlbumPage from '../AlbumPage';

import AlbumCard from '../AlbumCard';
import { Route, Routes } from 'react-router-dom';
import Search from '../Search';
import { IoIosMenu } from "react-icons/io";

export default function Home({ setScreenTime, screenTime, currentSongIndex, setCurrentSongIndex, setCurrentTime,
    currentTime }) {



    const [{ albums, audioRef }, dispatch] = useStateValue();
    const [menuClicked, setMenuClicked] = useState(false)


    useEffect(() => {
        async function fetchData() {

            await getAllAlbums().then((data) => {
                dispatch({ type: reducerCases.SET_ALBUMS, albums: data.album });
            });
        }
        fetchData()
    }, []);

    return (
        <div className={styles.containerHome}>
            <div className={styles.containerMenu} 
            onClick={()=> setMenuClicked(prev => !prev)}
            ><IoIosMenu /></div>
            <div className={styles.grid}>
                <div className={!menuClicked ? styles.containerNavSide : styles.navSide}>
                    <NavSide menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
                </div>
                <div className={styles.bodyContent}>
                    <Routes>
                        <Route path='/search' element={<Search audioRef={audioRef} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex} />} />
                        <Route path='/' element={<div className={styles.containerSongsH}>
                            <div style={{ "width": "100%", "height": "98%" }}>
                                <h3>top albums in spanish</h3>
                                <div className={styles.containerTitle}>

                                    {albums && albums.map((album, i) => (
                                        <AlbumCard key={album._id} album={album} i={i} />
                                    ))}
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
