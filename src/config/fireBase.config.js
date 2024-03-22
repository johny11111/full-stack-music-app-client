import { getApps, initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";


const apiKey = import.meta.env.VITE_APP_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID
const storageBucket = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_APP_FIREBASE_MESSAGIN
const appId = import.meta.env.VITE_APP_FIREBASE_APPI_ID


const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId:projectId,
    storageBucket:storageBucket,
    messagingSenderId:messagingSenderId,
    appId:appId,
};


const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
const storage = getStorage(app)

export  { app , storage}