import { createSlice } from "@reduxjs/toolkit"
import { datatableHargaSampah } from "./hargaSampahThunk"

const initialState = {
    data: [],
    loadingData: false,
}

const dataSlice = createSlice({
    name: "hargaSampah",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(datatableHargaSampah.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})



export default dataSlice.reducer