import React, { useState, useEffect } from "react";
import { Button, Card, Col, Empty, Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

function CardPenarikan({ handleDeleteDataTransaksi, formatCurrency }) {
  const { data } = useSelector((state) => state.dataTransaksi);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (key) => {
    setDeleteId(key);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteDataTransaksi(deleteId);
    setIsModalVisible(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setDeleteId(null);
  };

  // const formatCurrency = (amount) => {
  //   const formatter = new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   });
  //   return formatter.format(amount);
  // };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []); 

  const sortedData = data
    ? Object.entries(data)
        .map(([key, value]) => ({ key, ...value }))
        .sort((a, b) =>
          moment(b.tglPenarikan, "DD MMMM YYYY, HH:mm:ss").diff(
            moment(a.tglPenarikan, "DD MMMM YYYY, HH:mm:ss"),
            "seconds"
          )
        )
    : [];

  return (
    <div>
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Col
          span={20}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {isLoading ? (
            <Spin />
          ) : data ? (
            sortedData.length > 0 ? (
              sortedData.map((transaction) => (
                <Col key={transaction.key}>
                  <Card
                    style={{ backgroundColor: "#f7efe5" }}
                    hoverable
                    title={
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                        }}
                      >
                        <Col>{transaction.jenis}</Col>
                        <Button
                          htmlType="button"
                          onClick={() => handleDelete(transaction.key)}
                        >
                          <DeleteOutlined /> Hapus
                        </Button>
                      </span>
                    }
                    bordered={false}
                  >
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "20px",
                      }}
                    >
                      <Col>
                        <h1>{transaction.namaNasabah}</h1>
                        <h4>
                          <Col>
                            {moment(
                              transaction.tglPenarikan,
                              "DD MMMM YYYY, HH:mm"
                            ).format("DD MMMM YYYY, HH:mm")}
                          </Col>
                        </h4>
                      </Col>
                      <h2>{formatCurrency(transaction.jumlahPenarikan)}</h2>
                    </Col>
                  </Card>
                </Col>
              ))
            ) : (
              <Empty />
            )
          ) : (
            <Empty />
          )}
        </Col>
      </Col>
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
}

export default CardPenarikan;
