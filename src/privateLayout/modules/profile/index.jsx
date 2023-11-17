import { Col, Divider, Empty, Image, Row, Spin, Typography } from "antd";
import React from "react";
import pic from "../../../assets/Personal.jpg";
import "../../../styles/tabungan/tabungan.css";
import { WalletOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
function Tabungan() {
  const { Title, Text } = Typography;
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.dataNasabah);
  const isNabah = Object.values(data).find(
    (user) => user.status === "Nasabah" && user.uid === currentUser.uid
  );

  return (
    <Col
      span={10}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Image
            style={{ borderRadius: "50%" }}
            width={150}
            height={150}
            src="error"
            fallback={pic}
          />
        </div>
        {isNabah ? (
          <>
            <div>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Title style={{fontWeight: "bold"}} level={1}>{isNabah.namaLengkap}</Title>
              </Col>
              <Col>
                <Col id="card-tabungan">
                  <span>
                    <p style={{ fontSize: "1.2rem", fontWeight: "400" }}>
                      Saldo Tabungan
                    </p>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <h6 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      Rp
                    </h6>
                    <h1 style={{ fontSize: "3.5rem", letterSpacing: "3px" }}>
                      {isNabah.saldo}
                    </h1>
                  </span>
                </Col>
              </Col>
            </div>
          </>
        ) : (
          <div style={{ height: "80vh", display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Spin />
          </div>
        )}
      </div>
      <div></div>
    </Col>
  );
}

export default Tabungan;
