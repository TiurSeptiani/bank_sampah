import React from "react";
import { Col, Divider, Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";


function Anggota() {
	const { data } = useSelector((state) => state.dataNasabah)

	const columns = [
		{
			title: "No",
			width: 100,
			render: (text, record, index) => index + 1,
		},
		{
			title: "Nama Nasabah",
			dataIndex: "namaLengkap",
		},
		{
			title: "Alamat",
			dataIndex: "alamat",
		},
		{
			title: "RT",
			dataIndex: "noRt",
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
	return (
		<Col>
			<Divider orientation='left'>List Anggota</Divider>
			<Table columns={columns} dataSource={data ? Object.values(data) : []} scroll={{ x: 100 }} />
		</Col>
	);
}
export default Anggota;
