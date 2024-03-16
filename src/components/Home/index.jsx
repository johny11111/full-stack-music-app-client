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


export default function Home({ setScreenTime , screenTime , currentSongIndex, setCurrentSongIndex, setCurrentTime,
    currentTime }) {

    

    const [{ albums, audioRef }, dispatch] = useStateValue();


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
            <div className={styles.grid}>
                <div className={styles.containerNavSide}>
                    <NavSide />
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
