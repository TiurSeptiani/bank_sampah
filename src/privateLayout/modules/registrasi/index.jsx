import {
	EnvironmentOutlined,
	HomeOutlined,
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, message, Divider } from "antd";
import moment from "moment";
import React, { useState } from "react";
import "moment/locale/id";
import { useSelector } from "react-redux";
moment.locale("id");

function Registrasi({ handleCreateUser, loadingOnSubmit }) {
	const [loadingKirim, setLoadingKirim] = useState(false);
	const { currentUser } = useSelector(state => state.auth)
	const { data } = useSelector((state) => state.dataNasabah)

	const handleSubmit = (value) => {
		setLoadingKirim(true);
		const { password, confirm_password } = value;
		if (password == confirm_password) {
			const dataForSubmit = {
				...value,
				tanggalBergabung: Date.now(),
				saldo: 0
			};
			handleCreateUser(dataForSubmit);
			setLoadingKirim(false)
		} else {
			message.error("Password dan Confirm Password harus sama!");
			setLoadingKirim(false)
		}
	};

	const isPetugas = Object.values(data).some(user => user.status === "Petugas" && user.uid === currentUser.uid)


	return (
		<div>
			<Form layout='vertical' onFinish={handleSubmit}>
				<Form.Item
					label='Nama Lengkap'
					colon={false}
					name='namaLengkap'
					rules={[
						{
							required: true,
							message: "Nama lengkap wajib di isi!",
						},
					]}
				>
					<Input
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nama lengkap'
					/>
				</Form.Item>
				<Form.Item
					label='Email'
					colon={false}
					name='email'
					rules={[
						{
							required: true,
							message: "Email wajib di isi!",
						},
					]}
				>
					<Input
						prefix={
							<MailOutlined className='site-form-item-icon' />
						}
						style={{
							width: "100%",
						}}
						placeholder='Masukkan email'
					/>
				</Form.Item>

				<Form.Item
					label='Password'
					colon={false}
					name='password'
					rules={[
						{
							required: true,
							message: "Password wajib di isi!",
						},
						{
							min: 6,
							message: "Password minimal 6 karakter",
						},
					]}
				>
					<Input
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						type='password'
						style={{
							width: "100%",
						}}
						placeholder='Masukkan password'
					/>
				</Form.Item>

				<Form.Item
					label='Confirm Password'
					colon={false}
					name='confirm_password'
					rules={[
						{
							required: true,
							message: "Confirm Password wajib di isi!",
						},
					]}
				>
					<Input
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						type='password'
						style={{
							width: "100%",
						}}
						placeholder='Masukkan ulang password'
					/>
				</Form.Item>

				<Form.Item
					label='Nomor Handphone'
					colon={false}
					name='noHp'
					rules={[
						{
							required: true,
							message: "Nomor handphone wajib di isi!",
						},
					]}
				>
					<Input
						prefix={
							<PhoneOutlined className='site-form-item-icon' />
						}
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nomor handphone'
					/>
				</Form.Item>

				<Form.Item
					label='Alamat'
					colon={false}
					name='alamat'
					rules={[
						{
							required: true,
							message: "Alamat wajib di isi!",
						},
					]}
				>
					<Input
						prefix={
							<HomeOutlined className='site-form-item-icon' />
						}
						style={{
							width: "100%",
						}}
						placeholder='Masukkan alamat'
					/>
				</Form.Item>
					
					<Divider />
			
				<Form.Item
					label='Nomor RT'
					colon={false}
					name='noRt'
					rules={[
						{
							required: true,
							message: "RT wajib di isi!",
						},
					]}
				>
					<Input
						type='number'
						style={{
							width: "100%",
						}}
						placeholder='Masukkan nomor RT'
					/>
				</Form.Item>
				<Form.Item
					label='Status'
					colon={false}
					name='status'
					rules={[
						{
							required: true,
							message: "Status wajib di isi!",
						},
					]}
				>
					<Select
						placeholder='Masukan Status'
						allowClear
						options={[
							{
								value: "Pengurus",
								label: "Pengurus",
							},
							{
								value: "Nasabah",
								label: "Nasabah",
							},
						]}
					/>
				</Form.Item>

				<Form.Item className='btn-submit'>
					<Button
						loading={loadingKirim}
						htmlType='submit'
						disabled={loadingOnSubmit}
						style={{fontWeight: "bold", letterSpacing: "1px"}} type='primary'
					>
						Kirim
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Registrasi;
