import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";

function FormJenisSampah({ handleOnSubmit, loadingOnSubmit }) {
	const [loadingSimpan, setLoadingSimpan] = useState(false);

	const handleSubmit = (values) => {
		setLoadingSimpan(true);
		handleOnSubmit(values);
	};

	return (
		<div>
			<Form layout='vertical' onFinish={handleSubmit}>
				<Form.Item
					label='Nama Jenis Sampah'
					colon={false}
					name='namaJenisSampah'
					rules={[
						{
							required: true,
							message: "Tolong masukkan nama jenis sampah!",
						},
					]}
				>
					<Input
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nama jenis sampah'
					/>
				</Form.Item>
				<Form.Item
					label='Harga'
					colon={false}
					name='hargaJenisSampah'
					rules={[
						{
							required: true,
							message: "Tolong masukkan harga sampah!",
						},
					]}
				>
					<Input
						style={{
							width: "100%",
						}}
						placeholder='Masukkan harga sampah'
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
						placeholder="Masukan satuan"
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
					<Button
						// loading={loadingSimpan}
						htmlType='submit'
						// disabled={loadingOnSubmit}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default FormJenisSampah;
