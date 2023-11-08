import React from "react";
import { Col, Divider, Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";


function Anggota() {
	const { data } = useSelector((state) => state.dataNasabah);
  
	console.log("DATA", data);
  
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
  
	// Pisahkan data "Petugas" dan "Anggota"
	const anggotaData = Object.values(data).filter((item) => item.status === "Nasabah");
	const petugasData = Object.values(data).filter((item) => item.status === "Petugas");
  
	return (
	  <>
		{/* List Petugas */}
		{petugasData.length > 0 && (
		  <Col>
			<Divider orientation="left">List Petugas</Divider>
			<Table columns={columns} dataSource={petugasData} scroll={{ x: 100 }} />
		  </Col>
		)}
  
		{/* List Anggota */}
		<Col>
		  <Divider orientation="left">List Anggota</Divider>
		  <Table columns={columns} dataSource={anggotaData} scroll={{ x: 100 }} />
		</Col>
	  </>
	);
  }
  
  export default Anggota;
  
