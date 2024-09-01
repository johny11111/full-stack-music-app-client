import React, { useEffect } from 'react'
import Song from '../Song'
import { useStateValue } from '../../context/StateProvider';
import styles from './style.module.css';
import { MdDeleteOutline } from "react-icons/md";



export default function Library() {

    const [{ user }] = useStateValue()

    const handleDelClick = (songToDelete) => {
        const filter = user.playlist.filter(song => song._id !== songToDelete._id)
        console.log(filter);
        
    }

    return (
        <div className={styles.containerLibrary}>
            <h2>השירים שאהבתי</h2>
            <div className={styles.containerSongsInLibrary}>

                {user?.playlist && user.playlist.map((item, i) => <div className={styles.songInLibrary}>
                    <Song key={item._id} song={item} i={i}  />
                    <MdDeleteOutline  onClick={() => handleDelClick(item)} className={styles.iconDel} />

                </div>)}
            </div>
        </div>
    )
}
