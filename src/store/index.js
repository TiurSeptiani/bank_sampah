import { configureStore } from "@reduxjs/toolkit";
import hargaSampahSlice from "./reducers/hargaSampah/hargaSampahSlice";

export const store = configureStore({
    reducer: {
        hargaSampah: hargaSampahSlice
    }
})