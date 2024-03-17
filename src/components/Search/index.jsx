import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import { motion } from 'framer-motion';
import { useStateValue } from '../../context/StateProvider';
import Song from '../Song';
import { getAllSongs } from '../../api';
import { reducerCases } from '../../context/constants';
import AlbumCard from "../AlbumCard"


export default function Search({ audioRef, setCurrentSongIndex, currentSongIndex , setMenuClicked }) {
  const [{ songs, albums, currentSong }, dispatch] = useStateValue();
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedSongSearch, setSelectedSongSearch] = useState();

  // console.log(currentSong);


useEffect(()=>{
  setMenuClicked(false)
},[])


  useEffect(() => {
    if (!songs) {
      getAllSongs().then(data => {
        dispatch({ type: reducerCases.SET_SONGS, songs: data.songs });
      }).catch((err) => console.log(err))
    }
  }, [songs]);

  const searchSongs = (e) => {
    const searchVal = e.target.value.toLowerCase();
    setSearchValue(searchVal);
    const filteredSongs = songs?.filter(song => song.name.toLowerCase().includes(searchVal));
    setFilter(filteredSongs);
    setIsFiltered(true)
    const filterAlbums = albums.filter((song => song.name.toLowerCase().includes(searchVal)))
    setFilteredAlbums(filterAlbums);



    if (searchVal === "") {
      setFilter([]);
      setFilteredAlbums([]);
      setIsFiltered(false)

      return;
    }
  };


  const handleClick = (song) => {
    dispatch({ type: reducerCases.SET_CURRENT_SONG, currentSong: song })
    audioRef.current.src = currentSong?.songUrl
    audioRef.current.play()
    
  }


  return (

    <div className={styles.containerSearch}>


      <div className={styles.containerInputSearch}>
        <input onChange={searchSongs} value={searchValue} type="text" placeholder='search songs' />
      </div>
      <motion.div
        initial={{ opacity: 1, y: 100 }}
        animate={{ opacity: 20, y: 1 }}
        transition={{ duration: 0.7 }}
      >

        <div>
          {isFiltered && <h1>songs</h1>}
          {filter?.map((data, index) => (
            <Song key={data._id} song={data} i={index} handleClick={handleClick} />
          ))}
        </div>

        <div>
          {isFiltered && <h1> albums </h1>}
          {filteredAlbums?.map((album, i) => (
            <AlbumCard album={album} i={i} key={i} />
          ))}
        </div>
      </motion.div>

    </div>
  );
}
