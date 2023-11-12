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

function Index() {
	const dispatch = useDispatch();
	const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
	const listJenisSampah = useSelector((state) => state.jenisSampah);
	const navigate = useNavigate();

	const createDataInventaris = (data) => {
		setLoadingOnSubmit(true);
		const jenisSampahArray = Object.values(listJenisSampah.data);
		const selectedJenisSampah = jenisSampahArray.find(
			(jenis) => jenis.namaJenisSampah === data.jenisSampah
		);

		if (selectedJenisSampah) {
			const harga =
				data.beratSampah * selectedJenisSampah.hargaJenisSampah;
			const dataForSubmit = {
				...data,
				harga,
			};
			dispatch(createOneDataInventaris(dataForSubmit))
				.unwrap()
				.then((res) => {
					setLoadingOnSubmit(false);
					message.success("Data berhasil dikirim!");
					dispatch(listDataInventaris());
				});
		} else {
			setLoadingOnSubmit(false);
			message.error("Jenis sampah tidak ditemukan.");
		}
	};


	const handleDeleteDataSampah = (id) => {
		setLoadingOnSubmit(true);
		dispatch(handleDeleteOneDataInventaris(id))
			.unwrap()
			.then((res) => {
				setLoadingOnSubmit(false);
				message.success("Data Sampah berhasil di hapus");
				dispatch(listDataInventaris());
			});
	};

	useEffect(() => {
		dispatch(listDataPengguna());
		dispatch(datatableHargaSampah());
		dispatch(listDataSampah());
		dispatch(listDataInventaris());
	}, [dispatch]);

	return (
		<Col>
			<Inventaris {...{ createDataInventaris, loadingOnSubmit, handleDeleteDataSampah }} />
		</Col>
	);
}

export default Index;
