import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import NavSide from '../NavSide';
import { useStateValue } from '../../context/StateProvider';
import { getAllAlbums, getAllArtists } from '../../api';
import { reducerCases } from '../../context/constants';
import ArtistCard from "../ArtistCard"
import AlbumPage from '../AlbumPage';
import { motion } from 'framer-motion'

import AlbumCard from '../AlbumCard';
import { Navigate, Route, Routes } from 'react-router-dom';
import Search from '../Search';
import User from "../User"
import ArtistPage from '../ArtistPage';
export default function Home({ setScreenTime, screenTime, currentSongIndex, setCurrentSongIndex, setCurrentTime,
    currentTime }) {



    const [{ user, albums, audioRef, artists, artistSelected }, dispatch] = useStateValue();
    const [albumsInSpanish, setAlbumsInSpanish] = useState(null)
    const [albumsInHebrew, setAlbumsInHebrew] = useState(null)


    useEffect(() => {
        if (!artistSelected) {
            async function fetchData() {
                await getAllArtists().then((data) => {
                    dispatch({ type: reducerCases.SET_ARTISTS, artists: data.artist });
                });
            }
            fetchData()
        }
    }, [])


    useEffect(() => {
        async function fetchData() {
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
                        <Route path='/artist' element={<ArtistPage />} />
                        <Route path='/user' element={<User />} />
                        <Route path='/search' element={<Search audioRef={audioRef} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex} />} />
                        <Route path='/' element={<div className={styles.containerSongsH}>
                            <div className={styles.containerHomeContent}>
                                <div className={styles.homeBodyContent} >

                                    <h3>אלבומים בספרדית</h3>
                                    <div className={styles.containerTitle}>
                                        {albumsInSpanish && albumsInSpanish.map((album, i) => (
                                            <AlbumCard key={album._id} album={album} i={i} />
                                        ))}
                                    </div>

                                    <h3>אמנים</h3>
                                    <div className={styles.containerArtist}>
                                        {artists && artists.map((artist, i) => <ArtistCard key={artist._id} artist={artist} i={i} />
                                        )}
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
