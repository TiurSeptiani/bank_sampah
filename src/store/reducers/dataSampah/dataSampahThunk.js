import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataSampah } from "./dataSampahRequest";

export const listDataSampah = createAsyncThunk(
    "dataSampah/list",
    async() => {
        try {
            const response = await getDataSampah()
            const { data, status} =response
            if(status === 200) {
                return data
            }
        } catch (error) {
            throw error
        }
    }
)