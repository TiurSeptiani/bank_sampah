import { SwapOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "./components/datatable";
import { useDispatch, useSelector } from "react-redux";
import { listDataPengguna } from "../../../store/reducers/registrasiUsers/registrasiUsersThunk";

const { Title } = Typography;
function Beranda({handleDeleteJenisSampah, loadingOnSubmit}) {
	const jenisSampah = useSelector((state) => state.jenisSampah);
	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(listDataPengguna())
		.unwrap()
		.then((response) => {
			console.log("RESPONSE", response);
		})
	}, [dispatch])

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
						key={data.title}
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
				<DataTable {...{handleDeleteJenisSampah, loadingOnSubmit, jenisSampah}} />
			</Col>
		</Row>
	);
}

export default Beranda;
