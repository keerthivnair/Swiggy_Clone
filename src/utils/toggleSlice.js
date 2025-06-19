import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    searchBarToggle: false,
    searchLoginToggle: false,
  },
  reducers: {
    toggleSearchBar: (state, action) => {
      state.searchBarToggle = !state.searchBarToggle;
    },
    toggleLoginBar: (state, action) => {
      state.searchLoginToggle = !state.searchLoginToggle;
    },
  },
});

export default toggleSlice.reducer;
export const { toggleSearchBar,toggleLoginBar } = toggleSlice.actions;
