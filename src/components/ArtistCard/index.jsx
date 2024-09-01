import React from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import { reducerCases } from '../../context/constants';

export default function ArtistCard({ artist }) {
  const [_, dispatch] = useStateValue();

  const handleArtistClick = async () => {
    return dispatch({ type: reducerCases.SET_ARTISTS_SELECTED, artistSelected: artist });
  };

  return (
    <Link 
      onClick={handleArtistClick} 
      to={"artist"} 
      className={styles.containerArtistCard}
      aria-label={`View artist ${artist?.name}`}
    >
      <img src={artist?.image} alt={`${artist?.name} Image`} />
      <p>{artist?.name}</p>
    </Link>
  );
}
