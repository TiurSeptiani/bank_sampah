import axios from "axios";
import { apiDev } from "../../../constans";

export const postPenggunaBaru = (data) => {
    return axios.post(`${apiDev}/data-pengguna.json`, data)
}

export const getListPengguna = () => {
    return axios.get(`${apiDev}/data-pengguna.json`)
}