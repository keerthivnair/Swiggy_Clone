import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    searchBarToggle: false,
    searchLoginToggle: false,
    isDiffRes: false,
  },
  reducers: {
    toggleSearchBar: (state, action) => {
      state.searchBarToggle = !state.searchBarToggle;
    },
    toggleLoginBar: (state, action) => {
      state.searchLoginToggle = !state.searchLoginToggle;
    },
    toggleDiffRes: (state, action) => {
      state.isDiffRes = !state.isDiffRes;
    },
  },
});

export default toggleSlice.reducer;
export const { toggleSearchBar, toggleLoginBar, toggleDiffRes } =
  toggleSlice.actions;
