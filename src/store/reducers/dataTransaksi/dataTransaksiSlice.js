import { createSlice } from "@reduxjs/toolkit"
import { handleGetListDataTransaksi } from "./dataTransaksiThunk"

const initialState = {
    data: []
}

const dataSlice = createSlice({
    name: "dataTransaksi",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(handleGetListDataTransaksi.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default dataSlice.reducer