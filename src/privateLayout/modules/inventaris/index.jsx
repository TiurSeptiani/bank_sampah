import { Button, Col, Divider, Form, Input, Select } from "antd";
import React, { useState } from "react";
import DataTable from "./components/datatable";
import "../../../styles/inventaris/inventaris.css";
import { useSelector } from "react-redux";
import moment from "moment";

function Inventaris({ createDataInventaris, loadingOnSubmit }) {
	const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
	const { data: dataSampah } = useSelector((state) => state.dataSampah);
	const [selectedBahan, setSelectedBahan] = useState(""); // State to store the selected "bahan"
	console.log("BAHAN", selectedBahan);

	const handleSubmit = (value) => {
		// Get the selected "bahan" based on the selectedBahan ID
		const selectedBahanData = dataSampah[selectedBahan];
		if (selectedBahanData) {
			const data = {
				...value,
				bahanSampah: selectedBahanData.bahan,
				tglSetor: moment().format("DD MMMM YYYY, HH:mm"),
			};
			createDataInventaris(data);
		}
	};

	const handleBahanChange = (value) => {
		setSelectedBahan(value);
	};

	return (
		<div>
			<Form layout='vertical' onFinish={handleSubmit}>
				<Form.Item
					label='Nama Nasabah'
					colon={false}
					name='namaNasabah'
					rules={[
						{
							required: true,
							message: "Tolong masukkan nama nasabah!",
						},
					]}
				>
					<Select
						showSearch
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nama nasabah'
					>
						{Object.values(dataNasabah).map((nasabah) => (
							<Select.Option
								key={nasabah.namaLengkap}
								value={nasabah.namaLengkap}
							>
								{nasabah.namaLengkap}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label='Bahan Sampah'
					colon={false}
					name='bahanSampah'
					rules={[
						{
							required: true,
							message: "Tolong masukkan nama bahan sampah!",
						},
					]}
				>
					<Select
						showSearch
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nama bahan sampah'
						onChange={handleBahanChange}
					>
						{Object.keys(dataSampah).map((sampahId) => (
							<Select.Option key={sampahId} value={sampahId}>
								{dataSampah[sampahId].bahan}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label='Jenis Sampah'
					colon={false}
					name='jenisSampah'
					rules={[
						{
							required: true,
							message: "Tolong masukkan nama jenis sampah!",
						},
					]}
				>
					<Select
						showSearch
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nama jenis sampah'
						allowClear
					>
						{selectedBahan &&
							dataSampah[selectedBahan]?.jenis.map((jenis) => (
								<Select.Option key={jenis} value={jenis}>
									{jenis}
								</Select.Option>
							))}
					</Select>
				</Form.Item>

				<Form.Item
					// labelCol={{ span: 3 }}
					// wrapperCol={{ span: 15 }}
					label='Berat Sampah'
					colon={false}
					name='beratSampah'
					rules={[
						{
							required: true,
							message: "Tolong masukkan berat sampah!!",
						},
					]}
				>
					<Input
						style={{
							width: "100%",
						}}
						placeholder='Masukkan berat sampah'
					/>
				</Form.Item>

				<Form.Item
					label='Satuan'
					colon={false}
					name='satuan'
					rules={[
						{
							required: true,
							message: "Tolong masukkan satuan harga sampah!",
						},
					]}
				>
					<Select
						placeholder='Masukan satuan'
						allowClear
						options={[
							{
								value: "Kilogram",
								label: "Kilogram",
							},
							{
								value: "Biji",
								label: "Biji",
							},
							{
								value: "Liter",
								label: "Liter",
							},
						]}
					/>
				</Form.Item>

				<Form.Item className='btn-submit'>
					<Button htmlType='submit' loading={loadingOnSubmit}>
						Submit
					</Button>
				</Form.Item>
			</Form>
			<Col className='datatable'>
				<Divider orientation='left'>Hasil</Divider>
				<DataTable />
			</Col>
		</div>
	);
}

export default Inventaris;