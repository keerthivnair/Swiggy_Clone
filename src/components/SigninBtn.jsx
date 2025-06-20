import { signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth, provider } from "../config/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { toggleLoginBar } from "../utils/toggleSlice";

function SigninBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleAuth() {
    let data = await signInWithPopup(auth, provider);
    const userData = {
      name: data.user.displayName,
      photo: data.user.photoURL,
    };
    dispatch(addUserData(userData));
    navigate("/");
    dispatch(toggleLoginBar())
  }

  const userData = useSelector((state) => state.authSlice.userData);

  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(removeUserData());
      navigate("/");
    } catch (error) {
      console.error("logout error", error);
    }
  }

  return (
    <div>
      {!userData && (
        <button
          onClick={handleAuth}
          className="cursor-pointer bg-orange-600 text-white font-bold w-full text-center py-3"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default SigninBtn;
