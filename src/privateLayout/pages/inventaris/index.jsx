import React, { useEffect, useState } from "react";
import Inventaris from "../../modules/inventaris";
import { Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listDataPengguna } from "../../../store/reducers/registrasiUsers/registrasiUsersThunk";
import { datatableHargaSampah } from "../../../store/reducers/hargaSampah/hargaSampahThunk";
import { listDataSampah } from "../../../store/reducers/dataSampah/dataSampahThunk";
import {
	createOneDataInventaris,
	handleDeleteOneDataInventaris,
	listDataInventaris,
} from "../../../store/reducers/dataInventaris/dataInventarisThunk";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiDev } from "../../../constans";

function Index() {
	const dispatch = useDispatch();
	const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
	const listJenisSampah = useSelector((state) => state.jenisSampah);
	const { data } = useSelector((state) => state.dataInventaris);
	const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
	console.log("NASABAH", dataNasabah);

	useEffect(() => {
		dispatch(listDataInventaris());
		dispatch(listDataPengguna());
	}, [dispatch]);



	// Ini adalah fungsi induk yang di jalankan ketika fungsi anak pada component modules telah ditekan
	
	// Fungsi dibawah ini di jalankan pada fungsi "handleSubmit" yang ada di dalam modules
	const createDataInventaris = async (data) => {
		setLoadingOnSubmit(true);
		
		// Mengambil keseluruhan data jenis sampah
		const jenisSampahArray = Object.values(listJenisSampah.data);

		// Setelah variabel "jenisSampahArray" di atas sudah memiliki nilai, selanjutnya
		// Cari nama jenis sampah yang ada di dalam variabel "jenisSampahArray" dan sama kan dengan
		// Data yang pengurus inputkan pada web yaitu parameter di atas (data)
		// Apakah nama jenis sampah pada  "jenisSampahArray" dengan nama jenis sampah pada "data.jenisSampah" sama ?
		const selectedJenisSampah = jenisSampahArray.find(
			(jenis) => jenis.namaJenisSampah === data.jenisSampah
		);

		// Jika sama
		if (selectedJenisSampah) {

			// Lakukan perkalian antara "data" yang di iput oleh pengurus dengan data "jenisSampahArray" yang sudah kita kumpulkan semuanya dari API
			// Kemudian dapakan hasil perkaliannya dan simpan pada variabel "harga" dibawah ini
			const harga =
				data.beratSampah * selectedJenisSampah.hargaJenisSampah;

				// Jika sudah, amaka masukkan variabel "harga" di atas, beserta data yang pengurus inputkan
				// data yang pengurus inputkan yaitu berada pada parameter "data" di atas
			const dataForSubmit = {
				...data,
				harga,
			};

			// Kemudian lakukan pengecekan apakah nama nasabah yang ada di dalam FIREBASE sudah sama dengan nama nasabah yang pengurus inputkan
			const nasabahData = Object.values(dataNasabah).find(
				(nasabah) => nasabah.namaLengkap === dataForSubmit.namaNasabah
			);

			// Jika sama maka :
			if (nasabahData) {

				// Ambil UNIK KEY Firebasenya nya
				const nasabahKey = Object.keys(dataNasabah).find(
					(key) => dataNasabah[key] === nasabahData
				);


				// Dan lakukan penambahan saldo, dengan cara variabel "harga" hasil penjumlahan di atas
				// Ditambah dengan "saldo" nasabah yang pengurus akan inputkan saat ini 
				// SImpan hasil penjumlaham pada variabel "updateSaldo" dibawah ini
				const updatedSaldo = nasabahData.saldo + harga;

				try {

					// Kemudian, masukkan variabel "nasabahKey" di atas kedalam URL API data pengguna
					// Gunanya yaitu : pada firebase "data-pengguna", terdapat kumpulan data pengguna yang masing2 memiliki UNIK KEY
					// UNIK KEY berfungsi agar data pengguna yang "saldo" di update sudah benar benar sesuai
					await axios.patch(
						`${apiDev}/data-pengguna/${nasabahKey}.json`,
						{
							// kemudian masukkan kesini
							saldo: updatedSaldo,
						}
					);
					await dispatch(
						// Kemudian jalankan fungsi API 'createOneDataInventaris' dibawah ini untuk membuat data inventaris
						createOneDataInventaris(dataForSubmit)
					).unwrap();
					setLoadingOnSubmit(false);
					message.success("Data berhasil dikirim!");

					// Jika berhasil di hapus maka jalankan kembali fungsi API "listDataInventaris" dan "listDataPengguna" agar menampilkan data terupdate setelah terjadi perubahan
					dispatch(listDataInventaris());
					dispatch(listDataPengguna());
				} catch (error) {
					setLoadingOnSubmit(false);
					message.error("Gagal mengupdate saldo nasabah.");
				}
			} else {
				setLoadingOnSubmit(false);
				message.error("Nama nasabah tidak ditemukan.");
			}
		} else {
			setLoadingOnSubmit(false);
			message.error("Jenis sampah tidak ditemukan.");
		}
	};


	// Fungsi untuk menghapus data inventaris, ini akan di jalankan ketika tombol pada component modules di tekan
	const handleDeleteDataSampah = async (id) => {
		setLoadingOnSubmit(true);

		try {

			// Menjalankan fungsi API "handleDeleteOneDataInventaris" dengan mengirimkan parameter "id" di atas, agar data yang terhapus seusiao dnegan unik keynya
			await dispatch(handleDeleteOneDataInventaris(id)).unwrap();
			setLoadingOnSubmit(false);
			message.success("Data Sampah berhasil dihapus");

			// Jika berhasil di hapus maka jalankan kembali fungsi API "listDataInventaris"  agar menampilkan data terupdate setelah terjadi perubahan
			dispatch(listDataInventaris());
		} catch (error) {
			setLoadingOnSubmit(false);
			message.error("Terjadi kesalahan");
			console.error("Error in handleDeleteDataSampah:", error);
		}
	};

	useEffect(() => {
		dispatch(listDataPengguna());
		dispatch(datatableHargaSampah());
		dispatch(listDataSampah());
		dispatch(listDataInventaris());
	}, [dispatch]);

	return (
		<Col>
			<Inventaris
				{...{
					createDataInventaris,
					loadingOnSubmit,
					handleDeleteDataSampah,
				}}
			/>
		</Col>
	);
}

export default Index;
