import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, loginUser, logoutUser } from "./authThunk";

const initialState = {
  currentUser: [],

  // isAuth digunakan sebagai pemicu apakah kita sedang login atau tidak
  // Disini kita mengecek apakah di dalam local storage ada "isAuth" dan memiliki nilai "true" ? jika iya makan isAuth yang dibawah akan bernilai "Benar" kan kita bisa berganti dari tampilan login ke tampilan home
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
