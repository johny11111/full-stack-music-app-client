import React, { useEffect, useState } from 'react'
import styles from './style.module.css';
import Filtered from '../../Filtered';

import { BiCloudUpload } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { getAllAlbums, getAllArtists } from '../../../api'

import { storage } from '../../../config/fireBase.config'
import { useStateValue } from '../../../context/StateProvider'

import { reducerCases } from '../../../context/constants';

import { filterByCategory, filterByLanguage } from '../../../utils/utilsFunctions'
import axios from 'axios';


export default function DashboardNowSong() {
    const [{ artists, albums, artistSelected, albumSongsSelected, languageSelected, selectedCategory }, dispatch] = useStateValue()
    const [progress, setProgress] = useState(0)
    const [isImage, setIsImage] = useState(true)


    // state for create a new song

    const [imageUploading, setImageUploading] = useState(false)
    const [songName, setSongName] = useState('')
    const [songImage, setSongImage] = useState(null)
    const [audioUrl, setAudioUrl] = useState(null)
    const [audioUploadingProgress, setAudioUploadingProgress] = useState(0)
    const [audioLoading, setAudioLoading] = useState(false)


    // state for create a new artist

    const [artistImageUploading, setArtistImageUploading] = useState(false)
    const [artistImage, setArtistImage] = useState(null)
    const [newArtistName, setNewArtistName] = useState("")
    const [newArtistTwitter, setNewArtistTwitter] = useState("")
    const [newArtistInstagram, setNewArtistInstagram] = useState("")


    // state for create a new album

    const [albumImage, setAlbumImage] = useState(null)
    const [albumImageUploading, setAlbumImageUploading] = useState(false)
    const [newAlbumName, setNewAlbumName] = useState("")
    const [artistName, setArtistName] = useState("")


    const saveSong = async () => {
        if (artistSelected && albumSongsSelected && languageSelected && selectedCategory) {
            const songToSave = {
                name: songName,
                album: albumSongsSelected._id,
                artist: artistSelected._id,
                language: languageSelected.name,
                category: selectedCategory.name,
                songUrl: audioUrl,
                image: songImage,
            }
            const post = axios.post("https://full-stack-music-app-server.onrender.com/songs/save", songToSave);

            if (post) {
                setAudioLoading(false);
                setSongName("")
                setAudioUrl(null) 
                setSongImage(null)
                setImageUploading(false);

                return post
            }
        }
    }


    // save artist in DB

    const saveArtist = async () => {

        const artistRequest = {
            name: newArtistName,
            twitter: newArtistTwitter,
            image: artistImage,
            instagram: newArtistInstagram,
        }

        const post = axios.post("https://full-stack-music-app-server.onrender.com/artists/save", artistRequest);

        if (post) {
            setArtistImageUploading(false);
            setNewArtistName("")
            setNewArtistTwitter("")
            setNewArtistInstagram("")
            setArtistImage(null)

            return post
        }

    }


    // save album in DB
    const saveAlbum = async () => {

        const albumRequest = {
            name: newAlbumName,
            artist: artistName,
            image: albumImage,
            language: languageSelected.value,
        }

        const post = await axios.post("https://full-stack-music-app-server.onrender.com/albums/save", albumRequest);

        if (post) {
            setAlbumImageUploading(false);
            setAlbumImage(false)
            setNewAlbumName("")
            setArtistName("")

            return post
        }
    }


    // request to load the albums and artist 
    useEffect(() => {
        if (!artists) {
            getAllArtists().then((data) => {
                dispatch({ type: reducerCases.SET_ARTISTS, artists: data.artist })
            })
        }
        if (!albums) {
            getAllAlbums().then((data) => {
                dispatch({ type: reducerCases.SET_ALBUMS, albums: data.album })
            })
        }
    }, [])


    // delete imag/audio files 
    const deleteFileObject = (url, isImage) => {
        if (isImage) {
            setImageUploading(true)
            setAudioLoading(true)
        }
        const deleteRef = ref(storage, url)
        deleteObject(deleteRef).then(() => {
            setSongImage(null)
            setImageUploading(false)
            setAudioUrl(null)
            setAudioLoading(false)
        })
    }

    return (
        <div className={styles.containerNewSong}>
            <div className={styles.containerDash1}>
                <input className={styles.typeInput} type="search" placeholder='type of song ..'
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                />

                <div className={styles.Filtered}>
                    <Filtered filterData={artists} name={'artist'} />
                    <Filtered filterData={albums} name={'album'} />
                    <Filtered filterData={filterByLanguage} name={'language'} />
                    <Filtered filterData={filterByCategory} name={'category'} />
                </div>

                <div className={styles.containerUpload}>
                    <div className={styles.upImg}>
                        {imageUploading && <FileLoader progress={progress} />}
                        {!imageUploading && (<>
                            {!songImage ? (
                                <FileUploader updateState={setSongImage} setProgress={setProgress} setImageUploading={setImageUploading} isImage={isImage} />
                            ) : (
                                <div className={styles.containerImgCover}>
                                    <img src={songImage} alt="songImg" />

                                    <button onClick={() => deleteFileObject(songImage, "images")} className={styles.IconDel}>
                                        <MdDelete />
                                    </button>
                                </div>
                            )}
                        </>)}
                    </div>

                    <div className={styles.upSng}>

                        <div className={styles.upImg}>
                            {audioLoading && <FileLoader progress={audioUploadingProgress} />}
                            {!audioLoading && (<>
                                {!audioUrl ? (
                                    <FileUploader updateState={setAudioUrl} setProgress={setAudioUploadingProgress} setImageUploading={setAudioLoading} isImage={false} />
                                ) : (
                                    <div className={styles.containerImgCover}>
                                        <audio src={audioUrl} controls />

                                        <button onClick={() => deleteFileObject(audioUrl, false)} className={styles.IconDel}>
                                            <MdDelete />
                                        </button>
                                    </div>
                                )}
                            </>)}
                        </div>
                    </div>
                </div>
                <button onClick={saveSong} className={styles.button}>upload</button>
            </div>

            {/* dashboard 2  */}

            <div className={styles.containerDash2}>
                <div className={styles.containerBox}>
                    <div className={styles.upImg2}>

                        {artistImageUploading && <FileLoader progress={progress} />}
                        {!artistImageUploading && (<>
                            {!artistImage ? (
                                <FileUploader updateState={setArtistImage} setProgress={setProgress} setImageUploading={setArtistImageUploading} isImage={isImage} />
                            ) : (
                                <div className={styles.containerImgCover}>
                                    <img src={artistImage} alt="songImg" />

                                    <button onClick={() => deleteFileObject(artistImage, "images")} className={styles.IconDel}>
                                        <MdDelete />
                                    </button>
                                </div>
                            )}
                        </>)}

                    </div>
                    <div className={styles.upImg2}>
                        {albumImageUploading && <FileLoader progress={progress} />}
                        {!albumImageUploading && (<>
                            {!albumImage ? (
                                <FileUploader updateState={setAlbumImage} setProgress={setProgress} setImageUploading={setAlbumImageUploading} isImage={isImage} />
                            ) : (
                                <div className={styles.containerImgCover}>
                                    <img src={albumImage} alt="songImg" />

                                    <button onClick={() => deleteFileObject(songImage, "images")} className={styles.IconDel}>
                                        <MdDelete />
                                    </button>
                                </div>
                            )}
                        </>)}
                    </div>
                </div>
                <div className={styles.containerInputs}>
                    <div style={{ "display": 'flex', "flexDirection": 'column', "gap": "1rem" }}>
                        <input onChange={(e) => setNewArtistName(e.target.value)} type="text" placeholder='artist' />
                        <input onChange={(e) => setNewArtistTwitter(e.target.value)} type="twitter" placeholder='twitter' />
                        <input onChange={(e) => setNewArtistInstagram(e.target.value)} type="instagram" placeholder='instagram' />
                        <button className={styles.btnSend} onClick={saveArtist}>send</button>
                    </div>
                    {/* NEW ALBUM */}
                    <div style={{ "display": 'flex', "flexDirection": 'column', "marginTop": "1rem", "gap": "1rem" }}>
                        <Filtered filterData={filterByLanguage} name={'language'} />
                        <input value={newAlbumName} onChange={(e) => setNewAlbumName(e.target.value)} type="text" placeholder='album name' />
                        <input value={artistName} onChange={(e) => setArtistName(e.target.value)} type="text" placeholder='artist' />

                        <button className={styles.btnSend} onClick={saveAlbum}>send</button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export const FileLoader = ({ progress }) => {
    return (
        <div>
            <p>
                {Math.round(progress) > 0 && (
                    <>
                        {`${Math.round(progress)}%`}
                    </>
                )}
            </p>
            <div className={styles["ping-container"]}>
                <div className={styles["ping-dot"]}>
                </div>
            </div>
        </div>
    )
}


export const FileUploader = ({ updateState, setProgress, setImageUploading, isImage }) => {

    const uploadFile = (e) => {
        setImageUploading(true)
        const updatedFile = e.target.files[0]

        console.log(updatedFile);

        // const storageRef = ref(storage, `${isImage ? "images" : "audio"}/${updatedFile.name}`)

        //  const uploadTask = uploadBytesResumable(storageRef, updatedFile)

        // uploadTask.on("state_changed", (snapshot) => {
        //     setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        // }, (err) => {
        //     console.log(err);
        // }, () => {
        //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //         updateState(downloadURL)
        //         setImageUploading(false)
        //     })
        // })

    }


    return (
        <label>
            <div className={styles.containerFileUploader}>
                <div>
                    <p>
                        <BiCloudUpload />
                    </p>
                    <p>
                        click to upload {isImage ? 'image' : 'audio'}
                    </p>

                </div>
            </div>
            <input className={styles.inputUploadFile} type="file" name='upload_file' accept={`${isImage ? 'image/*' : 'audio/*'}`}
                onChange={uploadFile}
            />
        </label>
    )
}