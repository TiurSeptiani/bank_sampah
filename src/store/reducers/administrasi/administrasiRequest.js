import axios from "axios";
import { apiDev } from "../../../constans";

export const postAdministrasi = (data) => {
    return axios.post(`${apiDev}/administrasi.json`, data)
}

export const getListAdministrasi = () => {
    return axios.get(`${apiDev}/administrasi.json`)
}

export const deleteAdministrasi = (id) => {
    return axios.delete(`${apiDev}/administrasi/${id}.json`)
}