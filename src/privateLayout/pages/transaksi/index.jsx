import React, { useEffect, useState } from "react";
import Transaksi from "../../modules/transaksi/index";
import { useDispatch, useSelector } from "react-redux";
import { listDataPengguna } from "../../../store/reducers/registrasiUsers/registrasiUsersThunk";
import axios from "axios";
import { apiDev } from "../../../constans";
import { message } from "antd";
import {
  handleCreateDataTransaksi,
  handleDeleteOneDataTransaksi,
  handleGetListDataTransaksi,
} from "../../../store/reducers/dataTransaksi/dataTransaksiThunk";
import { listAdministrasi } from "../../../store/reducers/administrasi/administrasiThunk";

function Index() {
  const dispatch = useDispatch();
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);
  const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
  const administrasiData = useSelector((state) => state.administrasi);

  useEffect(() => {
    dispatch(listDataPengguna());
    dispatch(handleGetListDataTransaksi());
    dispatch(listAdministrasi())
  }, [dispatch]);

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  const handleTransaksi = async (data) => {
    setLoadingOnSubmit(true);
  
    const { saldo, namaNasabah, tglPenarikan, jenis } = data;
  
    const nasabah = Object.values(dataNasabah).find(
      (nasabah) => nasabah.namaLengkap === namaNasabah
    );
  
    if (nasabah) {
      const nasabahKey = Object.keys(dataNasabah).find(
        (key) => dataNasabah[key] === nasabah
      );
  
      const administrasiKey = Object.keys(administrasiData.data)[0];
  
      const saldoNasabah = saldo * 0.9; 
      const saldoAdministrasi = saldo * 0.1;
  
      if (administrasiKey && nasabahKey) {
  
        const dataForSubmit = {
          saldoAwal: saldo,
          saldoAdministrasi,
          saldoNasabah,
          namaNasabah,
          tglPenarikan,
          jenis,
        };
  
        try {
          await axios.patch(`${apiDev}/data-pengguna/${nasabahKey}.json`, {
            saldo: 0,
          });
  
          await axios.patch(`${apiDev}/administrasi/${administrasiKey}.json`, {
            saldo: saldoAdministrasi,
          });
  
          await dispatch(handleCreateDataTransaksi(dataForSubmit));
  
          dispatch(handleGetListDataTransaksi())
            .unwrap()
            .then(() => {
              dispatch(listDataPengguna());
              dispatch(listAdministrasi());
              setLoadingOnSubmit(false);
              message.success("Berhasil melakukan penarikan");
            });
        } catch (error) {
          console.log(error);
          setLoadingOnSubmit(false);
          message.error("Gagal melakukan penarikan");
        }
      } else {
        setLoadingOnSubmit(false);
        message.error("Administrasi data tidak ditemukan");
      }
    } else {
      setLoadingOnSubmit(false);
      message.error("Data nasabah tidak ditemukan");
    }
  };
  

  const handleDeleteDataTransaksi = (id) => {
    setLoadingOnSubmit(true);
    dispatch(handleDeleteOneDataTransaksi(id))
      .unwrap()
      .then(() => {
        setLoadingOnSubmit(false);
        message.success("Data transaksi berhasil dihapus");
        dispatch(handleGetListDataTransaksi());
      });
  };

  return (
    <div>
      <Transaksi
        {...{ handleTransaksi, handleDeleteDataTransaksi, loadingOnSubmit, formatCurrency }}
      />
    </div>
  );
}

export default Index;
