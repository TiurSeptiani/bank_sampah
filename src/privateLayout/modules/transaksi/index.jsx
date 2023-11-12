import { Button, Col, DatePicker, Divider, Empty, Form, Input, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function Transaksi() {
	const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
	return (
		<div>
			<Form layout='vertical'>
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
					label='Waktu Transaksi'
					colon={false}
					name='tglTransaksi'
					rules={[
						{
							required: true,
							message: "Tolong masukkan tanggal!",
						},
					]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					label='Jumlah'
					colon={false}
					name='jumlah'
					rules={[
						{
							required: true,
							message: "Tolong jumlah penarikkan",
						},
					]}
				>
					<Input
						style={{
							width: "100%",
						}}
						placeholder='Masukkan jumlah penarikkan'
					/>
				</Form.Item>

				<Form.Item className='btn-submit'>
					<Button>Submit</Button>
				</Form.Item>
			</Form>

			<Divider style={{marginTop: "50px"}} orientation="left">Riwayat Transaksi</Divider>
			<Col>
			<Empty />
			</Col>
		</div>
	);
}

export default Transaksi;
