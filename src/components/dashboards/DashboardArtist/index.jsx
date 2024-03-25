import React from 'react'
import styles from "./style.module.css";
import {useStateValue } from '../../../context/StateProvider';
import ArtistCard from '../../ArtistCard';
export default function DashboardArtists() {
const [{artists}, dispatch]= useStateValue()
console.log("artists " , artists);
  return (
    <div className={styles.containerArtists}>
      {artists.map((artist) =>  <ArtistCard key={artist._id}  artist={artist} />)}

    </div>
  )
}
