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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDelete = (e, namaLengkap) => {
    e.preventDefault();
    const id = Object.keys(data).find(
      (key) => data[key].namaLengkap === namaLengkap
    );
    if (id) {
      showDeleteModal(id);
    }
  };

  const showDeleteModal = (id) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    handleDeletePengguna(deleteId);
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

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
                  <Button
                    type="primary"
                    danger
                    style={{ fontWeight: "bold", letterSpacing: "1px" }}
                    className="more btn-hapus-anggota-petugas-large"
                    onClick={(e) => handleDelete(e, record.namaLengkap)}
                  >
                    <DeleteOutlined /> Hapus
                  </Button>

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
                  <Button
                    type="primary"
                    danger
                    className="more btn-hapus-anggota-nasabah-large"
                    style={{ fontWeight: "bold", letterSpacing: "1px" }}
                    onClick={(e) => handleDelete(e, record.namaLengkap)}
                  >
                    <DeleteOutlined /> Hapus
                  </Button>

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
      {petugasData.length > 0 && (
        <Col>
          <Divider orientation="left">List Pengurus</Divider>
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