import React, { useEffect, useState, useRef } from 'react';
import styles from "./style.module.css";
import NavSide from '../NavSide';
import HeaderHome from '../User';
import { useStateValue } from '../../context/StateProvider';
import { getAllAlbums, getAllSongs } from '../../api';
import { reducerCases } from '../../context/constants';
import { FaPlayCircle } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { MdOutlineLineStyle } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { motion } from 'framer-motion';

export default function AlbumPage({ currentSongIndex, setCurrentSongIndex, audioRef, currentTime, setCurrentTime }) {

    const [{ songs, selectedAlbum, albumSongs, currentSong, isPlaying }, dispatch] = useStateValue();
    const [selectedSong, setSelectedSong] = useState(null);



    useEffect(() => {
        localStorage.setItem('currentSongIndex', currentSongIndex);
    }, [currentSongIndex]);


    // use effect for get all songs
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


    
// use effect to select the song from album
    useEffect(() => {
        const filter = songs?.filter(song => song.album === selectedAlbum._id)
        dispatch({ type: reducerCases.SET_ALBUM_SONGS, albumSongs: filter })
    }, [])




    // click on song 
    const handleSongClick = async (song, index) => {
        if (songs) {
            const filter = songs.filter(song => song.album === selectedAlbum._id)
            if (filter) {
                dispatch({ type: reducerCases.SET_SONGS_PLAYED, songsPlayed: filter })
                dispatch({ type: reducerCases.SET_CURRENT_SONG, currentSong: song })
            }
        }

        if (audioRef.current && currentSong && currentSong._id === song._id) {
            if (isPlaying) {
                await audioRef.current.pause();
                await dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: false });
            } else {
                await audioRef.current.play();
                await dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setSelectedSong(song);
            setCurrentSongIndex(index);


            if (audioRef.current) {
                await new Promise((resolve, reject) => {
                    audioRef.current.addEventListener('canplaythrough', () => {
                        resolve();
                    });
                    audioRef.current.load();
                });
                await audioRef.current.play();
                await dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });
            }
        }
    };



    return (
        <div className={styles.containerHome}>
            <div className={styles.grid}>
                <div className={ styles.bodyContent}>
                    <div className={styles.containerSongsH}>
                        <div style={{ "overflow": "scroll", "width": "100%", "height": "98%" }}>
                            <div className={styles.HeaderBody}>
                                {/* <div>  <HeaderHome /></div> */}
                                <motion.div
                                    initial={{ opacity: 1, x: 100 }}
                                    animate={{ opacity: 100, x: 1 }}
                                    transition={{ duration: 1.2 }}
                                    style={{ "maxHeight": "100%", "display": "flex", "alignItems": "center", "fontSize": "3rem", "color": "white", "gap": "3rem" }}>
                                    <img className={styles.img} src={selectedAlbum?.image} alt="" />
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
                                    className={styles.flex} >
                                    <p>#</p>
                                    <p>name</p>
                                    <p>duration</p>
                                </motion.div>


                                <div className={styles.containerBodyContent}>
                                    {albumSongs && albumSongs.map((song, i) => (
                                        <motion.div
                                                initial={{ opacity: 1, y: 100 }}
                                                animate={{ opacity: 20, y: 1 }}
                                                transition={{ duration: 0.7 }}
                                            // className={styles.bodyContent}
                                            onClick={() => handleSongClick(song, i)}
                                            key={song?._id}
                                            className={styles.containerSongHome}
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
