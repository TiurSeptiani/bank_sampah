import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

function DataTable({handleDeleteDataSampah}) {
  const { data } = useSelector((state) => state.dataInventaris);
  const [sortedData, setSortedData] = useState(
    data ? Object.values(data) : []
  );
  const rowKey = "idBahanSampah";
  const { currentUser } = useSelector((state) => state.auth);
  const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      width: 10,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nama Nasabah",
      dataIndex: "namaNasabah",
      width: 300,
    },
    {
      title: "Jenis Sampah",
      dataIndex: "jenisSampah",
      width: 200,
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
            width: 70,
            render: (key, record) => {
              return (
                <div>
                  <Button
                    type='primary'
                    className='more'
                    ghost
                    onClick={(e) =>
                      handleDelete(e, record.namaNasabah)
                    }
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
        // scroll={{ x: 10 }}
      />
      <Modal
        title='Konfirmasi Hapus'
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
