import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
	{
		title: "No",
		width: 100,
		render: (text, record, index) => index + 1,
	},
	{
		title: "Nama Jenis Sampah",
		dataIndex: "namaJenisSampah",
	},
	{
		title: "Harga",
		dataIndex: "harga",
	},
	{
		title: "Action",
		key: "action",
        width: 200,
		render: (_, record) => (
			<Space size='middle'>
				<a>Edit</a>
				<a>hapus</a>
			</Space>
		),
	},
];
const data = [
	{
		namaJenisSampah: "Botol",
		harga: "10.000"
	},
	{
		namaJenisSampah: "Kaleng",
		harga: "1000"
	},
	{
		namaJenisSampah: "Kertas",
        harga: "500"
	},
];
const DataTable = () => (
	<Table columns={columns} dataSource={data} scroll={{ x: 100 }} />
);
export default DataTable;
