import { LockOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function GantiPassword({ handleChangePassword }) {
  const [loadingKirim, setLoadingKirim] = useState(false);
  const { data } = useSelector((state) => state.dataNasabah);
  const { currentUser } = useSelector((state) => state.auth);

  const user =
    currentUser &&
    data &&
    Object.values(data).some((user) => user.uid === currentUser.uid);


  const handleSubmit = (values) => {
    setLoadingKirim(true);
    if (user) {
      const userData = Object.values(data).find(
        (userData) => userData.uid === currentUser.uid
      );

      if (values.passwordLama === userData.password) {
        if (values.passwordBaru === values.konfirmasiPasswordBaru) {
          handleChangePassword(values);
        } else {
          message.error("Password baru dan konfirmasi password tidak sesuai");
        }
      } else {
        message.error("Password lama tidak sesuai");
      }
    }

    setLoadingKirim(false);
  };

  return (
    <div>
      <Divider style={{ marginBottom: "50px" }} orientation="left">
        Ganti Password
      </Divider>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Password Lama"
          colon={false}
          name="passwordLama"
          rules={[
            {
              required: true,
              message: "Password lama wajib di isi!",
            },
            {
              min: 6,
              message: "Password lama minimal 6 karakter",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            style={{
              width: "100%",
            }}
            placeholder="Masukkan password lama"
          />
        </Form.Item>
        <Form.Item
          label="Password Baru"
          colon={false}
          name="passwordBaru"
          rules={[
            {
              required: true,
              message: "Password baru wajib di isi!",
            },
            {
              min: 6,
              message: "Password baru minimal 6 karakter",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            style={{
              width: "100%",
            }}
            placeholder="Masukkan password baru"
          />
        </Form.Item>

        <Form.Item
          label="Konfirmasi Password Baru"
          colon={false}
          name="konfirmasiPasswordBaru"
          rules={[
            {
              required: true,
              message: "Konfirmasi password baru wajib di isi!",
            },
            {
              min: 6,
              message: "Konfirmasi password baru minimal 6 karakter",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            style={{
              width: "100%",
            }}
            placeholder="Masukkan password lama"
          />
        </Form.Item>

        <Form.Item className="btn-submit">
          <Button
            // loading={loadingSimpan}
            htmlType="submit"
            // disabled={loadingOnSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default GantiPassword;
