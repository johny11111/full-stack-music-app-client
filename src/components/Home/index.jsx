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
import { Routes, Route } from 'react-router-dom';
import Search from '../Search';
import User from "../User";
import ArtistPage from '../ArtistPage';
import Library from '../Library';

export default function Home({ setScreenTime, screenTime, currentSongIndex, setCurrentSongIndex, setCurrentTime, currentTime }) {
    const [{ user, albums = [], audioRef, artists = [], artistSelected, currentSong }, dispatch] = useStateValue();
    const [albumsInSpanish, setAlbumsInSpanish] = useState([]);
    const [albumsInHebrew, setAlbumsInHebrew] = useState([]);
    const [filterLibrary, setFilterLibrary] = useState([]);

    const [showAllArtists, setShowAllArtists] = useState(false);
    const [showAllSpanishAlbums, setShowAllSpanishAlbums] = useState(false);
    const [showAllHebrewAlbums, setShowAllHebrewAlbums] = useState(false);

    useEffect(() => {
        if (!artistSelected) {
            async function fetchData() {
                const data = await getAllArtists();
                dispatch({ type: reducerCases.SET_ARTISTS, artists: data?.artist || [] });
            }
            fetchData();
        }
    }, [artistSelected, dispatch]);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllAlbums();
            dispatch({ type: reducerCases.SET_ALBUMS, albums: data?.album || [] });
        }
        fetchData();
    }, [user, dispatch]);

    useEffect(() => {
        if (albums && albums.length > 0) {
            const filterSpanish = albums.filter(album => album?.language === 'spanish');
            setAlbumsInSpanish(filterSpanish || []);

            const filterHebrew = albums.filter(album => album?.language === 'Hebrew');
            setAlbumsInHebrew(filterHebrew || []);

            const filterPlaylist = albums.filter(album => album?.name === 'playlist');
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
                    className={styles.containerNavSide}
                >
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
                                        {/* סקשן אמנים */}
                                        <h3>אמנים</h3>
                                        <div className={styles.containerArtist}>
                                            {artists?.length > 0 ? (showAllArtists ? artists : artists.slice(0, 8)).map((artist, i) => (
                                                <ArtistCard key={artist?._id} artist={artist} i={i} />
                                            )) : <p>לא נמצאו אמנים להצגה.</p>}
                                        </div>
                                        {artists?.length > 8 && (
                                            <button
                                                className={styles.seeAllButton}
                                                onClick={() => setShowAllArtists(!showAllArtists)}
                                            >
                                                {showAllArtists ? 'See Less' : 'See All'}
                                            </button>
                                        )}

                                        <h3>פלייליסט</h3>
                                        <div>
                                            {albums?.length > 0 && (
                                                albums.map((album, i) => (
                                                    <div >
                                                        { album.name === "playlist" &&  <AlbumCard key={album?._id} album={album} i={i} />  }
                                                    </div>
                                                ))
                                            ) }
                                        </div>

                                        {/* סקשן אלבומים בספרדית */}
                                        <h3>אלבומים בספרדית</h3>
                                        <div className={styles.containerTitle}>
                                            {(albumsInSpanish?.length > 0 ? (showAllSpanishAlbums ? albumsInSpanish : albumsInSpanish.slice(0, 8)) : []).map((album, i) => (
                                                <AlbumCard key={album?._id} album={album} i={i} />
                                            ))}
                                        </div>
                                        {albumsInSpanish?.length > 8 && (
                                            <button
                                                className={styles.seeAllButton}
                                                onClick={() => setShowAllSpanishAlbums(!showAllSpanishAlbums)}
                                            >
                                                {showAllSpanishAlbums ? 'See Less' : 'See All'}
                                            </button>
                                        )}

                                        {/* סקשן אלבומים בעברית */}
                                        <h3>אלבומים בעברית</h3>
                                        <div className={styles.containerTitle}>
                                            {(albumsInHebrew?.length > 0 ? (showAllHebrewAlbums ? albumsInHebrew : albumsInHebrew.slice(0, 8)) : []).map((album, i) => (
                                                <AlbumCard key={album?._id} album={album} i={i} />
                                            ))}
                                        </div>
                                        {albumsInHebrew?.length > 8 && (
                                            <button
                                                className={styles.seeAllButton}
                                                onClick={() => setShowAllHebrewAlbums(!showAllHebrewAlbums)}
                                            >
                                                {showAllHebrewAlbums ? 'See Less' : 'See All'}
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
