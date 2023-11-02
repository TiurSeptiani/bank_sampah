import React from "react";
import { Col, Divider, Space, Table, Tag } from "antd";
const columns = [
	{
		title: "No",
		width: 100,
		render: (text, record, index) => index + 1,
	},
	{
		title: "Nama Nasabah",
		dataIndex: "namaNasabah",
	},
	{
		title: "Alamat",
		dataIndex: "alamat",
	},
	{
		title: "RT",
		dataIndex: "rt",
	},
	{
		title: "No. Handphone",
		dataIndex: "noHp",
	},
	{
		title: "Tanggal Bergabung",
		dataIndex: "tanggalBergabung",
	},
];
const data = [
	{
		namaNasabah: "Suparman",
		alamat: "Klitren Lor",
		rt: "17",
		noHp: "08123",
		tanggalBergabung: "10 - Oktober - 2023",
	},
	{
		namaNasabah: "Suparlan",
		alamat: "Klitren Lor",
		rt: "16",
		noHp: "0812223",
		tanggalBergabung: "5 - Oktober - 2023",
	},
	{
		namaNasabah: "Ame Takajut",
		alamat: "Klitren Lor",
		rt: "11",
		noHp: "08321",
		tanggalBergabung: "1 - Oktober - 2023",
	},
];
const Anggota = () => (
	<Col>
		<Divider orientation='left'>List Anggota</Divider>
		<Table columns={columns} dataSource={data} scroll={{ x: 100 }} />
	</Col>
);
export default Anggota;
