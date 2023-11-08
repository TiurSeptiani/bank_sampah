import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";

function DataTable() {
  const { data } = useSelector((state) => state.dataInventaris);
  
  const [sortedData, setSortedData] = useState(data ? Object.values(data) : []);

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
      title: "Bahan Sampah",
      dataIndex: "bahanSampah",
      width: 200,
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
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <a>Hapus</a>
        </Space>
      ),
    },
  ];

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
    <Table
      pagination={false}
      columns={columns}
      dataSource={sortedData}
      scroll={{ x: 100 }}
    />
  );
}

export default DataTable;
