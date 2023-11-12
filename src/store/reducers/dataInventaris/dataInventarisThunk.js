import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteOneDataInventaris, getDataInventaris, postDataInventaris } from "./dataInventarisRequest";

export const createOneDataInventaris = createAsyncThunk(
    "dataInventaris/post",
    async (value) => {
        try {
            const response = await postDataInventaris(value)
            const { data, status } = response
            if(status === 200) {
                return data
            }
        } catch (error) {
            throw error
        }
    }
)

export const listDataInventaris = createAsyncThunk(
    "dataInventaris/list",
    async () => {
        try {
            const response = await getDataInventaris()
            const { data, status } = response
            if(status === 200) {
                return data
            }
        } catch (error) {
            throw error
        }
    }
)

export const handleDeleteOneDataInventaris = createAsyncThunk(
    "dataInventaris/delete",
    async(id) => {
        try {
            const response = await deleteOneDataInventaris(id)
            const { data, status} = response
            if(status === 200) {
                return data
            }
        } catch (error) {
            throw error
        }
    }
)