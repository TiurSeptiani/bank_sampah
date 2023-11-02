import React from "react";
import { Space, Table } from "antd";

const DataTable = ({ hargaSampah }) => {
	const columns = [
		{
			title: "No",
			width: 100,
			render: (text, record, index) => index + 1,
		},
		{
			title: "Nama Jenis Sampah",
			dataIndex: "jenis",
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
					<a>Hapus</a>
				</Space>
			),
		},
	];

	// const allColumns = {
		
	// }

	return (
		<Table
			pagination={false}
			columns={columns}
			dataSource={Object.values(hargaSampah.data)}
			scroll={{ x: 100 }}
		/>
	);
};
export default DataTable;
