import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Empty, Modal, Table, Typography } from "antd";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

function DataSampah({ handleDeleteDataSampah }) {
  const dataInventaris = useSelector((state) => state.dataInventaris);
  const { data } = useSelector((state) => state.dataNasabah);
  const { currentUser } = useSelector((state) => state.auth);
  const rowKey = "idBahanSampah";
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

  const { Title, Text } = Typography;
  const groupedData = {};
  if (dataInventaris.data) {
    Object.values(dataInventaris.data).forEach((item) => {
      const {
        bahanSampah,
        beratSampah,
        harga,
        jenisSampah,
        namaNasabah,
        satuan,
        tglSetor,
      } = item;

      const formattedMonth = new Date(tglSetor).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      });

      if (!groupedData[formattedMonth]) {
        groupedData[formattedMonth] = {};
      }

      if (!groupedData[formattedMonth][bahanSampah]) {
        groupedData[formattedMonth][bahanSampah] = [];
      }

      groupedData[formattedMonth][bahanSampah].push({
        bahanSampah,
        beratSampah,
        harga,
        jenisSampah,
        namaNasabah,
        satuan,
        tglSetor,
      });
    });
  }

  const handleDelete = (e, namaNasabah) => {
    e.preventDefault();
    const id = Object.keys(dataInventaris.data).find(
      (key) => dataInventaris.data[key].namaNasabah === namaNasabah
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
      title: "Jenis Sampah",
      dataIndex: "jenisSampah",
      key: "jenisSampah",
      width: 200,
    },
    {
      title: "Nama Nasabah",
      dataIndex: "namaNasabah",
      key: "namaNasabah",
      width: 200,
    },
    {
      title: "Satuan",
      dataIndex: "satuan",
      key: "satuan",
      width: 200,
    },
    {
      title: "Berat",
      dataIndex: "beratSampah",
      key: "beratSampah",
      width: 100,
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
      width: 200,
      render: (text) => {
        const formattedPrice = `Rp. ${parseInt(text).toLocaleString()}`;
        return <span>{formattedPrice}</span>;
      },
    },
    {
      title: "Tanggal Setor",
      dataIndex: "tglSetor",
      key: "tglSetor",
      width: 250,
      render: (text) => {
        const formattedDate = new Date(text).toLocaleDateString("id-ID");
        return <span>{formattedDate}</span>;
      },
    },
  ];

  const allColumns =
    currentUser &&
    data &&
    Object.values(data).some(
      (user) => user.status === "Pengurus" && user.uid === currentUser.uid
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
                    danger
                    className="more btn-hapus-data-sampah-large"
                    style={{fontWeight: "bold", letterSpacing: "1px"}}
                    onClick={(e) => handleDelete(e, record.namaNasabah)}
                  >
                    <DeleteOutlined /> Hapus
                  </Button>
                  <Button
                    type="primary"
                    danger
                    className="more btn-hapus-data-sampah-small"
                    style={{fontWeight: "bold", letterSpacing: "1px"}}
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

  return (
    <div>
      {dataInventaris.data ? (
        Object.keys(groupedData).map((month) => (
          <div
            key={month}
            style={{
              marginBottom: "250px",
              padding: "20px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px", borderRadius: "8px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Title level={3}>Waktu setoran: {month}</Title>
            </div>
            {Object.keys(groupedData[month]).map((bahanSampah) => (
              <div key={bahanSampah} style={{ marginBottom: "100px" }}>
                <Divider orientation="left">{bahanSampah}</Divider>
                <Table
                  pagination={false}
                  columns={allColumns}
                  dataSource={groupedData[month][bahanSampah]}
                  scroll={{ x: windowWidth <= 1190 ? "100vw" : undefined }}
                  footer={() => (
                    <Col>
                      <Title level={5}>
                        Total Harga:{" "}
                        <Text keyboard>
                          Rp{" "}
                          {groupedData[month][bahanSampah]
                            .reduce(
                              (acc, item) => acc + parseInt(item.harga),
                              0
                            )
                            .toLocaleString("id-ID")}
                        </Text>
                      </Title>
                      <Title level={5}>
                        Total Berat:{" "}
                        <Text keyboard>
                          {" "}
                          {groupedData[month][bahanSampah]
                            .reduce(
                              (acc, item) => acc + parseFloat(item.beratSampah),
                              0
                            )
                            .toLocaleString("id-ID")}{" "}
                          Kilogram
                        </Text>
                      </Title>
                    </Col>
                  )}
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
            ))}
          </div>
        ))
      ) : (
        <div
          style={{
            height: "75vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Empty />
        </div>
      )}
    </div>
  );
}

export default DataSampah;
