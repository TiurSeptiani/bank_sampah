import React from "react";
import sampul from "../../../assets/sampul.jpg";
import struktur from "../../../assets/struktur.jpg";
import { Col, Image } from "antd";

function Informasi() {
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px", alignItems: "center", flexWrap: "wrap", width: "100%"}}>
      <Col>
        <Image width={500} src={sampul} />
      </Col>
      <Col>
        <Image width={500} src={struktur} />
      </Col>
    </div>
  );
}

export default Informasi;
