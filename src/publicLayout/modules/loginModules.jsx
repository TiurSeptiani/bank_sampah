import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Image, Input, Typography } from "antd";
import React, { useState } from "react";
import pic from "../../assets/logo.png";

// Component ini di jalankan di dalam component "ibu" yang terdapat di dalam folder "pages"
// Pada component ini, terdapat parameter yang di dapatkan dari "ibu" nya, yaitu "handleLogin" dan "loadingOnSubmit"
function Index({ handleLogin, loadinOnSubmit }) {
  const [loadingKirim, setLoadingKirim] = useState(false);
  const { Title } = Typography;

  // Pada fungsi "handleSubmit" dibawah ini terdapat parameter "data" di dalamnya, isi dari parameter "data" yaitu sesuai "name" dari "Form.Item" yang ada di dalam "return(...)"
  // Jadi apa yang di inputkan oleh user pada "Form.Item", nilainya akan secara otomatis mengisi. contohnya :

  // Jika user mengetikkan nilai "ara@gmail.com" kedalam "Form.Item" dengan "name"nya adalah "email", maka sistem akan memprosesnya seperti ini = (email: "ara@gmail.com"), dan begitu seterusnya 

  // FYI : ( data ) pada fungsi "handleSubmit" dibawah namanya adalah PARAMETER, isi dari parameter penamaannya tidak harus "data", bebas tergantung programmer

  // fungsi "handleSubmit" dibawah ini bisa di sebut sebagai fungsi "anak" atau fungsi yang memiliki "ibu", karena fungsi ini berada pada folder "modules". Fungsi "handleSubmit" beserta "parameternya" ini nantinya akan di kirim fungsi "ibu" yang ada di dalam folder "pages" melalui fungsi "handleLogin"
  const handleSubmit = (data) => {
    // Mengaktifkan loading
    setLoadingKirim(true);
    
    // Pindahkan parameter "data" yang ada di dalam "handleSubmit" di atas kedalam "handleLogin" dibawah ini :
    handleLogin(data)

    // ".then" disebut sebagai "kemudian", yang di baca :
    // kemudian jika "data" sukses dikirim ke server, maka berhentikan loading dengan pemanggilan "set" nya yaitu "setLoadingKirim" dengan nilai "false"
      .then(() => {
        setLoadingKirim(false);
      })


       // ".catch" disebut sebagai "tangkap", yang di baca :
      //tangkap error, jika "data" gagal dikirim ke server, maka berhentikan loading dengan pemanggilan "set" nya yaitu "setLoadingKirim" dengan nilai "false"
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

        {/* Fungsi "handleSubmit" dipanggil atau di gunakan di dalam tag "Form" */}
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
