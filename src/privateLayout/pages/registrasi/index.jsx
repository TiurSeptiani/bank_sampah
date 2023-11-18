import React, { useEffect, useState } from "react";
import Registrasi from "../../modules/registrasi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { message } from "antd";
import { useDispatch } from "react-redux";
import {
  handleCreateOneUser,
  listDataPengguna,
} from "../../../store/reducers/registrasiUsers/registrasiUsersThunk";
import { useNavigate } from "react-router-dom";

function Index() {
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listDataPengguna());
  }, [dispatch]);

  const handleCreateUser = (data) => {
    setLoadingOnSubmit(true);
    const {
      email,
      password,
      namaLengkap,
      noHp,
      alamat,
      noRt,
      status,
      saldo,
      tanggalBergabung,
    } = data;
    const saveData = {
      email,
      password,
      namaLengkap,
      noHp,
      alamat,
      noRt,
      status,
      saldo,
      tanggalBergabung,
    };
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        const dataForSubmit = { ...saveData, uid };
        dispatch(handleCreateOneUser(dataForSubmit))
          .unwrap()
          .then(() => {
            setLoadingOnSubmit(false);
            message.success("Selamat registrasi berhasil!");
            navigate("/data-anggota");
          });
      })
      .catch((error) => {
        console.log(error);
        setLoadingOnSubmit(false);
      });
  };

  return (
    <div>
      <Registrasi {...{ handleCreateUser, loadingOnSubmit }} />
    </div>
  );
}

export default Index;
