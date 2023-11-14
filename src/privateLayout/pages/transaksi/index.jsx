import React, { useEffect, useState } from "react";
import Transaksi from "../../modules/transaksi/index";
import { useDispatch, useSelector } from "react-redux";
import { listDataPengguna } from "../../../store/reducers/registrasiUsers/registrasiUsersThunk";
import axios from "axios";
import { apiDev } from "../../../constans";
import { message } from "antd";
import { handleCreateDataTransaksi, handleDeleteOneDataTransaksi, handleGetListDataTransaksi } from "../../../store/reducers/dataTransaksi/dataTransaksiThunk";


function Index() {
	const dispatch = useDispatch();
	const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
	const { data: dataNasabah } = useSelector((state) => state.dataNasabah);

	useEffect(() => {
		dispatch(listDataPengguna());
    dispatch(handleGetListDataTransaksi());
	}, [dispatch]);

	const handleTransaksi = async (data) => {
		setLoadingOnSubmit(true);
		const { saldo, jumlahPenarikan, namaNasabah, tglPenarikan, jenis } =
			data;

		const nasabah = Object.values(dataNasabah).find(
			(nasabah) => nasabah.namaLengkap === namaNasabah
		);

		if (nasabah) {
			const nasabahKey = Object.keys(dataNasabah).find(
				(key) => dataNasabah[key] === nasabah
			);

			const saldoAkhir = saldo - jumlahPenarikan;

			const dataForSubmit = {
				jumlahPenarikan,
				namaNasabah,
				tglPenarikan,
				jenis,
			};

			try {
				await axios.patch(
					`${apiDev}/data-pengguna/${nasabahKey}.json`,
					{
						saldo: saldoAkhir,
					}
				);

				await dispatch(handleCreateDataTransaksi(dataForSubmit));
				dispatch(listDataPengguna());
				dispatch(handleGetListDataTransaksi());
				setLoadingOnSubmit(false);
				message.success("Berhasil melakukan penarikan");
			} catch (error) {
				console.log(error);
				message.error("gagal melakukan penarikan");
			}
		} else {
			setLoadingOnSubmit(false);
			message.error("Data nasabah tidak ditemukan");
		}
	};

	const handleDeleteDataTransaksi = (id) => {
		setLoadingOnSubmit(true)
		dispatch(handleDeleteOneDataTransaksi(id))
		.unwrap()
		.then(() => {
			setLoadingOnSubmit(false)
			message.success("Data transaksi berhasil di hapus")
			dispatch(handleGetListDataTransaksi());
		})
	}

	return (
		<div>
			<Transaksi {...{ handleTransaksi, handleDeleteDataTransaksi }} />
		</div>
	);
}

export default Index;
