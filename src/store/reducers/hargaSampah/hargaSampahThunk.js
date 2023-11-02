import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListHargaSampah } from "./hargaSampahRequest";

export const datatableHargaSampah = createAsyncThunk(
	"hargaSampah/datatable",
	async (value) => {
	  try {
		const response = await getListHargaSampah();
		if (response.status === 200) {
		  return response.data; // Mengembalikan data langsung
		} else {
		  throw new Error('Gagal mengambil data dari API');
		}
	  } catch (error) {
		throw error;
	  }
	}
  );
  
