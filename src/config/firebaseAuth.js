
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBUYrOahAy8biDNuMfF49hoLCfWzbGXdP4",
  authDomain: "swiggy-project-84205.firebaseapp.com",
  projectId: "swiggy-project-84205",
  storageBucket: "swiggy-project-84205.firebasestorage.app",
  messagingSenderId: "859193863660",
  appId: "1:859193863660:web:c8d54ff6ef34ea39ac64c9"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider() 

