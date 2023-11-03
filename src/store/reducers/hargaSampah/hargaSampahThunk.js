import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListHargaSampah, postJenisSampah } from "./hargaSampahRequest";

export const datatableHargaSampah = createAsyncThunk(
	"hargaSampah/datatable",
	async (value) => {
		try {
			const response = await getListHargaSampah();
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("Gagal mengambil data dari API");
			}
		} catch (error) {
			throw error;
		}
	}
);

export const addJenisSampah = createAsyncThunk(
	"hargaSampah/add",
	async (value) => {
		try {
			const response = await postJenisSampah(value);

			const { data, status } = response;
			if (status === 200) {
				return data;
			} else {
				throw new Error("Gagal mengambil data dari API");
			}
		} catch (error) {
			throw error;
		}
	}
);
