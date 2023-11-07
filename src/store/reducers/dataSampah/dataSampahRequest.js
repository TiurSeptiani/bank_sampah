import axios from "axios"
import { apiDev } from "../../../constans";

export const getDataSampah = () => {
    return axios.get(`${apiDev}/data-sampah.json`)
}