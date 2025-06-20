import { signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth, provider } from "../config/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { toggleLoginBar } from "../utils/toggleSlice";

function SignoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);

  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(removeUserData());
      navigate("/");
      dispatch(toggleLoginBar())
    } catch (error) {
      console.error("logout error", error);
    }
  }

  return (
    <div>
      {userData ? (
        <button
          onClick={handleLogout}
          className="bg-orange-600 text-white font-bold w-full text-center py-3 cursor-pointer"
        >
          Logout
        </button>
      ) : (
        // <button
        //   onClick={handleLogout}
        //   className="bg-orange-600 text-white font-bold w-full text-center py-3 cursor-pointer"
        // >
        //   Logout
        // </button>
        ""
      )}
    </div>
  );
}

export default SignoutBtn;
