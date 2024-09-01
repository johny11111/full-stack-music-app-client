import React, { useEffect, useState } from 'react'
import styles from './style.module.css';
import { useStateValue } from '../../context/StateProvider';
import AlbumCard from '../AlbumCard';
import { motion } from "framer-motion"

export default function ArtistPage() {
    const [albumsFiltered, setAlbumsFiltered] = useState([])
    const [{ albums, artistSelected }] = useStateValue()


    useEffect(() => {
        if (artistSelected) {
            console.log("artistSelected", artistSelected?.artist);

            const filter = albums?.filter(album => album?.artist.includes(artistSelected.name))
            if (filter) {
                setAlbumsFiltered(filter)
            }
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 100, x: 0 }}
            transition={{ duration: 0.7 }}
            className={styles.containerArtistPage}>

            <h1>{albumsFiltered[0]?.artist}</h1>
            <div className={styles.containerAlbumArtistPage}>

                {albumsFiltered.map(album => <AlbumCard key={album._id} album={album} />)}
            </div>
        </motion.div>
    )


}
