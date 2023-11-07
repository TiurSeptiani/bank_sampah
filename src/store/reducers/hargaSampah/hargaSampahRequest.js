import axios from "axios";
import { apiDev } from "../../../constans";

export const getListHargaSampah = () => {
	return axios.get(`${apiDev}/list-harga-sampah.json`);
};

export const postJenisSampah = (data) => {
	return axios.post(`${apiDev}/list-harga-sampah.json`, data)
}

export const deleteJenisSampah = (id) => {
	return axios.delete(`${apiDev}/list-harga-sampah/${id}.json`)
}