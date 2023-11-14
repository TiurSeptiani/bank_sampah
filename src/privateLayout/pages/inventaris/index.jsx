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

	useEffect(() => {
		dispatch(listDataInventaris());
		dispatch(listDataPengguna());
	}, [dispatch]);

	const createDataInventaris = async (data) => {
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
			const nasabahData = Object.values(dataNasabah).find(
				(nasabah) => nasabah.namaLengkap === dataForSubmit.namaNasabah
			);

			if (nasabahData) {
				const nasabahKey = Object.keys(dataNasabah).find(
					(key) => dataNasabah[key] === nasabahData
				);

				const updatedSaldo = nasabahData.saldo + harga;

				try {
					await axios.patch(
						`${apiDev}/data-pengguna/${nasabahKey}.json`,
						{
							saldo: updatedSaldo,
						}
					);
					await dispatch(
						createOneDataInventaris(dataForSubmit)
					).unwrap();
					setLoadingOnSubmit(false);
					message.success("Data berhasil dikirim!");
					dispatch(listDataInventaris());
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

	const handleDeleteDataSampah = async (id) => {
		setLoadingOnSubmit(true);

		try {
			await dispatch(handleDeleteOneDataInventaris(id)).unwrap();
			setLoadingOnSubmit(false);
			message.success("Data Sampah berhasil dihapus");
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
