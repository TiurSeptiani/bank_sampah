import { Form, Input, Select } from "antd";
import React from "react";

function Inventaris() {
	return (
		<div>
			<Form>
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
						mode='tags'
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nama nasabah'
						// onChange={handleChange}
						// options={options}
					/>
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
						mode='tags'
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nama bahan sampah'
						// onChange={handleChange}
						// options={options}
					/>
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
						mode='tags'
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nama jenis sampah'
						// onChange={handleChange}
						// options={options}
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
						placeholder='Masukkan nama jenis sampah'
						// onChange={handleChange}
						// options={options}
					/>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Inventaris;
