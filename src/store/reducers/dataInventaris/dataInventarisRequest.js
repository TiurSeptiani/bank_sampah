import axios from "axios"
import { apiDev } from "../../../constans"

export const postDataInventaris = (data) => {
    return axios.post(`${apiDev}/data-inventaris.json`, data)
}

export const getDataInventaris = () => {
    return axios.get(`${apiDev}/data-inventaris.json`)
}