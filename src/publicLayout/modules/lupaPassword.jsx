import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input, Typography } from "antd";
import { useState } from "react";
import pic from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


function Index({handleResetPassword, loadingOnSubmit}) {

  const [loadingKirim, setLoadingKirim] = useState(false);
  const { Title } = Typography;
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    setLoadingKirim(true);
    try {
      handleResetPassword(data)
      setLoadingKirim(false);
    } catch (error) {
      setLoadingKirim(false);
      console.log(error);
    }
  };

  const navigatePage = () => {
    navigate('/')
  }

  return (
    <div className="container-login">
      <div>
        <Image preview={false} width={200} src={pic} />
      </div>
      <Col className="content-login">
        <div>
          <Title level={4}>Reset Password</Title>
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

          <Form.Item>
            <div className="btn-for-login">
              <Button
                style={{width: '100%'}}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={loadingOnSubmit}
                loading={loadingKirim}
              >
                Kirim
              </Button>

              <div className="btn-for-lupa-password">
                <p>Sudah punya akun? <span className="btn-click-here" onClick={navigatePage}>Login!</span></p>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}

export default Index;
