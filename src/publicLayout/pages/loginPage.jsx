import React, { useState } from "react";
import LoginPage from "../modules/loginModules";
import "../../styles/loginPage.css";
import { message } from "antd";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/reducers/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";


function Login() {
	const [loginOnSubmit, setLoginOnSubmit] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Fungsi "handleLogin" di jalankankan atau di triger pada component anak, sehingga parameter "data" di dapatkan pada component anak
	const handleLogin = async (data) => {
		try {

			// Isi dari parameter "data" adalah "email" dan "password". sehingga di lakukan seperti dibawah ini untuk mendapatkan secara spesifik isinya.

			// Maksudnya, isi dari "data" contohnya "email" dan "password" akan kita jadikan variabel sehingga mudah di panggil dimanapun.
			const { email, password } = data;
			setLoginOnSubmit(true);



			//   Di Firebase untuk melakukan login kita harus memanggil "signInWithEmailAndPassword" dari "firebase/auth" untuk mengirim "Email" dan "Password" yang kita punya untuk login

			//   Kita menggunakan "email" dan "password" di atas kedalam sini :
			const userCredential = await signInWithEmailAndPassword(auth, email, password);


			//   Jika login berhasil maka variabel "user" akan terisi oleh informasi pengguna atau disebut "USER CREDENTIAL". 
			// User Credential akan kita masukkan kedalam variabel user
			const user = userCredential.user;


			//   Kemudian akan mengirimkan notifikasi "Berhasil Login"
			message.success("Berhasil Login");


			//  Kemudian kita akan mengambil beberapa data penting dari variabel "user" seperti "UID" dan "EMAIL"
			const serializedUser = {
				uid: user.uid,
				email: user.email,
			};


			// Kemudian "serializedUser" akan kita kirimkan ke fungsi "loginUser" sebagai parameter
			// Karena pada codingan ini kita menggunakan "Redux" sebagai state management (menyimpan dan mengelola data aplikasi secara terpusat)

			// Disini kita menggunakan "dispatch" sebagai pemicu/menjalankan fungsi "loginUser" 
			// Untuk melihat informasi fungsi "loginUser", kita dapat menekan CTRL + CLIK ke "loginUser"
			dispatch(loginUser(serializedUser));


			// Kemudian kita akan di navigasi ke component yang memiliki path="/"
			// Informasi tentang pemberian "path" pada setiap component, kita bisa liat kedlaam file "App.jsx"
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
