import axios from "axios";
import { store } from "../Store";

const AxiosHrm = axios.create({
	baseURL: `https://api-hrm.multidayaintegra.com/api`,
});

AxiosHrm.interceptors.request.use(
	function (config) {
		const state = store.getState();

		const token = state.LoginUserReducer.token;

		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}

		return config;
	},
	function (err) {
		return Promise.reject(err);
	}
);

export default AxiosHrm;
