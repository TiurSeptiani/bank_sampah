import axios from "axios";
import { apiDev } from "../../../constans";

export const postDataTransaksi = (data) => {
    return axios.post(`${apiDev}/data-transaksi.json`, data)
}

export const getListDataTransaksi = () => {
    return axios.get(`${apiDev}/data-transaksi.json`)
}

export const deleteOneDataTransaksi = (id) => {
    return axios.delete(`${apiDev}/data-transaksi/${id}.json`)
}