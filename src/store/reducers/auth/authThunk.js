import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase";
import { signOut, sendPasswordResetEmail } from "firebase/auth";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (values) => {
        localStorage.setItem("isAuth", "true")
        return values
    }
)


export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (values) => {
        const { accessToken, uid, photoURL, email, phoneNumber } = values
        const dataForSubmit = { accessToken, uid, phoneNumber, photoURL, email, phoneNumber }
        return dataForSubmit
    }
)


export const logoutUser = createAsyncThunk(
    "auth/logOut",
    async () => {
        signOut(auth).then(() => {
            console.log("Berhasil Logout")
            localStorage.clear("isAuth")
        }).catch((error) => {
            console.log(error)
        });
    }
)

export const resetPassword = createAsyncThunk("auth/resetPassword",
    async (values) => {
        sendPasswordResetEmail(auth, values.email)
        .then((res) => {
            console.log('Success');
            console.log('Response', res);
        }).catch((error) => {
            console.log(error);
        })
    })
