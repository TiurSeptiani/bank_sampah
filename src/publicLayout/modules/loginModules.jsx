import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Typography } from "antd";
import React, { useState } from "react";

function Index({handleLogin, loadinOnSubmit}) {
	const [loadingKirim, setLoadingKirim] = useState(false)
  const { Title } = Typography

  const handleSubmit = (data) => {
	setLoadingKirim(true)
    handleLogin(data)
	.unwrap()
	.then(() => {
		setLoadingKirim(false)
	})
  }

	return (
		<div className='container-login'>
			<Col className='content-login'>
				<div>
          <Title level={4}>
            Form Login
          </Title>
        </div>
				<Form className='login-form' onFinish={handleSubmit}>
					<Form.Item
						name='email'
						rules={[
							{
								required: true,
								message: "Tolong masukkan email kamu!",
							},
						]}
					>
						<Input
							prefix={
								<UserOutlined className='site-form-item-icon' />
							}
							placeholder='Email'
						/>
					</Form.Item>
					<Form.Item
						name='password'
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input
							prefix={
								<LockOutlined className='site-form-item-icon' />
							}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
							disabled={loadinOnSubmit}
							loading={loadingKirim}
						>
							Masuk
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</div>
	);
}

export default Index;
