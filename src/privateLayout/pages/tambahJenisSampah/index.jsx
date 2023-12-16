import React, { useState } from "react";
import FormJenisSampah from "../../modules/tambahJenisSampah";
import { useDispatch } from "react-redux";
import { addJenisSampah } from "../../../store/reducers/hargaSampah/hargaSampahThunk";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function JenisSampah() {
	const dispatch = useDispatch();
	const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
	const navigate = useNavigate()

	// INI AKAN BERJALAN KETIKA TOMBOL KIRIM PADA COMPONENT MODULES DI TEKAN
	const handleOnSubmit = (data) => {
		setLoadingOnSubmit(true);
		dispatch(addJenisSampah(data))
			.unwrap()
			.then(() => {
				message.success("Berhasi Menambah Jenis Sampah!");
				setLoadingOnSubmit(false);
				navigate('/')
			});
	};

	return (
		<div>
			<FormJenisSampah {...{ handleOnSubmit, loadingOnSubmit }} />
		</div>
	);
}

export default JenisSampah;
