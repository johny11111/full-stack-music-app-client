import React, { useState } from 'react'
import styles from './style.module.css';
import { NavLink } from "react-router-dom"
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from '../../../context/StateProvider';


export default function DashboardSongs() {
  const [filteredSong, setFilteredSong] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [{ songs }, dispatch] = useStateValue()
  const [selectedSong, setSelectedSong] = useState(null)
 


  return (
    <div className={styles.containerSongs}>
      <div className={styles.containerSearch}>
        <NavLink className={styles.navIcon} to={"/dashboard/nowSong"}>
          <IoMdAddCircleOutline className={styles.addIcon} />
        </NavLink>
        <input
          type="search" placeholder='search here ..' value={filteredSong} onChange={(e) => setFilteredSong(e.target.value)}
          className={`${styles.input} ${isFocused ? styles.isFocused : styles.unFocused}`}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
        <i> <AiOutlineClear className={styles.iIcon} /> </i>
      </div>

      {/* container body  */}
      <div className={styles.containerBody}>
        <div className={styles.count}>
          <p>
            <span>
              count:{songs?.length}
            </span>
          </p>
        </div>
        <div className={styles.containerSongsDashboard}>
          {songs && songs.map((song, i) => (
            <div
            onClick={()=> setSelectedSong(song)}
              key={song._id}
              className={styles.containerSongDash}>
                {i + 1}
              <img className={styles.imgDash} src={song.image} alt="song" />

              <h3>{`${song.name.slice(0 ,14)}...` }</h3>
              <p>category: {song.category}</p>
            </div>
          ))}
          {selectedSong && <div className={styles.player}>
            <audio className={styles.audio} src={selectedSong.songUrl} controls={true} autoPlay={false} />
          </div>}

        </div>
      </div>
    </div>
  )
}
