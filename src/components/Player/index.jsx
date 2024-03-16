import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegPauseCircle } from "react-icons/fa";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { useStateValue } from '../../context/StateProvider';
import { reducerCases } from '../../context/constants';
import { TfiReload } from "react-icons/tfi";
import { MdAddCircleOutline } from "react-icons/md";
import { CiVolumeHigh } from "react-icons/ci";

const Player = ({ songs, currentSongIndex, setCurrentSongIndex, audioRef, currentTime, setCurrentTime }) => {
    const [{ isPlaying, album, currentSong }, dispatch] = useStateValue();
    const [startAgain, setStartAgain] = useState(false);

    const [duration, setDuration] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(0.4);
    const [screenTime, setScreenTime] = useState(0);
    const [screenDuration, setScreenDuration] = useState(0);


    const msToMinutes = (duration) => {
        const min = Math.floor(duration / 60);
        const sec = Math.floor((duration % 60));
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };


    useEffect(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setScreenTime(0)
        audioRef.current.src = songs[currentSongIndex]?.songUrl;
        audioRef.current.load();
        if (isPlaying) {
            audioRef.current.play();
            dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });
        }
        if (!isPlaying) {
            audioRef.current.pause()
            dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: false });
        }

    }, [currentSongIndex]);




    useEffect(() => {
        audioRef.current.currentTime = currentTime;
        setScreenDuration(duration - currentTime)
    }, [currentTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (isPlaying) {
                setScreenTime(prevTime => prevTime + 1) % (duration);
                setScreenDuration(prevTime => prevTime - 1) % (duration);
            }
            if (!isPlaying) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [currentTime , isPlaying]);

    useEffect(() => {
        audioRef.current.volume = currentVolume;
    }, [currentVolume]);

    useEffect(() => {
        const handleSongEnd = async () => {
            if (currentSongIndex === songs.length - 1) {
                setCurrentTime(0);
                setCurrentSongIndex(0);
                setCurrentTime(0);
                audioRef.current.pause();

                audioRef.current.src = songs[0]?.songUrl;
                audioRef.current.load();
                dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: false });
            } else {
                setCurrentSongIndex(currentSongIndex + 1);
                setCurrentTime(0);
                setScreenTime(currentTime);
                audioRef.current.pause();
                audioRef.current.load();
                audioRef.current.addEventListener('canplaythrough', () => {
                    audioRef.current.play();
                }, { once: true });
                dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });
            }
        };

        const playNextSong = async () => {
            if (startAgain && audioRef.current || currentSongIndex !== songs.length - 1) {
                setCurrentTime(0)
                setScreenTime(currentTime);
                audioRef.current.addEventListener('canplaythrough', () => {
                    audioRef.current.play()
                }, { once: true });
                dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });

            } else if (startAgain === false) {
                audioRef.current.addEventListener('canplaythrough', () => {
                    audioRef.current.pause()
                }, { once: true });
                dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: false });
            }
        };

        const handleEnded = async () => {
            await handleSongEnd();
            await playNextSong();
        };

        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('loadedmetadata', () => {
            setDuration(audioRef.current.duration);
            setScreenDuration(audioRef.current.duration)
        });

        // return () => {
        //     audioRef.current.removeEventListener('ended', handleEnded);
        // };
    }, [currentSongIndex, songs.length]);


    const playPauseHandler = async () => {

        if (!isPlaying) {
            audioRef.current.play();
            setScreenTime(audioRef.current.currentTime);
            dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });
        } else {
            audioRef.current.pause();
            dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: false });
            setCurrentTime(audioRef.current.currentTime);
            setScreenTime(audioRef.current.currentTime);

        }
    };

    const nextSongHandler = async () => {
        if (currentSongIndex === songs.length - 1) {
            setCurrentSongIndex(0);
        } else {
            setCurrentSongIndex(currentSongIndex + 1);
            setCurrentTime(0)
            setScreenTime(currentTime);
        }
    };

    async function prevSongHandler() {
        setCurrentTime(0);
        setScreenTime(currentTime);
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
        dispatch({ type: reducerCases.SET_IS_PLAYING, isPlaying: true });
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setScreenTime(0);
        audioRef.current.src = songs[currentSongIndex]?.songUrl;
        audioRef.current.load();
        audioRef.current.addEventListener('canplaythrough', () => {
            audioRef.current.play();
        }, { once: true });
    }

    const volumeChangeHandler = (e) => {
        setCurrentVolume(e.target.value);
    };

    const currentTimeChange = async (e) => {
        audioRef.current.currentTime = e.target.value;
        await setCurrentTime(audioRef.current.currentTime);
        await setScreenTime(audioRef.current.currentTime);
       await setScreenDuration(audioRef.current.duration - screenTime)
    };

    const addToLibrary = (e) => {
        console.log(e);
    }

    return (
        <div className={styles.containerPlayer}>
            <div className={styles.boxImg}>
                <img
                    className={isPlaying ? styles.rotatingImg : styles.img} src={songs[currentSongIndex]?.image} alt="song img" />
                <div style={{ "display": "flex", "flexWrap": "wrap", "maxWidth": "50%" }}>
                    <h2>{songs[currentSongIndex]?.name}</h2>
                </div>
            </div>

            <div className={styles.containerControls}>
                <div className={styles.containerPlayerIcons}>
                    <MdAddCircleOutline className={styles.addToLibrary}
                        onClick={() => addToLibrary(currentSong)}
                    />
                    <span onClick={prevSongHandler}><TbPlayerTrackPrevFilled className={styles.icon} /></span>
                    <span onClick={playPauseHandler}>{isPlaying ? <FaRegPauseCircle className={styles.icon} /> : <FaRegCirclePlay className={styles.icon} />}</span>
                    <span onClick={nextSongHandler}><TbPlayerTrackNextFilled className={styles.icon} /></span>
                    <span onClick={() => setStartAgain((prev) => !prev)}><TfiReload className={startAgain ? styles.isActive : ""} /></span>
                </div>

                <div className={styles.containerCurrentTime}>
                    {msToMinutes(screenDuration)}
                    <input type="range" min={0} max={duration} value={screenTime} onChange={currentTimeChange} className={styles.inputCurrentTime} />
                    {msToMinutes(screenTime)}
                </div>
            </div>

            <div className={styles.containerRVolume}>
                <CiVolumeHigh className={styles.volumeIcon} />
                <input type="range" min={0} max={1} step={0.1} value={currentVolume} onChange={volumeChangeHandler} className={styles.inputVolume} />
                <audio ref={audioRef} className='audio' src={songs[currentSongIndex]?.songUrl} autoPlay={false} />
            </div>
        </div>
    );
};

export default Player;