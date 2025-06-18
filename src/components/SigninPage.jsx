import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch } from 'react-redux'
import { addUserData } from '../utils/authSlice'

function SigninPage() {

    const dispatch = useDispatch()

    async function handleAuth() {
        let data = await signInWithPopup(auth,provider)
        const userData = {
            name : data.user.displayName,
            photo : data.user.photoURL
        }
        dispatch(addUserData(userData))
    }

  return (
    <div>
      Login 
      <button onClick={handleAuth} className='bg-slate-300 p-5 m-6'>
        Google login
      </button>
    </div>
  )
}

export default SigninPage
