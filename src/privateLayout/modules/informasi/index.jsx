import React from "react";
import sampul from "../../../assets/sampul.jpg";
import struktur from "../../../assets/struktur.jpg";
import { Collapse, Image } from "antd";

const { Panel } = Collapse;

function Informasi() {
  const items = [
    {
      key: "1",
      label: <><h1>Keterangan Lokasi Bank Sampah Anugerah 04</h1></>,
      children: (
        <>
          <Image id="gambar-informasi-satu" src={sampul} alt="Sampul" />
          <div style={{marginTop: "20px"}}>
          <h3>Kampung Klitren Lor - RW 04 (RT 13, 14, 15, 16, 17, 18)</h3>
          <h3>Kelurahan Klitren, Kemantren Gondokusuman Kota Yogyakarta.</h3>
          <h3>Telephone / Whatsapp : 08122797221</h3>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: <><h1>Struktur dalam Bank Sampah Anugerah 04</h1></>,
      children: (
        <>
          <Image id="gambar-informasi-dua" src={struktur} alt="Struktur" />
          <div style={{margin: "20px 0"}}>
            <h2>
              Struktur Pengurus Bank Sampah Anugerah 04 Klitren - Gondokusuman
              Yogyakarta
            </h2>
          </div>
          <div>
            <h3>Sugeng Kiswanto - Pelindung</h3>
            <h3>Sri Widiasih - Ketua</h3>
            <h3>Edi Ari W. - Sekretaris</h3>
            <h3>Sukesmi - Bendahara</h3>
            <h3>Fatimah - Penimbang</h3>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        {items.map((item) => (
          <Panel key={item.key} header={item.label}>
            {item.children}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default Informasi;
