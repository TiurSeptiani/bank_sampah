import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';

function DataTableTotal() {
  const { data } = useSelector((state) => state.dataInventaris);

  const getAggregatedData = () => {
    if (!data) return [];
    const aggregatedData = {};
    Object.values(data).forEach((item) => {
      const { namaNasabah, harga, beratSampah } = item;
      if (!aggregatedData[namaNasabah]) {
        aggregatedData[namaNasabah] = {
          namaNasabah,
          totalHarga: 0,
          totalBerat: 0,
        };
      }
      aggregatedData[namaNasabah].totalHarga += harga;
      aggregatedData[namaNasabah].totalBerat += parseFloat(beratSampah);
    });
    const sortedAggregatedData = Object.values(aggregatedData).sort(
      (a, b) => b.totalHarga - a.totalHarga
    );
    return sortedAggregatedData;
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
      title: "Total Harga Setoran",
      dataIndex: "totalHarga",
      width: 200,
    },
    {
      title: "Total Berat Setoran",
      dataIndex: "totalBerat",
      width: 200,
    },
  ];

  return (
    <div>
      <Table dataSource={getAggregatedData()} columns={columns} pagination={false} />
    </div>
  );
}

export default DataTableTotal;
