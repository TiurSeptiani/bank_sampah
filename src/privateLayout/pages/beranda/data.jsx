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

	useEffect(() => {
		dispatch(datatableHargaSampah());
		dispatch(listDataPengguna());
		dispatch(handleGetListDataTransaksi());
	}, [dispatch]);

	const handleDeleteJenisSampah = (id) => {
		setLoadingOnSubmit(true);
		dispatch(handleDeleteOneJenisSampah(id))
			.unwrap()
			.then((res) => {
				setLoadingOnSubmit(false);
				message.success("Jenis Sampah berhasil di hapus");
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
