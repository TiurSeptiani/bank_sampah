import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function FormJenisSampah({ handleOnSubmit, loadingOnSubmit }) {

  // Fungsi untuk TOMBOL KIRIM pada tambah jenis sampah
  const handleSubmit = (values) => {
    handleOnSubmit(values);
  };

  const navigate = useNavigate()

  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Nama Jenis Sampah"
          colon={false}
          name="namaJenisSampah"
          rules={[
            {
              required: true,
              message: "Tolong masukkan nama jenis sampah!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
            placeholder="Masukkan nama jenis sampah"
          />
        </Form.Item>
        <Form.Item
          label="Harga"
          colon={false}
          name="hargaJenisSampah"
          rules={[
            {
              required: true,
              message: "Tolong masukkan harga sampah!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
            placeholder="Masukkan harga sampah"
          />
        </Form.Item>
        <Form.Item
          label="Satuan"
          colon={false}
          name="satuan"
          rules={[
            {
              required: true,
              message: "Tolong masukkan satuan harga sampah!",
            },
          ]}
        >
          <Select
            placeholder="Masukan satuan"
            allowClear
            options={[
              {
                value: "Kilogram",
                label: "Kilogram",
              },
              {
                value: "Biji",
                label: "Biji",
              },
              {
                value: "Liter",
                label: "Liter",
              },
            ]}
          />
        </Form.Item>

        <Form.Item className="btn-submit">
          <div style={{display: "flex", gap: "20px"}}>
          <Button
            style={{fontWeight: "bold", letterSpacing: "1px"}}
            danger
            onClick={() => navigate('/')}
            ghost
          >
            Kembali
          </Button>

          <Button
            loading={loadingOnSubmit}
			disabled={loadingOnSubmit}
            htmlType="submit"
            style={{fontWeight: "bold", letterSpacing: "1px"}}
            type="primary"
          >
            Kirim
          </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormJenisSampah;
