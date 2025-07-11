import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = JSON.parse(import.meta.env.VITE_KEY);

const firebaseConfig = {
  "apiKey": import.meta.env.VITE_APIKEY,
  "authDomain": import.meta.env.VITE_AUTHDOMAIN,
  "projectId": import.meta.env.VITE_PROJECT_ID,
  "storageBucket": import.meta.env.VITE_STORAGEBUCKET,
  "messagingSenderId": import.meta.env.VITE_MESSAGINGSENDERID,
  "appId": import.meta.env.VITE_APPID
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
