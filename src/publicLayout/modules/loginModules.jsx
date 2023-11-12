import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Typography } from "antd";
import React from "react";

function Index({handleLogin, loadinOnSubmit}) {

  const { Title } = Typography

  const handleSubmit = (data) => {
    handleLogin(data)
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
