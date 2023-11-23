import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

function DataTable({ handleDeleteDataSampah }) {
  const { data } = useSelector((state) => state.dataInventaris);
  const [sortedData, setSortedData] = useState(data ? Object.values(data) : []);
  const rowKey = "idBahanSampah";
  const { currentUser } = useSelector((state) => state.auth);
  const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const handleDelete = (e, namaNasabah) => {
    e.preventDefault();
    const id = Object.keys(data).find(
      (key) => data[key].namaNasabah === namaNasabah
    );
    if (id) {
      showDeleteModal(id);
    }
  };

  const showDeleteModal = (id) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteDataSampah(deleteId);
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
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nama Nasabah",
      dataIndex: "namaNasabah",
      width: 200,
    },
    {
      title: "Jenis Sampah",
      dataIndex: "jenisSampah",
      width: 200,
    },
    {
      title: "Tanggal Setoran",
      dataIndex: "tglSetor",
      width: 250,
      render: (text) => {
        const date = new Date(text);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        const formattedDateTime = date.toLocaleString("id-ID", options);
        return <span>{formattedDateTime}</span>;
      },
    },
    {
      title: "Berat Sampah",
      dataIndex: "beratSampah",
      width: 180,
    },
    {
      title: "Satuan",
      dataIndex: "satuan",
      width: 200,
    },
    {
      title: "Harga",
      dataIndex: "harga",
      width: 250,
      render: (text) => {
        const formattedPrice = `Rp. ${parseInt(text).toLocaleString()}`;
        return <span>{formattedPrice}</span>;
      },
    },
  ];

  const allColumns =
    currentUser &&
    data &&
    Object.values(dataNasabah).some(
      (user) => user.status === "Petugas" && user.uid === currentUser.uid
    )
      ? [
          ...columns,
          {
            title: "Aksi",
            dataIndex: rowKey,
            fixed: "right",
            width: 100,
            render: (key, record) => {
              return (
                <div>
                  <Button
                    type="primary"
                    danger
                    style={{fontWeight: "bold", letterSpacing: "1px"}}
                    className="more btn-hapus-inventaris-large"
                    onClick={(e) => handleDelete(e, record.namaNasabah)}
                  >
                    <DeleteOutlined /> Hapus
                  </Button>
                  <Button
                    type="primary"
                    danger
                    style={{fontWeight: "bold", letterSpacing: "1px"}}
                    className="more btn-hapus-inventaris-small"
                    onClick={(e) => handleDelete(e, record.namaNasabah)}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              );
            },
          },
        ]
      : columns;

  useEffect(() => {
    if (data) {
      const newData = Object.values(data);
      newData.sort((a, b) => {
        return new Date(b.tglSetor) - new Date(a.tglSetor);
      });
      setSortedData(newData);
    }
  }, [data]);

  return (
    <>
      <Table
        pagination={false}
        columns={allColumns}
        dataSource={sortedData}
        scroll={{ x: windowWidth <= 1190 ? "100vw" : undefined }}
      />
      <Modal
        title="Konfirmasi Hapus"
        visible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Anda yakin ingin menghapus item ini?</p>
      </Modal>
    </>
  );
}

export default DataTable;
