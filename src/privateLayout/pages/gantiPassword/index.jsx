import React, { useState } from "react";
import GantiPassword from "../../modules/gantiPassword/gantiPassword";

import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, getAuth } from "firebase/auth";
import { message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiDev } from "../../../constans";
import { useNavigate } from "react-router-dom";

function Index() {
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
  const { currentUser: dataCurrent } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.dataNasabah);
  const navigate = useNavigate();

  console.log("Kumpulan User", data);
  console.log("Data CurrentUser", dataCurrent);

  const handleChangePassword = async (values) => {
    setLoadingOnSubmit(true);
  
    const { passwordBaru, passwordLama } = values;
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    try {
      const credentials = EmailAuthProvider.credential(user.email, passwordLama);
      await reauthenticateWithCredential(user, credentials);
      await updatePassword(user, passwordBaru);
  
      const foundUser = Object.values(data).find((user) => user.uid === dataCurrent.uid);
  
      if (foundUser) {
        const key = Object.keys(data).find(
          (key) => data[key].uid == foundUser.uid
        );
  
        if (key) {
          console.log("KEY", key);
          try {
            await axios.patch(`${apiDev}/data-pengguna/${key}.json`, {
              password: passwordBaru,
            });
            message.success("Password berhasil di ganti");
            navigate("/profile");
          } catch (error) {
            console.error("Error updating user data in the database:", error);
            message.error("Gagal mengganti password");
          }
        } else {
          console.error("User ID not found.");
          message.error("ID pengguna tidak ditemukan");
        }
      } else {
        console.error("User not found in data.");
        message.error("Pengguna tidak ditemukan");
      }

      
    } catch (error) {
      message.error("Tidak dapat mengganti password");
      console.log(error);
    } finally {
      setLoadingOnSubmit(false);
    }
  };
  

  return (
    <div>
      <GantiPassword {...{ handleChangePassword }} />
    </div>
  );
}

export default Index;
