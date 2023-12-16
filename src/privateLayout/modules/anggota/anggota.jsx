import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Input, Modal, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

function Anggota({ handleDeletePengguna, loadingOnSubmit }) {
  const { data } = useSelector((state) => state.dataNasabah);
  
  const { currentUser } = useSelector((state) => state.auth);
  const rowKey = "namaLengkap";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchTermPetugas, setSearchTermPetugas] = useState("");
  const [searchTermAnggota, setSearchTermAnggota] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  // Berfungsi untuk mengatur scroll tabel, semakin kecil ukuran layar maka scroll pada tabel akan muncul
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // Fungsi untuk menghapus data Nasabah, dengan cara menangkap namanya
  const handleDelete = (e, namaLengkap) => {
    // Berfungsi untuk menghilangkan perilaku default browser ketika ini di click, perilakunya yaitu terefresh sendiri ketika fungsi ini di jalankan
    e.preventDefault();

    // Setelah nama berhasil di ambil, selanjutnya menangkap UNIK KEY yang dimiliki oleh Nasabah didalam FIREBASE
    // Selanjutnya tangkap UNIK KEY yang dimiliki nasabah tersebut dengan cara melakukan pengkondisian, cek apakah variabel "data" dengan "namaLengkap" yang ada di dalam nya, sama dengan "namaLengkap" yang ada di dalam parameter "handleDelete" di atas?
    // Jika tidak ada yang sama, maka fungsi ini tidak akan bekerja
    // Jika sama, simpan UNIK KEY nya kedalam "id" dibawah ini
    const id = Object.keys(data).find(
      (key) => data[key].namaLengkap === namaLengkap
    );

    // Jika UNIK KEY berhasil di tangkap, kirim UNIK KEY nya kedalam "showDeleteModal" untuk di hapus dari FIREBASE
    if (id) {
      showDeleteModal(id);
    }
  };

