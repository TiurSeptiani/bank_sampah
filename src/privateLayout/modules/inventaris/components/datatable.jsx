import React from "react";
import { Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";

function DataTable() {
	const { data } = useSelector((state) => state.dataInventaris);

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
				<Space size='middle'>
					<a>Hapus</a>
				</Space>
			),
		},
	];

	return (
		<Table
			pagination={false}
			columns={columns}
			dataSource={data ? Object.values(data) : []}
			scroll={{ x: 100 }}
		/>
	);
}
export default DataTable;
