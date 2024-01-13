import React, { useState } from "react";
import "../../styles/loginPage.css";
import LupaPassword from "../modules/lupaPassword"
import { message } from "antd";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginUser, resetPassword } from "../../store/reducers/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";


function LupaPasswordPages() {
	const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
	const dispatch = useDispatch();

	const handleResetPassword = async (data) => {
		try {
			const { email } = data;
			setLoadingOnSubmit(true);
			// dispatch(resetPassword(email))

			await sendPasswordResetEmail(auth, email);
			message.success("Email verifikasi reset password berhasil di kirim!");
			setLoadingOnSubmit(false);
		
			
			// .then(() => {
				// 	message.success("Email verifikasi reset password berhasil di kirim!");
				// 	setLoadingOnSubmit(false);
				// }).catch((error) => {
				// 	console.log(error);
				// 	message.error("Email tidak terdaftar!");
				// })
		} catch (error) {
			const errorMessage = error.message;
			message.error("Terjadi kesalahan");
			setLoadingOnSubmit(false);
			return Promise.reject(errorMessage);
		}
	};



	return (
		<div className='login-page'>
			<LupaPassword {...{ handleResetPassword, loadingOnSubmit }} />
		</div>
	);
}

export default LupaPasswordPages;
