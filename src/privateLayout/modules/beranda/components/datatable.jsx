import React, { useEffect, useState } from "react";
import { Button, Space, Table, Input, Col, Empty, Modal } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { listDataPengguna } from "../../../../store/reducers/registrasiUsers/registrasiUsersThunk";

const DataTable = ({
  jenisSampah,
  handleDeleteJenisSampah,
  loadingOnSubmit,
}) => {
  const rowKey = "idJenisSampah";
  const [loadingHapus, setLoadingHapus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.dataNasabah);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const showDeleteModal = (id) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const handleDeleteClick = (e, namaJenisSampah) => {
    e.preventDefault();
    const id = Object.keys(jenisSampah.data).find(
      (key) => jenisSampah.data[key].namaJenisSampah === namaJenisSampah
    );
    if (id) {
      showDeleteModal(id);
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteJenisSampah(deleteId);
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "No",
      width: 70,
      fixed: "left",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Nama Jenis Sampah",
      dataIndex: "namaJenisSampah",
      width: 200,
    },
    {
      title: "Harga",
      dataIndex: "hargaJenisSampah",
      width: 200,
      render: (text) => {
        const formattedPrice = `Rp. ${parseInt(text).toLocaleString()}`;
        return <span>{formattedPrice}</span>;
      },
    },
    {
      title: "Satuan",
      dataIndex: "satuan",
      width: 100,
    },
  ];
  const allColumns =
    currentUser &&
    data &&
    Object.values(data).some(
      (user) => user.status === "Petugas" && user.uid === currentUser.uid
    )
      ? [
          ...columns,
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
                    onClick={(e) =>
                      handleDeleteClick(e, record.namaJenisSampah)
                    }
                  >
                    <DeleteOutlined /> Hapus
                  </Button>
                </div>
              );
            },
          },
        ]
      : columns;

  const filteredData = jenisSampah.data
    ? Object.values(jenisSampah.data).filter((item) =>
        item.namaJenisSampah.toLowerCase().startsWith(searchText.toLowerCase())
      )
    : [];

  return (
    <div>
      <Col style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Col span={20} style={{marginRight: "10px"}}>
          <Input
            prefix={<SearchOutlined className="site-form-item-icon" />}
            placeholder="Cari Nama Jenis Sampah"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </Col>
        <Col span={3}>
          <Button type="primary">Tambah Jenis Sampah</Button>
        </Col>
      </Col>

      <Table
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredData.length,
          onChange: (current) => {
            setPagination({ ...pagination, current });
          },
        }}
        columns={allColumns}
        dataSource={filteredData.slice(
          (pagination.current - 1) * pagination.pageSize,
          pagination.current * pagination.pageSize
        )}
        scroll={{ x: 100 }}
      />

      <Modal
        title="Konfirmasi Hapus"
        visible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Anda yakin ingin menghapus item ini?</p>
      </Modal>
    </div>
  );
};

export default DataTable;
