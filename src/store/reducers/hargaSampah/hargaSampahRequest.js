import axios from "axios";
import { apiDev } from "../../../constans";

export const getListHargaSampah = () => {
	return axios.get(`${apiDev}/list-harga-sampah.json`);
};
