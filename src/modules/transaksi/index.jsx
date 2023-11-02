import { DatePicker } from 'antd'
import React from 'react'

function Transaksi() {
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
					label='Tanggal'
					colon={false}
					name='tanggal'
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

				<Form.Item className="btn-submit">
					<Button>
						Submit
					</Button>
				</Form.Item>
			</Form>
    </div>
  )
}

export default Transaksi
