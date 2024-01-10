import { SwapOutlined, TeamOutlined, WalletOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "./components/datatable";
import { useSelector } from "react-redux";

const { Title } = Typography;
function Beranda({ handleDeleteJenisSampah, loadingOnSubmit }) {

	const jenisSampah = useSelector((state) => state.jenisSampah);
	const dataNasabah = useSelector((state) => state.dataNasabah.data);
	const dataTransaksi = useSelector((state) => state.dataTransaksi.data);
	const [totalTransaksi, setTotalTransaksi] = useState(0);
	const { currentUser } = useSelector((state) => state.auth);
	const { data: administrasi } = useSelector((state) => state.administrasi);

	const harga = Object.keys(administrasi)[0] &&
		administrasi[Object.keys(administrasi)[0]].saldo.toLocaleString("id-ID")

	const hitungNasabah = Object.values(dataNasabah).filter(
		(user) => user.status === "Nasabah"
	).length;

	// const hitungPengurus = Object.values(dataNasabah).filter(
	// 	(user) => user.status === "Pengurus"
	// ).length;


	const isNasabah = Object.values(dataNasabah).find(
		(user) => user.status === "Nasabah" && user.uid === currentUser.uid
	);


	useEffect(() => {

		if (dataTransaksi) {

			setTotalTransaksi(Object.keys(dataTransaksi).length);
		}
	}, [dataTransaksi])


	const dataCard = [
		{
			title: "Jumlah Transaksi",
			dataIndex: totalTransaksi,
			icon: <SwapOutlined />,
		},
		{
			title: isNasabah ? 'Tabungan' : 'Saldo Bank Sampah',
			dataIndex: isNasabah ? 'Rp ' + isNasabah.saldo.toLocaleString("id-ID") : 'Rp ' + harga,
			icon: <WalletOutlined />,
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
				<Divider orientation='left'>List Jenis Sampah</Divider>

				<DataTable
					{...{
						handleDeleteJenisSampah,
						loadingOnSubmit,
						jenisSampah,
					}}
				/>
			</Col>
		</Row>
	);
}

export default Beranda;
