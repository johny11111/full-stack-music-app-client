import React, { useEffect } from 'react'
import styles from './style.module.css'
import { useStateValue } from '../../context/StateProvider'
import { reducerCases } from '../../context/constants'
import { Link, Navigate } from 'react-router-dom'
import { motion } from "framer-motion"

export default function AlbumCard({ album, i  , setMenuClicked }) {
    const [{ selectedAlbum }, dispatch] = useStateValue()

    
    
    useEffect(() => {
        dispatch({ type: reducerCases.SET_SELECT_ALBUM, selectedAlbum: album })
        setMenuClicked(false)
    }, [])

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
                    to={`/music/${selectedAlbum._id}`}
                    key={album._id}
                    onClick={handleClick}
                    className={styles.containerSongDash}>
                    <img className={styles.img} src={album.image} alt="song" />
                    <p>album:{album.name}</p>
                </Link>}
            </motion.div>

        </div>

    )
}
