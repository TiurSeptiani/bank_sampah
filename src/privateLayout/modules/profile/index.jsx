import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Empty,
  Image,
  Input,
  Space,
  Typography,
} from "antd";
import React from "react";
import pic from "../../../assets/Personal.jpg";
import "../../../styles/profile/profile.css";
import {
  DownOutlined,
  MoreOutlined,
  SettingOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Profile({ handleResetSaldo }) {
  const { Title } = Typography;
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.dataNasabah);
  const { data: dataTransaksi } = useSelector((state) => state.dataTransaksi);
  const { data: administrasi } = useSelector((state) => state.administrasi);
  const navigate = useNavigate();

  const isNasabah = Object.values(data).find(
    (user) => user.status === "Nasabah" && user.uid === currentUser.uid
  );
  const isPengurus = Object.values(data).find(
    (user) => user.status === "Pengurus" && user.uid === currentUser.uid
  );

  const resetSaldo = () => {
    handleResetSaldo();
  };

  const items = [
    {
      label: <a onClick={() => navigate("/ganti-password")}>Ganti Password</a>,
      key: "0",
    },
    isPengurus && {
      label: "Reset Saldo",
      onClick: resetSaldo,
      key: "1",
    }
  ];


  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <Col id="tabungan">

      {/* {isNasabah && (
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
                  <a id="setting-nasabah" onClick={(e) => e.preventDefault()}>
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
              <h1 className="saldo">
                {isNasabah.saldo.toLocaleString("id-ID")}
              </h1>
            </span>
          </div>
          <div style={{ marginTop: "50px", marginBottom: "20px" }}>
            <Divider orientation="left">Riwayat Penarikan</Divider>

            {dataTransaksi ? (
              Object.keys(dataTransaksi).map((transactionId) => {
                const transaction = dataTransaksi[transactionId];
                if (transaction.namaNasabah === isNasabah.namaLengkap) {
                  return (
                    <Col key={transactionId}>
                      <Card
                        style={{ backgroundColor: "#f7efe5" }}
                        hoverable
                        title={
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                            }}
                          >
                            <Col>{transaction.jenis}</Col>
                          </span>
                        }
                        bordered={false}
                      >
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "20px",
                          }}
                        >
                          <Col>
                            <h1>{transaction.namaNasabah}</h1>
                            <p>
                              <Col>{transaction.tglPenarikan}</Col>
                            </p>
                          </Col>
                          <Col
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "column",
                            }}
                          >
                            <p>
                              {" "}
                              Saldo Awal sebesar Rp{" "}
                              {transaction.saldoAwal.toLocaleString("id-ID")}
                            </p>
                            <p>
                              {" "}
                              Potongan 10% sebesar Rp{" "}
                              {transaction.saldoAdministrasi.toLocaleString(
                                "id-ID"
                              )}
                            </p>
                            <h2>
                              {" "}
                              - Rp{" "}
                              {transaction.saldoNasabah.toLocaleString("id-ID")}
                            </h2>
                          </Col>
                        </Col>
                      </Card>
                    </Col>
                  );
                }
                return null;
              })
            ) : (
              <Empty />
            )}
          </div>
        </div>
      )} */}


      {isPengurus && (
        <div id="tabungan-container-petugas">
          <div id="tabungan-body">
            <span className="saldo-tabungan-nama">Saldo Bank Sampah</span>
            <span className="saldo-tabungan">
              <h6 className="rupiah">Rp</h6>
              <h1 className="saldo">
                {Object.keys(administrasi)[0] &&
                  administrasi[Object.keys(administrasi)[0]].saldo.toLocaleString("id-ID")}
              </h1>
            </span>
          </div>
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
                  {isPengurus.namaLengkap}
                </span>
                <span className="tabungan-nama-h2">
                  Status: {isPengurus.status}
                </span>
              </div>
              <div className="tabungan-nama-setting">
                <Dropdown
                  menu={{
                    items,
                    onClick: handleItemClick,
                  }}
                  trigger={["click"]}
                >
                  <a id="setting-petugas" onClick={(e) => e.preventDefault()}>
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
          
          <div className="profile-body">
            <div className="profile-content">
              <Title level={5}>Nama Lengkap</Title>
              <Input
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
                disabled
                defaultValue={isPengurus ? isPengurus.namaLengkap : ""}
              />
            </div>
            <div className="profile-content">
              <Title level={5}>Email</Title>
              <Input
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
                disabled
                defaultValue={isPengurus ? isPengurus.email : ""}
              />
            </div>
            <div className="profile-content">
              <Title level={5}>Nomor Handphone</Title>
              <Input
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
                disabled
                defaultValue={isPengurus ? isPengurus.noHp : ""}
              />
            </div>
            <div className="profile-content">
              <Title level={5}>No RT</Title>
              <Input
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
                disabled
                defaultValue={isPengurus ? isPengurus.noRt : ""}
              />
            </div>
          </div>
        </div>
      )}
      {isNasabah && (
        <div id="tabungan-container-petugas">
           <div id="tabungan-body">
            <span className="saldo-tabungan-nama">Saldo Bank Sampah</span>
            <span className="saldo-tabungan">
              <h6 className="rupiah">Rp</h6>
              <h1 className="saldo">
                {isNasabah.saldo.toLocaleString("id-ID")}
              </h1>
            </span>
          </div>
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
                  Status: {isNasabah.status}
                </span>
              </div>
              <div className="tabungan-nama-setting">
                <Dropdown
                  menu={{
                    items,
                    onClick: handleItemClick,
                  }}
                  trigger={["click"]}
                >
                  <a id="setting-petugas" onClick={(e) => e.preventDefault()}>
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
         
          <div className="profile-body">
            <div className="profile-content">
              <Title level={5}>Nama Lengkap</Title>
              <Input
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
                disabled
                defaultValue={isNasabah ? isNasabah.namaLengkap : ""}
              />
            </div>
            <div className="profile-content">
              <Title level={5}>Email</Title>
              <Input
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
                disabled
                defaultValue={isNasabah ? isNasabah.email : ""}
              />
            </div>
            <div className="profile-content">
              <Title level={5}>Nomor Handphone</Title>
              <Input
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
                disabled
                defaultValue={isNasabah ? isNasabah.noHp : ""}
              />
            </div>
            <div className="profile-content">
              <Title level={5}>No RT</Title>
              <Input
                style={{ fontWeight: "bold", letterSpacing: "2px" }}
                disabled
                defaultValue={isNasabah ? isNasabah.noRt : ""}
              />
            </div>
            <div style={{ marginTop: "50px", marginBottom: "20px" }}>
            <Divider orientation="left">Riwayat Penarikan</Divider>

            {dataTransaksi ? (
              Object.keys(dataTransaksi).map((transactionId) => {
                const transaction = dataTransaksi[transactionId];
                if (transaction.namaNasabah === isNasabah.namaLengkap) {
                  return (
                    <Col key={transactionId}>
                      <Card
                        style={{ backgroundColor: "#f7efe5" }}
                        hoverable
                        title={
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                            }}
                          >
                            <Col>{transaction.jenis}</Col>
                          </span>
                        }
                        bordered={false}
                      >
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "20px",
                          }}
                        >
                          <Col>
                            <h1>{transaction.namaNasabah}</h1>
                            <p>
                              <Col>{transaction.tglPenarikan}</Col>
                            </p>
                          </Col>
                          <Col
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "column",
                            }}
                          >
                            <p>
                              {" "}
                              Saldo Awal sebesar Rp{" "}
                              {transaction.saldoAwal.toLocaleString("id-ID")}
                            </p>
                            <p>
                              {" "}
                              Potongan 10% sebesar Rp{" "}
                              {transaction.saldoAdministrasi.toLocaleString(
                                "id-ID"
                              )}
                            </p>
                            <h2>
                              {" "}
                              - Rp{" "}
                              {transaction.saldoNasabah.toLocaleString("id-ID")}
                            </h2>
                          </Col>
                        </Col>
                      </Card>
                    </Col>
                  );
                }
                return null;
              })
            ) : (
              <Empty />
            )}
          </div>
          </div>

        </div>
      )}
    </Col>
  );
}

export default Profile;
