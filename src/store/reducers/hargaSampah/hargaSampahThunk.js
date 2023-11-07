import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteJenisSampah, getListHargaSampah, postJenisSampah } from "./hargaSampahRequest";

export const datatableHargaSampah = createAsyncThunk(
	"hargaSampah/datatable",
	async (value) => {
		try {
			const response = await getListHargaSampah();
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("Gagal mengambil data");
			}
		} catch (error) {
			throw error;
		}
	}
);

export const addJenisSampah = createAsyncThunk(
	"hargaSampah/create",
	async (value) => {
		try {
			const response = await postJenisSampah(value);

			const { data, status } = response;
			if (status === 200) {
				return data;
			} else {
				throw new Error("Gagal menambahkan data");
			}
		} catch (error) {
			throw error;
		}
	}
);

export const handleDeleteOneJenisSampah = createAsyncThunk(
	"hargaSampah/delete",
	async (value) => {
		try {
			const response = await deleteJenisSampah(value);

			const { data, status } = response;
			if (status === 200) {
				return data;
			} else {
				throw new Error("Gagal menghapus data");
			}
		} catch (error) {
			throw error;
		}
	}
);
