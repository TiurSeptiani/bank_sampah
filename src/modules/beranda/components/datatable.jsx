import React from "react";
import { Button, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DataTable = ({ hargaSampah, actions }) => {
	const rowKey = "idJenisSampah"

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
		// {
		// 	title: "Action",
		// 	key: "action",
		// 	width: 200,
		// 	render: (_, record) => (
		// 		<Space size='middle'>
		// 			<a>Hapus</a>
		// 		</Space>
		// 	),
		// },
	];

	const allColumns =
		actions && actions.length > 0
			? [
					...columns,
					{
						title: "Aksi",
						dataIndex: rowKey,
						fixed: "right",
						render: (key, record, e) => {
							return (
							
									<Button
										type='primary'
										className='more'
										ghost
										onClick={(e) => e.preventDefault()}
									>
										<DeleteOutlined /> Hapus
									</Button>
							
							);
						},
					},
			  ]
			: columns;

	return (
		<Table
			pagination={false}
			columns={allColumns}
			dataSource={Object.values(hargaSampah.data)}
			scroll={{ x: 100 }}
		/>
	);
};
export default DataTable;
