import { Button, Col, Divider, Form, Input, Select } from "antd";
import React, { useState } from "react";
import DataTable from "./components/datatable";
import "../../../styles/inventaris/inventaris.css";
import { useSelector } from "react-redux";
import moment from "moment";
import DataTableTotal from "./components/datatableTotal";

function Inventaris({
  createDataInventaris,
  loadingOnSubmit,
  handleDeleteDataSampah,
}) {
  const { data: dataNasabah } = useSelector((state) => state.dataNasabah);
  const { data: jenisSampah } = useSelector((state) => state.jenisSampah);
  const { currentUser } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (values) {
      const data = {
        ...values,
        tglSetor: new Date().getTime()
      };
      createDataInventaris(data);
      form.resetFields();
    }
  };

  const isPengurus = Object.values(dataNasabah).some(
    (user) => user.status === "Pengurus" && user.uid === currentUser.uid
  );

  return (
    <div>
      <Form
        disabled={!isPengurus}
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nama Nasabah"
          colon={false}
          name="namaNasabah"
          rules={[
            {
              required: true,
              message: "Tolong masukkan nama nasabah!",
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: "100%",
            }}
            placeholder="Masukkan nama nasabah"
          >
            {Object.values(dataNasabah).map((nasabah) => (
              <Select.Option
                key={nasabah.namaLengkap}
                value={nasabah.namaLengkap}
              >
                {nasabah.namaLengkap}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Bahan Sampah"
          colon={false}
          name="bahanSampah"
          rules={[
            {
              required: true,
              message: "Tolong masukkan nama bahan sampah!",
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: "100%",
            }}
            placeholder="Masukkan nama bahan sampah"
            allowClear
            options={[
              {
                value: "Plastik",
                label: "Plastik",
              },
              {
                value: "Kertas",
                label: "Kertas",
              },
              {
                value: "Logam",
                label: "Logam",
              },
              {
                value: "Jlantah",
                label: "Jlantah",
              },
              {
                value: "Aqi",
                label: "Aqi",
              },
              {
                value: "Kaca",
                label: "Kaca",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Jenis Sampah"
          colon={false}
          name="jenisSampah"
          rules={[
            {
              required: true,
              message: "Tolong masukkan nama jenis sampah!",
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: "100%",
            }}
            placeholder="Masukkan nama jenis sampah"
            allowClear
          >
            {Object.values(jenisSampah).map((data) => (
              <Select.Option
                key={data.namaJenisSampah}
                value={data.namaJenisSampah}
              >
                {data.namaJenisSampah}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Berat Sampah"
          colon={false}
          name="beratSampah"
          rules={[
            {
              required: true,
              message: "Tolong masukkan berat sampah!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
            placeholder="Masukkan berat sampah"
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
          <Button htmlType="submit" disabled={loadingOnSubmit} loading={loadingOnSubmit} style={{fontWeight: "bold", letterSpacing: "1px"}} type='primary'>
            Kirim
          </Button>
        </Form.Item>
      </Form>

      <Col className="datatable">
        <Divider orientation="left">Setoran Sampah</Divider>
        <DataTable handleDeleteDataSampah={handleDeleteDataSampah} />
      </Col>

      <Col className="datatable">
        <Divider orientation="left">Total Keseluruhan Setoran</Divider>
        <DataTableTotal />
      </Col>
    </div>
  );
}

export default Inventaris;
