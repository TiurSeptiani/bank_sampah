import React, { useState } from "react";
import FormJenisSampah from "../../modules/tambahJenisSampah";
import { useDispatch } from "react-redux";
import { addJenisSampah } from "../../store/reducers/hargaSampah/hargaSampahThunk";
import { message } from "antd";

function JenisSampah() {
	const dispatch = useDispatch();
	const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);

	const handleOnSubmit = (data) => {
		setLoadingOnSubmit(true);
		dispatch(addJenisSampah(data))
			.unwrap()
			.then(() => {
				message.success("Berhasi Menambah Jenis Sampah!");
				setLoadingOnSubmit(false);
			});
	};

	return (
		<div>
			<FormJenisSampah {...{ handleOnSubmit, loadingOnSubmit }} />
		</div>
	);
}

export default JenisSampah;
