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


  // Fungsi RESET SALDO akan berjalan ketika tombol reset pada component MODULES di tekan
  const handleResetSaldo = async () => {
    setLoadingOnSubmit(true);
    const administrasiKey = Object.keys(administrasi.data)[0];
    if (administrasiKey) {
      const resetSaldo = 0;
      await axios.patch(`${apiDev}/administrasi/${administrasiKey}.json`, {
        saldo: resetSaldo,
      });
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
