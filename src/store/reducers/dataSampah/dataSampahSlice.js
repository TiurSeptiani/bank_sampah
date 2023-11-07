import { createSlice } from "@reduxjs/toolkit"
import { listDataSampah } from "./dataSampahThunk"

const initialState = {
    data: []
}

const dataSlice = createSlice({
    name: "dataSampah",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(listDataSampah.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default dataSlice.reducer