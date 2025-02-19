import React from 'react';
import Song from '../Song';
import { useStateValue } from '../../context/StateProvider';
import styles from './style.module.css';

export default function Library() {
    const [{ user }] = useStateValue();

    return (
        <div className={styles.containerLibraryWrapper}>
            <div className={styles.containerLibrary}>
                <h2>המוזיקה שלי</h2>
                <div className={styles.containerSongsInLibrary}>
                    {user?.playlist && user.playlist.length > 0 ? (
                        user.playlist.map((item, i) => <Song key={i} song={item} i={i} />)
                    ) : (
                        <p className={styles.emptyLibrary}>אין שירים להצגה כרגע.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
