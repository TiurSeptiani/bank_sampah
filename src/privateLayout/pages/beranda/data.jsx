import React, { useEffect, useState } from "react";
import Beranda from "../../modules/beranda";
import { Col, message } from "antd";
import "../../../styles/beranda/beranda.css";
import { useDispatch, useSelector } from "react-redux";
import {
	datatableHargaSampah,
	handleDeleteOneJenisSampah,
} from "../../../store/reducers/hargaSampah/hargaSampahThunk"
import { listDataPengguna } from "../../../store/reducers/registrasiUsers/registrasiUsersThunk";
import { handleGetListDataTransaksi } from "../../../store/reducers/dataTransaksi/dataTransaksiThunk";

function Index() {
	const dispatch = useDispatch();
	const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);

	// Fungsi API dibawah ini akan di jalankan ketika user membuka beranda di dalam website
	useEffect(() => {
		dispatch(datatableHargaSampah());
		dispatch(listDataPengguna());
		dispatch(handleGetListDataTransaksi());
	}, [dispatch]);

	// Fungsi dibawah ini tujuannya untuk menghapus jenis sampah
	// Fungsi ini akan di jalankan pada component "DataTabel", tepatnya di dalam "handleConfirmDelete" pada "modules/beranda dan cari <DataTabel>"
	const handleDeleteJenisSampah = (id) => {
		setLoadingOnSubmit(true);

		// Amdil dan masukkan parameter "id" di atas kedalam Funsi API dibawah ini
		dispatch(handleDeleteOneJenisSampah(id))
			.unwrap()
			.then((res) => {
				setLoadingOnSubmit(false);
				message.success("Jenis Sampah berhasil di hapus");

				// Jika berhasil di hapus maka jalankan kembali fungsi API "datatableHargaSampah" agar menampilkan data terupdate setelah terjadi penghapusan
				dispatch(datatableHargaSampah());
			});
	};

	return (
		<Col>
			<Beranda {...{ handleDeleteJenisSampah, loadingOnSubmit }} />
		</Col>
	);
}

export default Index;
