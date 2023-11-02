import { SwapOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row, Space, Table, Typography } from "antd";
import React from "react";
import DataTable from "./components/datatable";
import { useSelector } from "react-redux";

const { Title } = Typography;
function Beranda({actions}) {
	const hargaSampah = useSelector((state) => state.hargaSampah);
	// console.log("HARGA SAMPAH", hargaSampah.data);

	const dataCard = [
		{
			title: "Jumlah Nasabah",
			dataIndex: 23,
			icon: <TeamOutlined />,
		},
		{
			title: "Jumlah Transaksi",
			dataIndex: 19,
			icon: <SwapOutlined />,
		},
		{
			title: "Jumlah Petugas",
			dataIndex: 9,
			icon: <TeamOutlined />,
		},
	];

	return (
		<Row>
			<Col span={24} className='container'>
				{dataCard.map((data, Index) => (
					<Card
						key={data.dataIndex}
						hoverable
						title={
							<span style={{ color: "#001529" }}>
								{data.title}
							</span>
						}
						size='middle'
						className='card'
					>
						<Col className='card-content'>
							<Col>
								<Title>{data.dataIndex}</Title>
							</Col>
							<Col className='icon'>
								<Title level={1}>{data.icon}</Title>
							</Col>
						</Col>
					</Card>
				))}
			</Col>

			<Col span={24} className='datatable mt-5'>
				<Divider orientation='left'>List Update Harga Sampah</Divider>
				<DataTable hargaSampah={hargaSampah} actions={actions} />
			</Col>
		</Row>
	);
}

export default Beranda;
