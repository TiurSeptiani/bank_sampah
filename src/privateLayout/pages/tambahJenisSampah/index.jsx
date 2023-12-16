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

	// FUngsi ini akan di jalankan pada fungsi "handleSubmit" pada modules
	const handleOnSubmit = (data) => {
		setLoadingOnSubmit(true);

		// Kirim parameter "data" di atas kedalam fungsi API untuk dikirim ke database
		dispatch(addJenisSampah(data))
			.unwrap()
			.then(() => {
				message.success("Berhasi Menambah Jenis Sampah!");
				setLoadingOnSubmit(false);

				// Jika berhasil, arahkan pengguna ke halaman beranda
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
