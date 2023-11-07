import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListPengguna, postPenggunaBaru } from "./registrasiUsersRequest";

export const handleCreateOneUser = createAsyncThunk(
	"registrasiPenguuna/create",
	async (value) => {
		try {
			const response = await postPenggunaBaru(value);
			const { data, status } = response;
			if (status === 200) {
				return data;
			} else {
				throw new Error("Registrasi gagal");
			}
		} catch (error) {
			throw error;
		}
	}
);

export const listDataPengguna = createAsyncThunk(
	"registrasipengguna/list",
	async () => {
		try {
			const response = await getListPengguna();
			const { data, status } = response;
			if (status === 200) {
				return data;
			}
		} catch (error) {
			throw error;
		}
	}
);
