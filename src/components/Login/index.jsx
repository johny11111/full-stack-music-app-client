import React, { useRef } from 'react'
import styles from "./style.module.css";
import { app } from '../../config/fireBase.config';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

import { useStateValue } from '../../context/StateProvider';
import { reducerCases } from '../../context/constants';
import { validate } from '../../api';



export default function Login({ setAuth }) {

  const userRef = useRef()

  const [{ user }, dispatch] = useStateValue()

  const fireBaseAuth = getAuth(app);

  const provider = new GoogleAuthProvider()

  const navigate = useNavigate()


  const loginWithGoogle = async () => {
    await signInWithPopup(fireBaseAuth, provider).then((user => {
      if (user) {
        setAuth(true)
        window.localStorage.setItem('auth', "true")

        fireBaseAuth.onAuthStateChanged(async (user) => {
          if (user) {

            await user.getIdToken().then((token) => {
              validate(token).then((data) => {
                setAuth(false)
                if (data === undefined) {
                  window.localStorage.setItem('auth', "false")
                  return navigate("/notAuthorized");

                }
                dispatch({ type: reducerCases.SET_USER, user: data })
                navigate("/main");
              })
            })
          }

          else {
            setAuth(false)
            dispatch({ type: reducerCases.SET_USER, user: null })
            navigate("/login")
          }
        })
      }
    }))
  }

  const LoginWiteMail = () => {
    console.log(userRef.current.value);

  }

  return (
    <div className={styles.containerLogin}>
      {/* <video src={BgLogin}
        type="video/mp4"
        autoPlay
        muted
        loop
        className={styles.videoBg}
      /> */}
      <div className={styles.containerConnect}>
        <FcGoogle />
        <p onClick={loginWithGoogle} >  sign in with google</p>
      </div>
    </div>
  )
}
