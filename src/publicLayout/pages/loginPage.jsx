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

	const handleLogin = async (data) => {
		try {
		  const { email, password } = data;
		  setLoginOnSubmit(true);
	  
		  const userCredential = await signInWithEmailAndPassword(auth, email, password);
		  const user = userCredential.user;
	  
		  message.success("Berhasil Login");
	  
		  const serializedUser = {
			uid: user.uid,
			email: user.email,
		  };
	  
		  dispatch(loginUser(serializedUser));
		  navigate("/");
		  setLoginOnSubmit(false);
	  
		  return Promise.resolve();
		} catch (error) {
		  const errorMessage = error.message;
		  message.error("Email atau Password salah!");
		  setLoginOnSubmit(false);
	  
		  return Promise.reject(errorMessage);
		}
	  };
	  
	  

	return (
		<div className='login-page'>
			<LoginPage {...{ handleLogin, loginOnSubmit }} />
		</div>
	);
}

export default Login;
