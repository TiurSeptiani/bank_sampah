import React, { useState } from "react";
import { Button, Col, Divider, Input, Modal, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

function Anggota({ handleDeletePengguna, loadingOnSubmit }) {
  const { data } = useSelector((state) => state.dataNasabah);

  const rowKey = "namaLengkap";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchTermPetugas, setSearchTermPetugas] = useState("");
  const [searchTermAnggota, setSearchTermAnggota] = useState("");

  const { currentUser } = useSelector((state) => state.auth);

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
      width: 70,
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nama Petugas",
      dataIndex: "namaLengkap",
      width: 200,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      width: 200,
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
        const formattedDate = new Date(text).toLocaleDateString("id-ID")
        return <span>{formattedDate}</span>
      }
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
      title: "Password Nasabah",
      dataIndex: "password",
      width: 200,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      width: 200,
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
        const formattedDate = new Date(text).toLocaleDateString("id-ID")
        return <span>{formattedDate}</span>
      }
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
  ];

  const allColumnsPetugas =
    currentUser &&
    data &&
    Object.values(data).some(
      (user) => user.status === "Petugas" && user.uid === currentUser.uid
    )
      ? [
          ...columnsPetugas,
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
                    className="more"
                    ghost
                    onClick={(e) => handleDelete(e, record.namaLengkap)}
                  >
                    <DeleteOutlined /> Hapus
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
      (user) => user.status === "Petugas" && user.uid === currentUser.uid
    )
      ? [
          ...columnsNasabah,

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
                    className="more"
                    ghost
                    onClick={(e) => handleDelete(e, record.namaLengkap)}
                  >
                    <DeleteOutlined /> Hapus
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
    (item) => item.status === "Petugas"
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
          <Divider orientation="left">List Petugas</Divider>
          <Input
            placeholder="Cari nama petugas"
            value={searchTermPetugas}
            onChange={(e) => setSearchTermPetugas(e.target.value)}
            style={{ marginBottom: 16 }}
            prefix={<SearchOutlined className="site-form-item-icon" />}
          />
          <Table
            columns={allColumnsPetugas}
            dataSource={filteredPetugasData}
            scroll={{ x: "100vw" }}
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
          scroll={{ x: "100vw" }}
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
