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

  // Fungsi untuk format menjadi mata uang indonesia
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  // Fungsi untuk mengirim adata transaksi ke API
  // Ini akan berjalan ketika fungsi TOMBOL KIRIM di tekan
  const handleTransaksi = async (data) => {
    setLoadingOnSubmit(true);
  
    const { saldo, namaNasabah, tglPenarikan, jenis } = data;
  
    const nasabah = Object.values(dataNasabah).find(
      (nasabah) => nasabah.namaLengkap === namaNasabah
    );
  
    if (nasabah) {

      // Tangkap data UNIK KEY dari pengguna yang melakukan penarikan pada FIREBASE 
      const nasabahKey = Object.keys(dataNasabah).find(
        (key) => dataNasabah[key] === nasabah
      );
  
      // Tangkap data UNIK KEY dari penampungan saldo administrasi yang melakukan pembagian hasil
      const administrasiKey = Object.keys(administrasiData.data)[0];
  
      
        // Disini kita menjumlahkan saldo nsabah dengan mengalikan 90&
      const saldoNasabah = saldo * 0.9; 

      // Disini kita menjumlahkan saldo administrasi/bank sampah dengaan mengalikan 10%
      const saldoAdministrasi = saldo * 0.1;

      // Jika UNIK KEY administrasi dan nasabah telah tersedia
  
      if (administrasiKey && nasabahKey) {

        
        // Kelompokkan datanya dan kirim kedalam " dispatch(handleCreateDataTransaksi(dataForSubmit)"
        const dataForSubmit = {
          saldoAwal: saldo,
          saldoAdministrasi,
          saldoNasabah,
          namaNasabah,
          tglPenarikan,
          jenis,
        };
  
        try {

          // kirim variabel "nasabahKey" yang berisi UNIK KEY dari nasabah yang sedang di proses saat ini
          await axios.patch(`${apiDev}/data-pengguna/${nasabahKey}.json`, {
            saldo: 0,
          });
  
          // Masukkan hasil pembagian 10% dari pengguna kedlaam API khusus penamping saldo administrasi
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
  
  // Fungsi untuk menghapus data TRANSAKSI nasabah
  const handleDeleteDataTransaksi = (id) => {
    setLoadingOnSubmit(true);

    // Kirim parameter "id" kedalam fungsi API dibawah ini :
    dispatch(handleDeleteOneDataTransaksi(id))
      .unwrap()
      .then(() => {
        setLoadingOnSubmit(false);
        message.success("Data transaksi berhasil dihapus");

        // Jika berhasil, maka update tampilan dan data saat terjadi perubahan
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
