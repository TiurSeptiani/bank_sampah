import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Image, Input, Typography } from "antd";
import React, { useState } from "react";
import pic from "../../assets/logo.png";

function Index({ handleLogin, loadinOnSubmit }) {
  const [loadingKirim, setLoadingKirim] = useState(false);
  const { Title } = Typography;

  const handleSubmit = (data) => {
    setLoadingKirim(true);
    handleLogin(data)
      .then(() => {
        setLoadingKirim(false);
      })
      .catch((error) => {
        setLoadingKirim(false);
      });
  };
  

  return (
    <div className="container-login">
      <div>
        <Image preview={false} width={200} src={pic} />
      </div>
      <Col className="content-login">
        <div>
          <Title level={4}>Login</Title>
        </div>
        <Form className="login-form" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Tolong masukkan email kamu!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <div className="btn-for-login">
				<Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loadinOnSubmit}
              loading={loadingKirim}
            >
              Masuk
            </Button>
			</div>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}

export default Index;
