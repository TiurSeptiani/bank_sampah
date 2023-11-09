import React, { useState } from "react";
import { Button, Col, Divider, Input, Modal, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

function Anggota({ handleDeletePengguna, loadingOnSubmit }) {
  const { data } = useSelector((state) => state.dataNasabah);

  const dispatch = useDispatch();
  const rowKey = "namaLengkap";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchTermPetugas, setSearchTermPetugas] = useState("");
  const [searchTermAnggota, setSearchTermAnggota] = useState("");

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

  const columns = [
    {
      title: "No",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nama Nasabah",
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
              type='primary'
              className='more'
              ghost
              onClick={(e) => handleDelete(e, record.namaLengkap)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const anggotaData = Object.values(data).filter(
    (item) => item.status === "Nasabah"
  );
  const petugasData = Object.values(data).filter(
    (item) => item.status === "Petugas"
  );

  const filteredPetugasData = petugasData.filter(
    (item) =>
      item.namaLengkap.toLowerCase().includes(searchTermPetugas.toLowerCase())
  );

  const filteredAnggotaData = anggotaData.filter(
    (item) =>
      item.namaLengkap.toLowerCase().includes(searchTermAnggota.toLowerCase())
  );

  return (
    <>
      {petugasData.length > 0 && (
        <Col>
          <Divider orientation='left'>List Petugas</Divider>
          <Input
            placeholder="Search by Nama Lengkap"
            value={searchTermPetugas}
            onChange={(e) => setSearchTermPetugas(e.target.value)}
            style={{ marginBottom: 16 }}
			prefix={<SearchOutlined className='site-form-item-icon' />}
          />
          <Table
            columns={columns}
            dataSource={filteredPetugasData}
            scroll={{ x: 100 }}
          />
        </Col>
      )}

      <Col>
        <Divider orientation='left'>List Anggota</Divider>
        <Input
          placeholder="Search by Nama Lengkap"
          value={searchTermAnggota}
          onChange={(e) => setSearchTermAnggota(e.target.value)}
          style={{ marginBottom: 16 }}
		  prefix={<SearchOutlined className='site-form-item-icon' />}
        />
        <Table
          columns={columns}
          dataSource={filteredAnggotaData}
          scroll={{ x: 100 }}
        />
      </Col>

      <Modal
        title='Konfirmasi Hapus Anggota'
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
