import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, Suspense } from 'react'; // ייבוא Suspense מריאקט
import { app } from './config/fireBase.config';
import { getAuth } from 'firebase/auth';
import { useStateValue } from './context/StateProvider';
import { reducerCases } from './context/constants';
import { AnimatePresence } from 'framer-motion';
import { validate } from './api';

function App() {
  const audioRef = useRef();
  const navigate = useNavigate();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const fireBaseAuth = getAuth(app);
  const [authState, setAuthState] = useState(false);
  const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === true);
  const [{ user, albumSongs, songs, currentSong, songsPlayed }, dispatch] = useStateValue();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    dispatch({ type: reducerCases.SET_AUDIO_REF, audioRef: audioRef });
  }, []);

  useEffect(() => {
    async function fetchData() {
      fireBaseAuth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            validate(token).then((data) => {
              try {
                dispatch({ type: reducerCases.SET_USER, user: data.data.user });
              } catch (e) {
                console.log(e);
              }
            });
          });
        } else {
          setAuth(false);
          window.localStorage.setItem('auth', "false");
          dispatch({ type: reducerCases.SET_USER, user: null });
          navigate("/login");
        }
      });
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (window.localStorage.getItem('auth') === 'true') {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <AnimatePresence >
      <div className="containerApp">
        {/* השתמש ב־Suspense כדי להציג הודעה במהלך ההמתנה לטעינת הרכיבים */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* הייבוא הדינמי של רכיב ההתחברות */}
            <Route path='/login' element={<Login setAuth={setAuth} />} />
            {/* הייבוא הדינמי של רכיב הדף הראשי */}
            <Route path='/*' element={<Home currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} audioRef={audioRef} />} />
            {/* הייבוא הדינמי של רכיב לוח הבקרה */}
            <Route path='/dashboard/*' element={<Dashboard />} />
          </Routes>
        </Suspense>

        <div>
          {/* הרכיב Player ייטען רק כאשר נדרש */}
          {currentSong && window.location.pathname !== '/login' && !window.location.pathname.includes('dashboard') && (
            <Player
              songs={songsPlayed} 
              albumSongs={albumSongs}
              setCurrentTime={setCurrentTime}
              currentTime={currentTime}
              audioRef={audioRef}
              setCurrentSongIndex={setCurrentSongIndex}
              currentSongIndex={currentSongIndex}
            />
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}

export default App;
