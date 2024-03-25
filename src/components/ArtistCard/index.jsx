import React from 'react'
import styles from './style.module.css'

export default function ArtistCard({artist}) {
  return (
    <div className={styles.containerArtistCard}>
      <img src={artist?.image} alt="artistImg" />
      <p>{artist?.name}</p>
    </div>
  )
}
