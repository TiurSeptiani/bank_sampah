import { createSlice } from "@reduxjs/toolkit";
import { handleCreateOneUser, listDataPengguna } from "./registrasiUsersThunk";

const initialState = {
    data: []
}

const dataSlice = createSlice({
    name: "registrasiPengguna",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(listDataPengguna.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default dataSlice.reducer