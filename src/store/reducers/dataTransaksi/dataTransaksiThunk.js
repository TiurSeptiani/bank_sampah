import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	deleteOneDataTransaksi,
	getListDataTransaksi,
	postDataTransaksi,
} from "./dataTransaksiRequest";

export const handleCreateDataTransaksi = createAsyncThunk(
	"transaksi/create",
	async (value) => {
		const response = await postDataTransaksi(value);
		const { data, status } = response;
		if (status === 200) {
			return data;
		}
		throw new Error("Failed to create data transaksi");
	}
);

export const handleGetListDataTransaksi = createAsyncThunk(
	"transaksi/list",
	async () => {
		try {
			const response = await getListDataTransaksi();
			const { data, status } = response;
			if (status === 200) {
				return data;
			}
		} catch (error) {
			throw error;
		}
	}
);

export const handleDeleteOneDataTransaksi = createAsyncThunk(
	"transaksi/delete",
	async (value) => {
		try {
			const response = await deleteOneDataTransaksi(value);
			const { data, status } = response;
			if (status === 200) {
				return data;
			}
		} catch (error) {
			throw error;
		}
	}
);
