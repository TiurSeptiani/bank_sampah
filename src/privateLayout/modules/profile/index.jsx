import {
  Col,
  Divider,
  Dropdown,
  Empty,
  Image,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import React from "react";
import pic from "../../../assets/Personal.jpg";
import "../../../styles/tabungan/tabungan.css";
import {
  DownOutlined,
  MoreOutlined,
  SettingOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
function Tabungan() {
  const { Title, Text } = Typography;
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.dataNasabah);
  const isNasabah = Object.values(data).find(
    (user) => user.status === "Nasabah" && user.uid === currentUser.uid
  );
  const isPetugas = Object.values(data).find(
    (user) => user.status === "Petugas" && user.uid === currentUser.uid
  );

  const items = [
    {
      label: <a href="https://www.antgroup.com">Ganti Password</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">Ganti Email</a>,
      key: "1",
    },
  ];

  return (
    <Col id="tabungan">
      {isNasabah && (
        <div id="tabungan-container-nasabah">
          <div className="tabungan-header">
            <div className="tabungan-foto">
              <Image
                id="gambar"
                style={{ borderRadius: "50%" }}
                src="error"
                fallback={pic}
              />
            </div>
            <div className="tabungan-nama">
              <div className="tabungan-nama-container">
                <span className="tabungan-nama-h1">
                  {isNasabah.namaLengkap}
                </span>
                <span className="tabungan-nama-h2">
                  Email: {isNasabah.email}
                </span>
              </div>
              <div className="tabungan-nama-setting">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a id="setting" onClick={(e) => e.preventDefault()}>
                    <Space>
                      <span>
                        <SettingOutlined />
                      </span>
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
          <div id="tabungan-body">
            <span className="saldo-tabungan-nama">Saldo Tabungan</span>
            <span className="saldo-tabungan">
              <h6 className="rupiah">Rp</h6>
              <h1 className="saldo">{isNasabah.saldo}</h1>
            </span>
          </div>
        </div>
      )}

      {isPetugas && (
        <div id="tabungan-container-petugas">
          <div className="tabungan-header">
            <div className="tabungan-foto">
              <Image
                id="gambar"
                style={{ borderRadius: "50%" }}
                src="error"
                fallback={pic}
              />
            </div>
            <div className="tabungan-nama">
              <div className="tabungan-nama-container">
                <span className="tabungan-nama-h1">
                  {isPetugas.namaLengkap}
                </span>
                <span className="tabungan-nama-h2">
                  Email: {isPetugas.email}
                </span>
              </div>
              <div className="tabungan-nama-setting">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a id="setting" onClick={(e) => e.preventDefault()}>
                    <Space>
                      <span>
                        <SettingOutlined />
                      </span>
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </Col>
  );
}

export default Tabungan;
