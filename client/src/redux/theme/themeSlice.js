import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeslice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeslice.actions;
export default themeslice.reducer;
