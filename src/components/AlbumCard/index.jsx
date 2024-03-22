import React, { useEffect } from 'react'
import styles from './style.module.css'
import { useStateValue } from '../../context/StateProvider'
import { reducerCases } from '../../context/constants'
import { Link, Navigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { CgMusic } from "react-icons/cg";

export default function AlbumCard({ album }) {
    const [{ selectedAlbum }, dispatch] = useStateValue()



    useEffect(() => {
        dispatch({ type: reducerCases.SET_SELECT_ALBUM, selectedAlbum: album })
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
                        {album.image !== "none" ?  <img className={styles.img} src={album.image} alt="song" /> : <div><CgMusic style={{"fontSize" : "5rem"}} /></div>  }
                 

                    <p>{album.name}</p>
                </Link>}
            </motion.div>

        </div>

    )
}
