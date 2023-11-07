// import { createSlice } from "@reduxjs/toolkit"
// import { handleLoginUser } from "./loginPageThunk"

// const initialState = {
//     isAuth: localStorage.getItem(isAuth) === "true",
//     data: []
// }

// const dataSlice = createSlice({
//     name: "loginPage",
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(handleLoginUser.fulfilled, (state, action) => {
//             state.data = action.payload
//             state.isAuth = true
//         })
//     }
// })

// export default dataSlice.reducer