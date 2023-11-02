import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
	{
		title: "No",
		width: 10,
		render: (text, record, index) => index + 1,
	},
	{
		title: "Nama Nasabah",
		dataIndex: "namaNasabah",
	},
	{
		title: "Bahan Sampah",
		dataIndex: "bahanSampah",
	},
	{
		title: "Jenis Sampah",
		dataIndex: "jenisSampah",
	},
	{
		title: "Berat Sampah",
		dataIndex: "beratSampah",
	},
	{
		title: "Satuan",
		dataIndex: "satuan",
	},
	{
		title: "Harga",
		dataIndex: "harga",
		width: 150
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
const data = [
	{
		namaNasabah: "Maman",
		bahanSampah: "Plastik",
        jenisSampah: "Karung",
        beratSampah: "5",
        satuan: "Kg",
        harga: "5000"
	},
	{
		namaNasabah: "Imron",
		bahanSampah: "Plastik",
        jenisSampah: "Toples",
        beratSampah: "2",
        satuan: "Kg",
        harga: "3000"
	},
	{
		namaNasabah: "Markonah",
		bahanSampah: "Logam",
        jenisSampah: "kaleng",
        beratSampah: "1",
        satuan: "Kg",
        harga: "1000"
	},
	
];
const DataTable = () => (
	<Table pagination={false} columns={columns} dataSource={data} scroll={{ x: 100 }} />
);
export default DataTable;
