import React, { useEffect } from 'react'
import styles from './style.module.css'
import { useStateValue } from '../../context/StateProvider'
import { reducerCases } from '../../context/constants'
import { Link, Navigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { CgMusic } from "react-icons/cg";

export default function AlbumCard({ album }) {
    const [{ selectedAlbum }, dispatch] = useStateValue()
console.log(album);

    useEffect(() => {
        if(selectedAlbum) {
            return
        }
        dispatch({ type: reducerCases.SET_SELECT_ALBUM, selectedAlbum: album })
        
    },[])

    const handleClick = () => {
        dispatch({ type: reducerCases.SET_SELECT_ALBUM, selectedAlbum: album })
    }

    return (
        <div>

            <motion.div
                initial={{ opacity: 1, y: 90 }}
                animate={{ opacity: 90, y: 1 }}
                transition={{ duration: 1 }}
            >
                {selectedAlbum && <Link
                    to={`/main/music/${selectedAlbum._id}`}
                    key={album?._id}
                    onClick={handleClick}
                    className={album?.name === "playlist" ? styles.containerPlaylist : styles.containerSongDash}>
                        {album?.image !== "none" ?  <img className={styles.img} src={album?.image} alt="song" /> : <div><CgMusic className={album?.name === "playlist" ? styles.iconM : styles.icons} /></div>  }
                 

                    <p>{album?.name}</p>
                </Link>}
            </motion.div>

        </div>

    )
}
