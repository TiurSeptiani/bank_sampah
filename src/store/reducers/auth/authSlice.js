import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, loginUser, logoutUser } from "./authThunk";

const initialState = {
  currentUser: [],
  isAuth: localStorage.getItem("isAuth") === "true"
};

const dataSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuth = true
    })
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.currentUser = []
      state.isAuth = false
    })
  },
});

export default dataSlice.reducer;
