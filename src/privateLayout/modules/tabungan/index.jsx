import { Col, Empty, Image, Row, Spin, Typography } from "antd";
import React from "react";
import pic from "../../../assets/Personal.jpg";
import "../../../styles/tabungan/tabungan.css";
import { WalletOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
function Tabungan() {
    const { Title } = Typography;
    const { currentUser } = useSelector(state => state.auth);
    const { data } = useSelector((state) => state.dataNasabah);

    // Find the user data that matches the current user's uid
    const matchedUserData = Object.values(data).find(user => user.status === "Nasabah" && user.uid === currentUser.uid);

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
                        src='error'
                        fallback={pic}
                    />
                </div>
                {matchedUserData ? (
                    <div>
                        <Col style={{display: "flex", justifyContent: "center"}}>
                            <Title>{matchedUserData.namaLengkap}</Title>
                        </Col>
                        <Col style={{ marginTop: "30px" }}>
                            <Col id='card-tabungan'>
                                <span>
                                    <Title level={3}>
                                        <WalletOutlined />
                                        Saldo
                                    </Title>
                                </span>
                                <span>
                                    <Title level={3}>{matchedUserData.saldo}</Title>
                                </span>
                            </Col>
                        </Col>
                    </div>
                ) : (<Spin />)}
            </div>
            <div></div>
        </Col>
    );
}

export default Tabungan;
