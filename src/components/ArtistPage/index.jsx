import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { useStateValue } from '../../context/StateProvider';
import AlbumCard from '../AlbumCard';
import { motion } from 'framer-motion';

export default function ArtistPage() {
    const [albumsFiltered, setAlbumsFiltered] = useState([]);
    const [{ albums, artistSelected }] = useStateValue();

    useEffect(() => {
        if (artistSelected && albums) {
            const filter = albums.filter(album => album?.artist?.includes(artistSelected.name));
            setAlbumsFiltered(filter || []); // בדיקה אם `filter` קיים, אחרת חזרה לערך ריק
        }
    }, [artistSelected, albums]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }} // תיקון אנימציה ל- opacity: 1
            transition={{ duration: 0.7 }}
            className={styles.containerArtistPage}
        >
            <h1>{artistSelected ? artistSelected.name : "אמן לא נמצא"}</h1> {/* מציג את שם האמן הנבחר */}
            <div className={styles.containerAlbumArtistPage}>
                {albumsFiltered.length > 0 ? (
                    albumsFiltered.map(album => <AlbumCard key={album._id} album={album} />)
                ) : (
                    <p>לא נמצאו אלבומים לאמן זה.</p>
                )}
            </div>
        </motion.div>
    );
}
