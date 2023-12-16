import { SwapOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "./components/datatable";
import { useSelector } from "react-redux";

const { Title } = Typography;
function Beranda({ handleDeleteJenisSampah, loadingOnSubmit }) {
	// Pada saat 

	const jenisSampah = useSelector((state) => state.jenisSampah);
	const dataNasabah = useSelector((state) => state.dataNasabah.data);
	const dataTransaksi = useSelector((state) => state.dataTransaksi.data);
	const [totalTransaksi, setTotalTransaksi] = useState(0);

	const hitungNasabah = Object.values(dataNasabah).filter(
		(user) => user.status === "Nasabah"
	).length;
	const hitungPengurus = Object.values(dataNasabah).filter(
		(user) => user.status === "Pengurus"
	).length;


	// useEffect berfungsi untuk memicu apapun yang ada di dalamnya, useEffect akan berjalan ketika component yang memilikinya di jalankan.
    useEffect(() => {
		
		// Disini kita akan menghitung total transaksi yang masuk, dengan cara mengecek API dataTransaksi.
		// Bacanya seperti ini : jika "dataTransaksi" ada ?
        if (dataTransaksi) {

			// Jika "dataTransaksi" ada, maka hitung totalnya, dan masukkan hasil totalnya ke dalam "setTotalTransaksi"
            setTotalTransaksi(Object.keys(dataTransaksi).length);
        }
    }, [dataTransaksi])


	// Disini adalah informasi jumlah nasabah, pengurus dan transaksi
	const dataCard = [
		{
			title: "Jumlah Nasabah",
			dataIndex: hitungNasabah,
			icon: <TeamOutlined />,
		},
		{
			title: "Jumlah Transaksi",
			dataIndex: totalTransaksi,
			icon: <SwapOutlined />,
		},
		{
			title: "Jumlah Pengurus",
			dataIndex: hitungPengurus,
			icon: <TeamOutlined />,
		},
	];

	return (
		<Row>
			<Col span={24} className='container'>

				{/* Kemudian disini kita lakukan maping atau pemetaan atau looping sejumlah data yang ada di dalam variabel "dataCard" di atas */}
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

			{/* Ini adalah Table data dari semua jenis sampah */}
			{/* Didalamnya mengirim : handleDeleteSampah(Hapus Sampah), loadingOnSubmit(Untuk menangani loading pada button), dan data seluruh jenis sampah (jenisSampah) */}
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
