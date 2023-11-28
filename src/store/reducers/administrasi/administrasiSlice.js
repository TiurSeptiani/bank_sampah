import { createSlice } from "@reduxjs/toolkit";
import { listAdministrasi } from "./administrasiThunk";

const initialState = {
    data: []
}

const dataSlice = createSlice({
    name: "administrasi",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(listAdministrasi.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default dataSlice.reducer