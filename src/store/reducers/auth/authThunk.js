import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

export const loginUser = createAsyncThunk(
    "auth/login",
    // "values" ini adalah parameter "serializedUser" yang kita kirimkan sebelumnya
    async( values ) => {

        // Pada website kita melakukan memasang property "isAuth" dengan nilai "true" pada local storage
        // Untuk melihat local storage kita dapat menekan inspect element kemudian cari "application" kemudian cari local storage 
        localStorage.setItem("isAuth", "true")

        // Kemudian kita akan mengembalikan "values" dan menyimpannya kedalam state management yang berada pada file "store/reducers/auth/authSlice", ayo kita cek
        return values
    }
)
 

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async(values) => {
        const { accessToken, uid, photoURL, email, phoneNumber} = values
        const dataForSubmit = {accessToken, uid, phoneNumber, photoURL, email, phoneNumber}
        return dataForSubmit
    }
)


export const logoutUser = createAsyncThunk(
    "auth/logOut",
    async() => {
        signOut(auth).then(() => {
           console.log("Berhasil Logout")
           localStorage.clear("isAuth")
          }).catch((error) => {
            console.log(error)
          });
    }
)
