import React from "react";
import sampul from "../../../assets/sampul.jpg";
import struktur from "../../../assets/struktur.jpg";
import { Collapse, Image } from "antd";

const { Panel } = Collapse;

function Informasi() {

  const items = [
    {
      key: '1',
      label: 'Sampul',
      children: (
        <>
          <Image id="gambar-informasi-satu" src={sampul} alt="Sampul" />
          <p>
            Sampul dari Bank Sampah Anugerah 04 Klitren.
          </p>
        </>
      ),
    },
    {
      key: '2',
      label: 'Struktur Bank Sampah',
      children: (
        <>
          <Image id="gambar-informasi-dua" src={struktur} alt="Struktur" />
          <p>
            Ini merupakan struktur dari Bank Sampah Anugerah 04 Klitren.
          </p>
        </>
      ),
    }
  ];

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
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
