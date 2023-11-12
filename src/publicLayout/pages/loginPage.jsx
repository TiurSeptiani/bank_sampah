import React, { useState } from "react";
import LoginPage from "../modules/loginModules";
import "../../styles/loginPage.css";
import { message } from "antd";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/reducers/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


function Login() {
	const [loginOnSubmit, setLoginOnSubmit] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = (data) => {
		const { email, password } = data
		setLoginOnSubmit(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				message.success("Berhasil Login")
				const user = userCredential.user;
				dispatch(loginUser(user))
				navigate("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				message.error("Email atau Password salah!")
			});
	};

	return (
		<div className='login-page'>
			<LoginPage {...{ handleLogin, loginOnSubmit }} />
		</div>
	);
}

export default Login;
