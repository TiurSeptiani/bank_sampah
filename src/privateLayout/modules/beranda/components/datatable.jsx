import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { datatableHargaSampah } from "../../../../store/reducers/hargaSampah/hargaSampahThunk";

const DataTable = ({ jenisSampah, handleDeleteJenisSampah, loadingOnSubmit }) => {
	const rowKey = "idJenisSampah";
	const [loadingHapus, setLoadingHapus] = useState(false);
	const dispatch = useDispatch()

	const { data } = useSelector((state) => state.dataNasabah);

	const handleDeleteClick = (e, namaJenisSampah) => {
		e.preventDefault();
		const id = Object.keys(hargaSampah.data).find(
		  (key) => hargaSampah.data[key].namaJenisSampah === namaJenisSampah
		);
		if (id) {
		  handleDeleteJenisSampah(id)
		  setLoadingHapus(true)
		  
		}
	  };
	  

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
			dataIndex: "hargaJenisSampah",
		},
		{
			title: "Satuan",
			dataIndex: "satuan",
		},
		{
			title: "Aksi",
			dataIndex: rowKey,
			fixed: "right",
			render: (key, record) => {
				return (
					<Button
						type='primary'
						className='more'
						ghost
						onClick={(e) =>
							handleDeleteClick(e, record.namaJenisSampah)
						}
						
					>
						<DeleteOutlined /> Hapus
					</Button>
				);
			},
		},
	];

	// const allColumns = data.status == "Petugas" ? [
	// 	...columns,
	// 	{
	// 		title: "Aksi",
	// 		dataIndex: rowKey,
	// 		fixed: "right",
	// 		render: (key, record) => {
	// 			return (
	// 				<Button
	// 					type='primary'
	// 					className='more'
	// 					ghost
	// 					onClick={(e) =>
	// 						handleDeleteClick(e, record.namaJenisSampah)
	// 					}
						
	// 				>
	// 					<DeleteOutlined /> Hapus
	// 				</Button>
	// 			);
	// 		},
	// 	},
	// ] : columns

	

	return (
		<Table
			pagination={false}
			columns={columns}
			dataSource={jenisSampah.data ? Object.values(jenisSampah.data) : []}
			scroll={{ x: 100 }}
		/>
	);
};
export default DataTable;
