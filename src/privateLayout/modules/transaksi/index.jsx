import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	Select,
	message,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardPenarikan from "./components/cardPenarikan";

function Transaksi({ handleTransaksi, handleDeleteDataTransaksi }) {
	const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
	const { data: dataTransaksi } = useSelector((state) => state.dataTransaksi);
	console.log("data nasabah", dataNasabah);

	const [selectedNasabah, setSelectedNasabah] = useState(null);

	const handleNasabahSelect = (value) => {
		setSelectedNasabah(value);

		const selectedNasabahData = Object.values(dataNasabah).find(
			(nasabah) => nasabah.namaLengkap === value
		);

		form.setFieldsValue({
			saldo: selectedNasabahData ? selectedNasabahData.saldo : 0,
		});
	};

	const [form] = Form.useForm();

	const handleSubmit = (values) => {
		const { namaNasabah, jumlahPenarikan } = values;
		const selectedNasabahData = Object.values(dataNasabah).find(
			(nasabah) => nasabah.namaLengkap === namaNasabah
		);

		const nasabahSaldo = selectedNasabahData
			? selectedNasabahData.saldo
			: 0;

		if (jumlahPenarikan > nasabahSaldo) {
			message.error(
				"Jumlah penarikan tidak boleh lebih dari total saldo"
			);
		} else {
			const dataForSubmit = {
				...values,
				tglPenarikan: moment().format("DD MMMM YYYY, HH:mm"),
				jenis: "Debit",
			};
			handleTransaksi(dataForSubmit);
		}
	};

	const [totalTransaksi, setTotalTransaksi] = useState(0);

    useEffect(() => {
        if (dataTransaksi) {
            setTotalTransaksi(Object.keys(dataTransaksi).length);
        }
    }, [dataTransaksi])

	return (
		<div>
			<Form form={form} layout='vertical' onFinish={handleSubmit}>
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
						onChange={handleNasabahSelect}
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

				<Form.Item label='Jumlah Saldo' colon={false} name='saldo'>
					<Input disabled />
				</Form.Item>

				<Form.Item
					label='Jumlah Penarikan'
					colon={false}
					name='jumlahPenarikan'
					rules={[
						{
							required: true,
							message: "Tolong masukkan jumlah penarikkan",
						},
					]}
				>
					<InputNumber
						min={1}
						style={{
							width: "100%",
						}}
						placeholder='Masukkan jumlah penarikkan'
					/>
				</Form.Item>

				<Form.Item className='btn-submit'>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>

			<Divider style={{ marginTop: "50px" }} orientation='left'>
				Total Transaksi : {totalTransaksi}
			</Divider>
			<Col>
				<CardPenarikan handleDeleteDataTransaksi={handleDeleteDataTransaksi} />
			</Col>
		</div>
	);
}

export default Transaksi;
