import { Button, Col, Divider, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "./components/datatable";
import "../../../styles/inventaris/inventaris.css";
import { useSelector } from "react-redux";

function Inventaris({ createDataInventaris, loadingOnSubmit }) {
	const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
	const { data: dataJenisSampah } = useSelector((state) => state.jenisSampah);
	const { data: dataSampah } = useSelector((state) => state.dataSampah);
	const [loadingKirim, setLoadingKirim] = useState(false);

	const handleSubmit = (value) => {
		// setLoadingKirim(true)
		createDataInventaris(value);
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
					>
						{Object.values(dataSampah).map((nama) => (
							<Select.Option key={nama.bahan} value={nama.bahan}>
								{nama.bahan}
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
						{Object.values(dataJenisSampah).map((jenis) => (
							<Select.Option
								key={jenis.namaJenisSampah}
								value={jenis.namaJenisSampah}
							>
								{jenis.namaJenisSampah}
							</Select.Option>
						))}
					</Select>
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

				<Form.Item className='btn-submit'>
					<Button htmlType='submit'>Submit</Button>
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
