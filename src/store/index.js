import { configureStore } from "@reduxjs/toolkit";
import hargaSampahSlice from "./reducers/hargaSampah/hargaSampahSlice";
import registrasiPengguna from "./reducers/registrasiUsers/registrasiUsersSlice"
import dataSampahSlice from "./reducers/dataSampah/dataSampahSlice";
import dataInventarisSlice from "./reducers/dataInventaris/dataInventarisSlice";
import authSlice from "./reducers/auth/authSlice";

export const store = configureStore({
    reducer: {
        jenisSampah: hargaSampahSlice,
        dataNasabah : registrasiPengguna,
        dataSampah: dataSampahSlice,
        dataInventaris : dataInventarisSlice,
        auth : authSlice
    }
})