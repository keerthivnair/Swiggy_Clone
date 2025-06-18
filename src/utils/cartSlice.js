import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
    resInfo: JSON.parse(localStorage.getItem("resInfo")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { info, resInfo } = action.payload;
      state.cartItems = [...state.cartItems, info];
      state.resInfo = resInfo;
      //   setCartData((prev) => [...prev, info]);
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
      localStorage.setItem("resInfo", JSON.stringify(resInfo));
    },
    deleteItem: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartData", JSON.stringify(action.payload));
    },
    clearrCart: (state, action) => {
      state.cartItems = [];
      state.resInfo = [];
      localStorage.removeItem("cartData");
      localStorage.removeItem("resInfo");
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, deleteItem, clearrCart } = cartSlice.actions;
