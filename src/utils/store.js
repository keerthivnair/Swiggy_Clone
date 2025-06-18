import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice.js";
import toggleSlice from "./toggleSlice.js";
import filterSlice from './filterSlice.js'
import authSlice from './authSlice.js'

const store = configureStore({
  reducer: {
    toggleSlice: toggleSlice,
    cartSlice: cartSlice,
    filterSlice: filterSlice,
    authSlice:authSlice
  },
});

export default store;
