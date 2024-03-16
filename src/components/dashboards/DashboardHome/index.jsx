import React, { useEffect } from 'react'
import styles from './style.module.css';
import DashboardCard from '../DashboardCard.jsx';
import { useStateValue } from '../../../context/StateProvider.jsx';
import { BsMusicNoteBeamed } from "react-icons/bs";
import { HiMiniUsers } from "react-icons/hi2";
import { IoMdAlbums } from "react-icons/io";
import { MdLibraryMusic } from "react-icons/md";





function DashboardHome() {
  const [{ users, songs, artists, albums }, dispatch] = useStateValue()

  return (
    <div className={styles.containerHome}>
      <DashboardCard count={songs?.length} icon={<BsMusicNoteBeamed />} name={"songs"} />
      <DashboardCard count={users?.length} icon={<HiMiniUsers />} name={"users"} />
      <DashboardCard count={albums?.length} icon={<IoMdAlbums />} name={"albums"} />
      <DashboardCard count={artists?.length} icon={<MdLibraryMusic />} name={"artist"} />
    </div>
  )
}

export default DashboardHome;
