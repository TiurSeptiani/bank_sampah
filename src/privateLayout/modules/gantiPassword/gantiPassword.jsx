import { LockOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function GantiPassword({
  handleChangePassword,
  setLoadingOnSubmit,
  handleCancel,
}) {
  const [loadingKirim, setLoadingKirim] = useState(false);
  const { data } = useSelector((state) => state.dataNasabah);
  const { currentUser } = useSelector((state) => state.auth);


  // Pengkondisian untuk mengecek dan menyesuaikan data dari pengguna yang ingin mengganti password saat ini
  const user =
    currentUser &&
    data &&
    Object.values(data).some((user) => user.uid === currentUser.uid);


// Fungsi untuk mengirim data hasil perubahan / ganti password
  const handleSubmit = (values) => {
    setLoadingKirim(true);

    // Mengecek apakah user ada dan datanya sama, jika iya maka lanjutkan proses dibawah
    if (user) {

      // menemukan data yang sesuai antara "kumpulan list semua pengguna aplikasi" dengan data currentUser yang login saat ini
      const userData = Object.values(data).find(
        (userData) => userData.uid === currentUser.uid
      );

      // Melakukan pengecekkan, apakah password lama yang pengguna ketik saat ini, sama dengan password lama sebelumnya, jika iya maka =
      if (values.passwordLama === userData.password) {

        // Lakukan pengkondisian lagi, yang mengecek pengetikan password dan konfirmasi password sama
        if (values.passwordBaru === values.konfirmasiPasswordBaru) {

          // Jika sudah sama maka kirim value ke API dan ubah passwordnya
          handleChangePassword(values);
          setLoadingKirim(false);
        } else {

          // Tampil pesan dibawah jika password baru dan konfirmasi password baru yang diketik tidak seusai
          message.error("Password baru dan konfirmasi password tidak sesuai");
          setLoadingKirim(false);

        }
      } else {

        // Jika terjadi error lain, yang dimana password lama yang di ketikkan pada form saat ini tidak sesuai dengan password lama sebelumnya sudah dibuat.
        message.error("Password lama tidak sesuai");
        setLoadingKirim(false);
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
          <div style={{ display: "flex", gap: "10px" }}>
            <Button htmlType="submit" onClick={() => handleCancel()}>
              Kembali
            </Button>

            <Button
              loading={loadingKirim}
              htmlType="submit"
              disabled={setLoadingOnSubmit}
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default GantiPassword;
