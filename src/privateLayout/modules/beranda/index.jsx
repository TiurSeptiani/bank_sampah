import { SwapOutlined, TeamOutlined } from "@ant-design/icons";
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

	const countNasabah = Object.values(dataNasabah).filter(
		(user) => user.status === "Nasabah"
	).length;
	const countPetugas = Object.values(dataNasabah).filter(
		(user) => user.status === "Petugas"
	).length;


    useEffect(() => {
		
        if (dataTransaksi) {
            setTotalTransaksi(Object.keys(dataTransaksi).length);
        }
    }, [dataTransaksi])


	const dataCard = [
		{
			title: "Jumlah Nasabah",
			dataIndex: countNasabah,
			icon: <TeamOutlined />,
		},
		{
			title: "Jumlah Transaksi",
			dataIndex: totalTransaksi,
			icon: <SwapOutlined />,
		},
		{
			title: "Jumlah Petugas",
			dataIndex: countPetugas,
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