// Disini kita telah mendapatkan "id" nya
  const showDeleteModal = (id) => {

    // Kirim "id" nya kedalam "setDeleteId" yang kita deklarasikan di atas, panggil mutatornya seperti dibawah ini, agar "deleteId" memiliki nilai
    setDeleteId(id);
    setIsModalVisible(true);
  };

  // Fungsi dibawah ini adalah fungsi untuk tombol "Ok", jika user ingin menghapusnya
  const handleDeleteConfirm = () => {
    handleDeletePengguna(deleteId);
    setIsModalVisible(false);
  };

  // Fungsi dibawah ini adalah fungsi untuk tombol "Cancel", jika user ingin batal menghapus
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  // Data untuk tabel petugas
  const columnsPetugas = [
    {
      title: "No",
      width: 60,
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nama Pengurus",
      dataIndex: "namaLengkap",
      width: 200,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      width: 300,
    },
    {
      title: "RT",
      dataIndex: "noRt",
      width: 70,
    },
    {
      title: "No. Handphone",
      dataIndex: "noHp",
      width: 200,
    },
    {
      title: "Tanggal Bergabung",
      dataIndex: "tanggalBergabung",
      width: 200,
      render: (text) => {
        const formattedDate = new Date(text).toLocaleDateString("id-ID");
        return <span>{formattedDate}</span>;
      },
    },
    
  ];

  // Data untuk Tabel Nasabah
  const columnsNasabah = [
    {
      title: "No",
      width: 70,
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nama Nasabah",
      dataIndex: "namaLengkap",
      width: 200,
    },
    {
      title: "Email Nasabah",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      width: 300,
    },
    {
      title: "RT",
      dataIndex: "noRt",
      width: 70,
    },
    {
      title: "No. Handphone",
      dataIndex: "noHp",
      width: 200,
    },
    {
      title: "Tanggal Bergabung",
      dataIndex: "tanggalBergabung",
      width: 200,
      render: (text) => {
        const formattedDate = new Date(text).toLocaleDateString("id-ID");
        return <span>{formattedDate}</span>;
      },
    },
  ];

  // Tampilan PETUGAS pada kolom "Petugas"
  // Di dalam tabel Petugas akan ada penambahan kolom baru yaitu "Saldo" dan tombol "Hapus" user pengguna 
  const allColumnsPengurus =
    currentUser &&
    data &&
    Object.values(data).some(
      (user) => user.status === "Pengurus" && user.uid === currentUser.uid
    )
      ? [
          ...columnsPetugas,
          {
            title: "Saldo",
            dataIndex: "saldo",
            width: 150,
            render: (text) => {
              const formattedPrice = `Rp. ${parseInt(text).toLocaleString()}`;
              return <span>{formattedPrice}</span>;
            },
          },
          {
            title: "Aksi",
            dataIndex: rowKey,
            fixed: "right",
            width: 70,
            render: (key, record) => {
              return (
                <div>

                  {/* Tombol ini akan tampil pada ukuran layar LAPTOP atau KOMPUTER */}
                  {/* Dan akan menghilang jika ukuran layar kecil atau handphone  */}
                  <Button
                    type="primary"
                    danger
                    style={{ fontWeight: "bold", letterSpacing: "1px" }}
                    className="more btn-hapus-anggota-petugas-large"
                    onClick={(e) => handleDelete(e, record.namaLengkap)}
                  >
                    <DeleteOutlined /> Hapus
                  </Button>


                {/* Tombol ini akan tampil pada ukuran layar Kecil atau hanphone */}
                  {/* Dan akan menghilang jika ukuran layar LAPTOP atau KOMPUTER  */}
                  <Button
                    type="primary"
                    danger
                    style={{ fontWeight: "bold", letterSpacing: "1px" }}
                    className="more btn-hapus-anggota-petugas-small"
                    onClick={(e) => handleDelete(e, record.namaLengkap)}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              );
            },
          },
          
        ]
      : columnsPetugas;

      // Tampilan PETUGAS pada kolom "Nasabah"
  const allColumnsNasabah =
    currentUser &&
    data &&
    Object.values(data).some(
      (user) => user.status === "Pengurus" && user.uid === currentUser.uid
    )
      ? [
          ...columnsNasabah,
          {
            title: "Password Nasabah",
            dataIndex: "password",
            width: 200,
          },
          {
            title: "Saldo",
            dataIndex: "saldo",
            width: 150,
            render: (text) => {
              const formattedPrice = `Rp. ${parseInt(text).toLocaleString()}`;
              return <span>{formattedPrice}</span>;
            },
          },

          {
            title: "Aksi",
            dataIndex: rowKey,
            fixed: "right",
            width: 90,
            render: (key, record) => {
              return (
                <div>
                   {/* Tombol ini akan tampil pada ukuran layar LAPTOP atau KOMPUTER */}
                  {/* Dan akan menghilang jika ukuran layar kecil atau handphone  */}
                  <Button
                    type="primary"
                    danger
                    className="more btn-hapus-anggota-nasabah-large"
                    style={{ fontWeight: "bold", letterSpacing: "1px" }}
                    onClick={(e) => handleDelete(e, record.namaLengkap)}
                  >
                    <DeleteOutlined /> Hapus
                  </Button>

                {/* Tombol ini akan tampil pada ukuran layar Kecil atau hanphone */}
                  {/* Dan akan menghilang jika ukuran layar LAPTOP atau KOMPUTER  */}
                  <Button
                    type="primary"
                    danger
                    className="more btn-hapus-anggota-nasabah-small"
                    style={{ fontWeight: "bold", letterSpacing: "1px" }}
                    onClick={(e) => handleDelete(e, record.namaLengkap)}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              );
            },
            
          },
          
        ]
      : columnsNasabah;

  const anggotaData = Object.values(data).filter(
    (item) => item.status === "Nasabah"
  );
  const petugasData = Object.values(data).filter(
    (item) => item.status === "Pengurus"
  );
  const filteredPetugasData = petugasData.filter((item) =>
    item.namaLengkap.toLowerCase().includes(searchTermPetugas.toLowerCase())
  );
  const filteredAnggotaData = anggotaData.filter((item) =>
    item.namaLengkap.toLowerCase().includes(searchTermAnggota.toLowerCase())
  );

  return (
    <>
    {/* Jika terdapat data dengan status pengurus. Atau bacanya jika petugasData memiliki data lebih besar dari 0 (artinya data dengan status "pengurus" tersedia), maka tampilkan sejumlah data yang ada kedalam TABEL PENGURUS */}
      {petugasData.length > 0 && (
        <Col>
          <Divider orientation="left">List Pengurus</Divider>

          {/* Fitur pencarian nama Pengurus */}
          <Input
            placeholder="Cari nama petugas"
            value={searchTermPetugas}
            onChange={(e) => setSearchTermPetugas(e.target.value)}
            style={{ marginBottom: 16 }}
            prefix={<SearchOutlined className="site-form-item-icon" />}
          />
          <Table
            columns={allColumnsPengurus}
            dataSource={filteredPetugasData}
            scroll={{ x: windowWidth <= 1190 ? "100vw" : undefined }}
          />
        </Col>
      )}


      <Col>
        <Divider orientation="left">List Anggota</Divider>

        {/* Fitur pencarian nama Nasabah */}
        <Input
          placeholder="Cari nama nasabah"
          value={searchTermAnggota}
          onChange={(e) => setSearchTermAnggota(e.target.value)}
          style={{ marginBottom: 16 }}
          prefix={<SearchOutlined className="site-form-item-icon" />}
        />
        <Table
          columns={allColumnsNasabah}
          dataSource={filteredAnggotaData}
          scroll={{ x: windowWidth <= 1190 ? "100vw" : undefined }}
        />
      </Col>


{/* Ini adalah POP UP konfirmasi untuk menghapus data pengguna (Nasabah dan Petugas) */}
      <Modal
        title="Konfirmasi Hapus Anggota"
        visible={isModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleCancelDelete}
      >
        <p>Anda yakin ingin menghapus item ini?</p>
      </Modal>
    </>
  );
}

export default Anggota;