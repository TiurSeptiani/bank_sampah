import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAdministrasi, getListAdministrasi, postAdministrasi } from "./administrasiRequest";

export const handlePostAdministrasi = createAsyncThunk(
	"administrasi/create",
	async (value) => {
		try {
			const response = await postAdministrasi(value);
			const { data, status } = response;
			if (status === 200) {
				return data;
			}
		} catch (error) {
			throw error;
		}
	}
);

export const listAdministrasi = createAsyncThunk(
	"administrasi/list",
	async () => {
		try {
			const response = await getListAdministrasi();
			const { data, status } = response;
			if (status === 200) {
				return data;
			}
		} catch (error) {
			throw error;
		}
	}
);

export const handleDeleteAdministrasi = createAsyncThunk(
	"registrasiPengguna/delete",
	async (value) => {
		try {
			const response = await deleteAdministrasi(value);
			const { data, status } = response;
			if (status === 200) {
				return data;
			}
		} catch (error) {
			throw error;
		}
	}
);