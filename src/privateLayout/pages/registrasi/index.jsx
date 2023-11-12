import React, { useState } from "react";
import Registrasi from "../../modules/registrasi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { handleCreateOneUser } from "../../../store/reducers/registrasiUsers/registrasiUsersThunk";
import { ref, set, getDatabase  } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Index() {
	const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const handleCreateUser = (data) => {
		setLoadingOnSubmit(true);
		const { email, password, status } = data;
		createUserWithEmailAndPassword(auth, email, password, status)
			.then((userCredential) => {
				const uid = userCredential.user.uid
				const dataForSubmit = {...data, uid}
				dispatch(handleCreateOneUser(dataForSubmit))
					.unwrap()
					.then(() => {
						setLoadingOnSubmit(false);
						message.success("Selamat registrasi berhasil!");
						navigate('/data-anggota')
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

  

	return (
		<div>
			<Registrasi {...{ handleCreateUser, loadingOnSubmit }} />
		</div>
	);
}

export default Index;
