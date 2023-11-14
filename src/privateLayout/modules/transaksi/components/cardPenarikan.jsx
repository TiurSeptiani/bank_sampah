import React, { useState } from "react";
import { Button, Card, Col, Empty, Modal } from "antd";
import { useSelector } from "react-redux";

function CardPenarikan({ handleDeleteDataTransaksi }) {
  const { data } = useSelector((state) => state.dataTransaksi);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = (key) => {
    setDeleteId(key);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Panggil fungsi handleDeleteDataTransaksi dengan deleteId
    handleDeleteDataTransaksi(deleteId);

    // Setelah menghapus, tutup modal dan reset deleteId
    setIsModalVisible(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    // Jika pembatalan, tutup modal dan reset deleteId
    setIsModalVisible(false);
    setDeleteId(null);
  };

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
          {data ? (
            Object.keys(data).map((key) => (
              <Col key={key}>
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
                      <Col>{data[key].jenis}</Col>
                      <Button htmlType='button' onClick={() => handleDelete(key)}>
                        Hapus
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
                      <h1>{data[key].namaNasabah}</h1>
                      <h4>
                        <Col>{data[key].tglPenarikan}</Col>
                      </h4>
                    </Col>
                    <h2>Rp. {data[key].jumlahPenarikan}</h2>
                  </Col>
                </Card>
              </Col>
            ))
          ) : (
            <Empty />
          )}
        </Col>
      </Col>
      <Modal
        title='Konfirmasi Hapus'
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
