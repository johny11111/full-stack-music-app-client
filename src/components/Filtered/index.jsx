import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { motion } from 'framer-motion'
import styles from './style.module.css';
import { useStateValue } from '../../context/StateProvider';
import { reducerCases } from '../../context/constants';

export default function Filtered({ filterData, name }) {
  const [{ artistSelected, albumSongsSelected, languageSelected, selectedCategory }, dispatch] = useStateValue()


  const [chooseName, setChooseName] = useState(null)
  const [chooseMenu, setChooseMenu] = useState(false)

  const updateNameSelect = (name) => {
    setChooseName(name)
    setChooseMenu(false)
  }



  useEffect( () => {
    if (name === "artist" && chooseName) {
      const filter = filterData.filter(data => data.name === chooseName)
      dispatch({ type: reducerCases.SET_ARTISTS_SELECTED, artistSelected: filter[0] })
      console.log(filter, "successfully selected");
    }

    if (name === "album" && chooseName) {
      const filter = filterData.filter(data => data.name === chooseName)
      dispatch({ type: reducerCases.SET_ALBUM_SELECTED, albumSongsSelected: filter[0] })
      console.log(filter, "successfully selected");
    }

    if (name === "category" && chooseName) {
      const filter = filterData.filter(data => data.name === chooseName)
      dispatch({ type: reducerCases.SET_CATEGORY_SELECTED, selectedCategory: filter[0] })
      console.log(filter, "successfully selected");
    }

    if (name === "language" && chooseName) {
      const filter = filterData.filter(data => data.name === chooseName)
      dispatch({ type: reducerCases.SET_LANGUAGE_SELECTED, languageSelected : filter[0] })
      console.log(filter, "successfully selected");
    }


  }, [chooseName])




  return (
    <div className={styles.containerFiltered}>
      <p onClick={() => setChooseMenu(prev => !prev)} className={styles.p} > {!chooseName && name}
        {chooseName && (
          <>
            {chooseName.length > 15 ? `${chooseName.slice(0, 10)}...` : chooseName}
          </>
        )}
        {chooseMenu ? <FaChevronUp /> : <FaChevronDown />}
      </p>
      {filterData && chooseMenu && <motion.div className={styles.menu}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        {filterData.map((data) => (
          <div
            onClick={() => updateNameSelect(data.name)}
            className={styles.containerItems} key={data.name}>
            {(name === "artist" || name === "album") && (
              <img className={styles.img} src={data.image} height={"50px"} width={"50px"} />
            )}

            {data.name.length > 15 ? `${data.name.slice(0, 15)}...` : data.name}

          </div>
        ))}
      </motion.div>}

    </div>
  )
}
