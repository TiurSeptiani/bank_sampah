import React, { useEffect, useState } from "react";
import Profile from "../../modules/profile";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listDataPengguna } from "../../../store/reducers/registrasiUsers/registrasiUsersThunk";
import { handleGetListDataTransaksi } from "../../../store/reducers/dataTransaksi/dataTransaksiThunk";
import { listAdministrasi } from "../../../store/reducers/administrasi/administrasiThunk";
import axios from "axios";
import { apiDev } from "../../../constans";

function Index() {
  const dispatch = useDispatch();
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
  const administrasi = useSelector((state) => state.administrasi);

  useEffect(() => {
    dispatch(listDataPengguna());
    dispatch(handleGetListDataTransaksi());
    dispatch(listAdministrasi());
  }, [dispatch]);


  // Fungsi ini dilankan pada fungsi "resetSaldo" yang ada di dalam modules
  // berfungsi untuk mereset saldo mejadi 0
  const handleResetSaldo = async () => {
    setLoadingOnSubmit(true);

    // Ambil UNIK KEY nya
    const administrasiKey = Object.keys(administrasi.data)[0];

    // Jika UNIK KEY sudah di dapatkan maka :
    if (administrasiKey) {
      // Buat variabel "resetSaldo" dengan nilai 0
      const resetSaldo = 0;

      // dan kirim variabel "administrasiKey" beserta variabel "resetSaldo" di atas ke LINK API administrasi dawah ini
      await axios.patch(`${apiDev}/administrasi/${administrasiKey}.json`, {
        saldo: resetSaldo,
      });

      // Jika berhasil di hapus maka jalankan kembali fungsi API "listAdministrasi" agar menampilkan data terupdate setelah terjadi perubahan
      dispatch(listAdministrasi());
      setLoadingOnSubmit(false);
    } else {
      setLoadingOnSubmit(false);
    }
  };

  return (
    <Row>
      <Col
        span={24}
        style={{ height: "76vh", display: "flex", justifyContent: "center" }}
      >
        <Profile {...{ handleResetSaldo }} />
      </Col>
    </Row>
  );
}

export default Index;
