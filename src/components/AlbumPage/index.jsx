import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import { useStateValue } from '../../context/StateProvider';
import { getAllSongs } from '../../api';
import { reducerCases } from '../../context/constants';
import { FaPlayCircle } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { MdOutlineLineStyle } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { CgMusic } from "react-icons/cg";
import { motion } from 'framer-motion';

export default function AlbumPage({ currentSongIndex, setCurrentSongIndex, audioRef, currentTime, setCurrentTime }) {
    const [{ user, songs, selectedAlbum, albumSongs, currentSong, isPlaying }, dispatch] = useStateValue();
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
        localStorage.setItem('currentSongIndex', currentSongIndex);
    }, [currentSongIndex]);

    useEffect(() => {
        const fetchData = async () => {
            if (!songs) {
                await getAllSongs().then((data) => {
                    dispatch({ type: reducerCases.SET_SONGS, songs: data.songs });
                });
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedAlbum) {
            const filter = songs?.filter(song => song.album === selectedAlbum._id);
            dispatch({ type: reducerCases.SET_ALBUM_SONGS, albumSongs: filter });

            if (selectedAlbum.name === "playlist") {
                dispatch({ type: reducerCases.SET_ALBUM_SONGS, albumSongs: user.playlist });
            }
        }
    }, [songs, selectedAlbum]);

    const handleSongClick = async (song, index) => {
        if (songs) {
            const filter = songs.filter(song => song.album === selectedAlbum._id);
            if (filter) {
                dispatch({ type: reducerCases.SET_SONGS_PLAYED, songsPlayed: filter });
                dispatch({ type: reducerCases.SET_CURRENT_SONG, currentSong: song });
            }
            if (selectedAlbum.name === "playlist") {
                dispatch({ type: reducerCases.SET_SONGS_PLAYED, songsPlayed: user.playlist });
                dispatch({ type: reducerCases.SET_CURRENT_SONG, currentSong: song });
            }
        }
    
        if (audioRef.current && currentSong && currentSong._id === song._id) {
            // ניגון או השהיה של השיר אם הוא כבר נבחר
            if (isPlaying) {
                audioRef.current.pause();
                dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: false });
            } else {
                audioRef.current.play();
                dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });
            }
        } else {
            // אם השיר הנוכחי שונה מהשיר שנבחר, עצור את השיר הנוכחי ונגן את השיר החדש
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = song.audioUrl; // ודא ש-URL של השיר נכון
            }
            setSelectedSong(song);
            setCurrentSongIndex(index);
            dispatch({ type: reducerCases.SET_CURRENT_SONG, currentSong: song });
    
            if (audioRef.current) {
                // חכה שהשיר ייטען לפני הניגון
                await new Promise((resolve) => {
                    const onCanPlay = () => {
                        audioRef.current.play();
                        dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });
                        audioRef.current.removeEventListener('canplaythrough', onCanPlay);
                        resolve();
                    };
                    audioRef.current.addEventListener('canplaythrough', onCanPlay);
                    audioRef.current.load();
                });
            }
        }
    };
    



    return (
        <div className={styles.containerHome}>
            <div className={styles.grid}>
                <div className={styles.bodyContentAlbumPage}>
                    <div className={styles.containerSongsH}>
                        <div style={{ overflow: 'scroll', width: '100%', height: '98%' }}>
                            <div className={styles.HeaderBody}>
                                <motion.div
                                    initial={{ opacity: 1, x: 100 }}
                                    animate={{ opacity: 100, x: 1 }}
                                    transition={{ duration: 1.2 }}
                                    className={`${styles.albumHeader} ${selectedAlbum?.name === "playlist" ? styles.playlistHeader : ''}`}
                                >
                                    {selectedAlbum?.image !== "none" && selectedAlbum?.image ? (
                                        <img className={styles.img} src={selectedAlbum?.image} alt="album" />
                                    ) : (
                                        <CgMusic style={{ fontSize: "5rem" }} />
                                    )}
                                    <p>{selectedAlbum?.name}</p>
                                </motion.div>
                            </div>
                            <div className={styles.cover}></div>
                            <div className={currentSong ? styles.containerTitle : styles.containerSongsBody}>
                                <div className={styles.containerPlaySongs}>
                                    <div className={styles.containerFex}>
                                        <p><FaPlayCircle className={styles.playIconH} /></p>
                                        <p><BiLike className={styles.likeIconH} /></p>
                                        <p><SlOptions /></p>
                                    </div>
                                    <p><MdOutlineLineStyle /></p>
                                </div>
                                <motion.div
                                    initial={{ opacity: 1, x: 90 }}
                                    animate={{ opacity: 90, x: 1 }}
                                    transition={{ duration: 1.2 }}
                                    className={styles.flex}
                                >
                                    <p>#</p>
                                    <p>name</p>
                                    <p>duration</p>
                                </motion.div>

                                <div className={currentSong ? styles.containerBodyContent : styles.containerBodyContentPlayerNone}>
                                    {albumSongs?.map((song, i) => (
                                        <motion.div
                                            initial={{ opacity: 1, y: 100 }}
                                            animate={{ opacity: 20, y: 1 }}
                                            transition={{ duration: 0.7 }}
                                            onClick={() => handleSongClick(song, i)}
                                            key={song?._id}
                                            className={`${styles.containerSongHome} ${selectedAlbum?.name === "playlist" ? styles.playlistSong : ''}`}
                                        >
                                            <p>{i + 1}</p>
                                            <h4>{song?.name}</h4>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
