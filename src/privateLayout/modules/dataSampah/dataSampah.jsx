import { Divider, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function DataSampah() {
 const { data } = useSelector((state) => state.dataInventaris);
 console.log("DATA", data);

 // Membuat objek kosong untuk mengelompokkan berdasarkan bahanSampah
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
          <Divider orientation='left'>{bahanSampah}</Divider>
          <Table columns={columns} dataSource={groupedData[bahanSampah]} />
        </div>
      ))}
    </div>
 );
}

export default DataSampah;