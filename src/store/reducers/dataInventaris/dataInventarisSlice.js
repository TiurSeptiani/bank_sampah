import { createSlice } from "@reduxjs/toolkit"
import { listDataInventaris } from "./dataInventarisThunk"

const initialState = {
    data: []
}

const dataSlice = createSlice({
    name: "dataInventaris",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(listDataInventaris.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default dataSlice.reducer