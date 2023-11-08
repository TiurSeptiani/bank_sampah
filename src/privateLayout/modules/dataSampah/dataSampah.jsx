import { Card, Col, Divider, List, Table, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function DataSampah() {
  const { data } = useSelector((state) => state.dataInventaris);

  const { Title, Text } = Typography

  const groupedData = {};

  if (data) {
    Object.values(data).forEach((item) => {
      const { bahanSampah, beratSampah, harga, jenisSampah, namaNasabah, satuan } = item;

      if (!groupedData[bahanSampah]) {
        groupedData[bahanSampah] = [];
      }

      groupedData[bahanSampah].push({ bahanSampah, beratSampah, harga, jenisSampah, namaNasabah, satuan });
    });
  }

  const columns = [
    {
      title: "Jenis Sampah",
      dataIndex: "jenisSampah",
      key: "jenisSampah",
    },
    {
      title: "Nama Nasabah",
      dataIndex: "namaNasabah",
      key: "namaNasabah",
    },
    {
      title: "Satuan",
      dataIndex: "satuan",
      key: "satuan",
    },
    {
      title: "Berat",
      dataIndex: "beratSampah",
      key: "beratSampah",
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
    },
  ];

  return (
    <div>
      {Object.keys(groupedData).map((bahanSampah) => (
        <div key={bahanSampah}>
          <Divider orientation="left">{bahanSampah}</Divider>
          <Table
            columns={columns}
            dataSource={groupedData[bahanSampah]}
            footer={() => (
              <Col>
                 <Title level={5}>Total Harga:  <Text keyboard>Rp.{groupedData[bahanSampah].reduce((acc, item) => acc + parseInt(item.harga), 0).toFixed(2)}</Text> </Title>
                <Title level={5}>Total Berat:  <Text keyboard> {groupedData[bahanSampah].reduce((acc, item) => acc + parseInt(item.beratSampah), 0).toFixed(2)} Kilogram</Text></Title>
              </Col>
            )}
          />
        </div>
      ))}
    </div>
  );
}

export default DataSampah;
