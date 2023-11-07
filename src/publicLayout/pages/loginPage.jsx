import React, { useState } from 'react'
import LoginPage from "../modules/loginModules"
import "../../styles/loginPage.css"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { message } from 'antd'

function Login() {
  const [loginOnSubmit, setLoginOnSubmit] = useState(false)

  const handleLogin = (data) => {
    setLoginOnSubmit(true)
    const { email, password } = data
    signInWithEmailAndPassword(auth, email, password )
    .then((userCredential) => {
      console.log("USER", userCredential);
      localStorage.setItem("accessToken", userCredential.accessToken)
      message.success("LOGIN BERHASIL");
    })
    .catch((error) => {
      message.error("Login gagal")
    })
  }

  return (
    <div className='login-page'>
     <LoginPage {...{handleLogin}} />
    </div>
  )
}

export default Login
