import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import NavSide from '../NavSide';
import { useStateValue } from '../../context/StateProvider';
import { getAllAlbums, getAllArtists } from '../../api';
import { reducerCases } from '../../context/constants';
import ArtistCard from "../ArtistCard";
import AlbumPage from '../AlbumPage';
import { motion } from 'framer-motion';
import AlbumCard from '../AlbumCard';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import Search from '../Search';
import User from "../User";
import ArtistPage from '../ArtistPage';
import Library from '../Library';

export default function Home({ setScreenTime, screenTime, currentSongIndex, setCurrentSongIndex, setCurrentTime, currentTime }) {

    const [{ user, albums, audioRef, artists, artistSelected, currentSong }, dispatch] = useStateValue();
    const [albumsInSpanish, setAlbumsInSpanish] = useState([]);
    const [albumsInHebrew, setAlbumsInHebrew] = useState([]);
    const [filterLibrary, setFilterLibrary] = useState([]);

    // State להרחבת התצוגה
    const [showAllArtists, setShowAllArtists] = useState(false);
    const [showAllSpanish, setShowAllSpanish] = useState(false);
    const [showAllHebrew, setShowAllHebrew] = useState(false);

    useEffect(() => {
        if (!artistSelected) {
            async function fetchData() {
                await getAllArtists().then((data) => {
                    dispatch({ type: reducerCases.SET_ARTISTS, artists: data?.artist || [] });
                });
            }
            fetchData();
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            await getAllAlbums().then((data) => {
                dispatch({ type: reducerCases.SET_ALBUMS, albums: data?.album || [] });
            });
        }
        fetchData();
    }, [user]);

    useEffect(() => {
        if (albums) {
            const filter = albums?.filter(album => album.language === 'spanish');
            setAlbumsInSpanish(filter || []);

            const filterHebrew = albums.filter(album => album.language === 'Hebrew');
            setAlbumsInHebrew(filterHebrew || []);

            const filterPlaylist = albums.filter(album => album.name === 'playlist');
            setFilterLibrary(filterPlaylist || []);
        }
    }, [albums]);

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
                        <Route path='/library' element={<Library />} />
                        <Route path='/artist' element={<ArtistPage />} />
                        <Route path='/user' element={<User />} />
                        <Route path='/search' element={<Search audioRef={audioRef} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex} />} />
                        <Route path='/' element={
                            <div className={styles.containerSongsH}>
                                <div className={styles.containerHomeContent}>
                                    <div className={currentSong ? styles.homeBodyContent : styles.homeBodyContentPlay}>
                                        {/* אמנים */}
                                        <h3>אמנים</h3>
                                        <div className={styles.containerArtist}>
                                            {artists && artists.length > 0 ? (showAllArtists ? artists : artists.slice(0, 6)).map((artist, i) => (
                                                <ArtistCard key={artist._id} artist={artist} i={i} />
                                            )) : <p>אין אמנים להצגה</p>}
                                        </div>
                                        {artists && artists.length > 6 && (
                                            <button className={styles.showMoreButton} onClick={() => setShowAllArtists(!showAllArtists)}>
                                                {showAllArtists ? 'הצג פחות' : 'לראות עוד'}
                                            </button>
                                        )}

                                        <h3>שירים שאהבתי</h3>
                                        <div>
                                            {filterLibrary && filterLibrary.length > 0 ? <AlbumCard album={filterLibrary[0]} /> : <p>אין שירים להצגה</p>}
                                        </div>

                                        {/* אלבומים בספרדית */}
                                        <h3>אלבומים בספרדית</h3>
                                        <div className={styles.containerTitle}>
                                            {albumsInSpanish && albumsInSpanish.length > 0 ? (showAllSpanish ? albumsInSpanish : albumsInSpanish.slice(0, 8)).map((album, i) => (
                                                <AlbumCard key={album._id} album={album} i={i} />
                                            )) : <p>אין אלבומים בספרדית להצגה</p>}
                                        </div>
                                        {albumsInSpanish && albumsInSpanish.length > 6 && (
                                            <button className={styles.showMoreButton} onClick={() => setShowAllSpanish(!showAllSpanish)}>
                                                {showAllSpanish ? 'הצג פחות' : 'לראות עוד'}
                                            </button>
                                        )}


                                        {/* אלבומים בעברית */}
                                        <h3>אלבומים בעברית</h3>
                                        <div className={styles.containerTitle}>
                                            {albumsInHebrew && albumsInHebrew.length > 0 ? (showAllHebrew ? albumsInHebrew : albumsInHebrew.slice(0, 8)).map((album, i) => (
                                                <AlbumCard key={album._id} album={album} i={i} />
                                            )) : <p>אין אלבומים בעברית להצגה</p>}
                                        </div>
                                        {albumsInHebrew && albumsInHebrew.length > 6 && (
                                            <button className={styles.showMoreButton} onClick={() => setShowAllHebrew(!showAllHebrew)}>
                                                {showAllHebrew ? 'הצג פחות' : 'לראות עוד'}
                                            </button>
                                        )}

                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path='/music/:id' element={<AlbumPage setScreenTime={setScreenTime} screenTime={screenTime} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex} audioRef={audioRef} currentTime={currentTime} setCurrentTime={setCurrentTime} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
