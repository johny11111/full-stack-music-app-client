
import './App.css';
import './style/style.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { useEffect, useState, useRef } from 'react';
import { app } from './config/fireBase.config';
import { getAuth } from 'firebase/auth';
import { useStateValue } from './context/StateProvider';
import { reducerCases } from './context/constants'
import { AnimatePresence } from 'framer-motion'
import { validate } from './api';
import Dashboard from './components/dashboards/Dashboard';
import Player from './components/Player';
import NavBottom from './components/NavBottom';


function App() {

  const audioRef = useRef()

  useEffect(() => {
    dispatch({ type: reducerCases.SET_AUDIO_REF, audioRef: audioRef })
  }, [])

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const fireBaseAuth = getAuth(app)
  const navigate = useNavigate()

  const [authState, setAuthState] = useState(false)
  const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === true)

  const [{ user, albumSongs, songs , currentSong , songsPlayed }, dispatch] = useStateValue()
  const [currentTime, setCurrentTime] = useState(0);

  // ! use effect for authorization 
  useEffect(() => {
    async function fetchData() {
      fireBaseAuth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            validate(token).then((data) => {
              try {
                dispatch({ type: reducerCases.SET_USER, user: data.data.user });

              } catch (e) { console.log(e); }
            })
          })
        } else {
          setAuth(false);
          window.localStorage.setItem('auth', "false");
          dispatch({ type: reducerCases.SET_USER, user: null })
          navigate("/login")
        }
      })
    }
    fetchData()
  }, [user])


  useEffect(() => {
    if (window.localStorage.getItem('auth') === 'true') {
      navigate("/", { replace: true })

    }
  }, [])





  return (
    <AnimatePresence >
      <div className="containerApp">
        <Routes>
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/*' element={<Home currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} audioRef={audioRef} />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
        </Routes>

        <div>
          {
            currentSong && !window.location.pathname.includes("login")  && !window.location.pathname.includes('dashboard') && <Player
              songs={songsPlayed} 
              albumSongs={albumSongs}
              setCurrentTime={setCurrentTime}
              currentTime={currentTime}
              audioRef={audioRef}
              setCurrentSongIndex={setCurrentSongIndex}
              currentSongIndex={currentSongIndex}
            />
          }

          {window.innerWidth < 450 &&    <NavBottom /> }
        
        </div>
      </div>
    </AnimatePresence>
  )
}

export default App
