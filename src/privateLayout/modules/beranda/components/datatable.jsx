import React, { useEffect, useState } from "react";
import { Button, Space, Table, Input, Col, Empty, Modal } from "antd";
import { DeleteOutlined, FileAddOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { listDataPengguna } from "../../../../store/reducers/registrasiUsers/registrasiUsersThunk";
import { useNavigate } from "react-router-dom";

const DataTable = ({
  jenisSampah,
  handleDeleteJenisSampah,
  loadingOnSubmit,
}) => {
  const rowKey = "idJenisSampah";
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const { currentUser } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.dataNasabah);
  const isPengurus = currentUser && data && Object.values(data).some((user) => user.status === "Pengurus" && user.uid === currentUser.uid)
  const navigate = useNavigate()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Berjalan pertama ketika button hapus di click
  const handleDeleteClick = (e, namaJenisSampah) => {
    e.preventDefault();

    // Mengambil uniq key jenis sampah yang di click
    const id = Object.keys(jenisSampah.data).find(
      (key) => jenisSampah.data[key].namaJenisSampah === namaJenisSampah
    );

    // apakah variabel "id" di atas mendapatkan uniq key?
    if (id) {
      // Jika "id" memiliki uniq key tampilkan POP UP delete
      // kirim "id" sebagai parameter/data
      showDeleteModal(id);
    }
  };

  // Sekarang POP UP memiliki data "id"
  const showDeleteModal = (id) => {

    // Simpan "id" kedalam variabel "setDeleteId"
    setDeleteId(id);

    // Tampilkan POP UP
    setIsModalVisible(true);
  };

  // Jika user menekan "OK", maka "handleDeleteJenisSampah" akan bekerja
  const handleConfirmDelete = () => {
    handleDeleteJenisSampah(deleteId);

    // Jika sudah bekerja, POP UP di tutup
    setIsModalVisible(false);
  };

  // Jika user menekan "Cancel", maka POP UP di tutup
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  // Data Kolom Tabel ada disini
  // Tamilan kolom nasabah
  const columns = [
    {
      title: "No",
      width: 60,
      fixed: "left",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },  
    {
      title: "Nama Jenis Sampah",
      dataIndex: "namaJenisSampah",
      width: 200,
    },
    {
      title: "Harga",
      dataIndex: "hargaJenisSampah",
      width: 150,
      render: (text) => {
        const formattedPrice = `Rp. ${parseInt(text).toLocaleString()}`;
        return <span>{formattedPrice}</span>;
      },
    },
    {
      title: "Satuan",
      dataIndex: "satuan",
      width: 100,
    },
  ];

  // Tampilan tabel khusus pengurus, dengan pengkondisian dibawha ini :
  const allColumns =

  // Jika "currentUser" / data user yang login saat ini dan "data" didalamnya mempunyai kesamaan yaitu memiliki status sebagai "Pengurus" dan memiliki "UID" yang sama maka :
    currentUser &&
    data &&
    Object.values(data).some(
      (user) => user.status === "Pengurus" && user.uid === currentUser.uid
    )
      ?
      // Tambahkan kolom Aksi yang di dalamnya mengandung tombol Hapus
      [
          ...columns,
          {
            title: "Aksi",
            dataIndex: rowKey,
            fixed: "right",
            width: 65,
            render: (key, record) => {
              return (
                <div>
                  <Button
                    type="primary"
                    danger
                    className="more btn-hapus-large"
                    style={{fontWeight: "bold", letterSpacing: "1px"}}
                    onClick={(e) =>
                      handleDeleteClick(e, record.namaJenisSampah)
                    }
                  >
                    <DeleteOutlined /> <span className="hapus-jenis">Hapus</span>
                  </Button>
                  <Button
                    type="primary"
                    danger
                    className="more btn-hapus-jenis-small"
                    style={{fontWeight: "bold", letterSpacing: "1px"}}
                    onClick={(e) =>
                      handleDeleteClick(e, record.namaJenisSampah)
                    }
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              );
            },
          },
        ]
      : columns;

      // Ini adalah fungsi untuk memfilter nama jenis sampah sesuai dengan yang di ketik oleh user
      // atau bisa di bilang Ini adalah fitur pencarian
  const filteredData = jenisSampah.data
    ? Object.values(jenisSampah.data).filter((item) =>
        item.namaJenisSampah.toLowerCase().startsWith(searchText.toLowerCase())
      )
    : [];

  return (
    <div>
      <Col style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {isPengurus ? (
          <>
            <Col span={20}>
          <Input
            prefix={<SearchOutlined className="site-form-item-icon" />}
            placeholder="Cari Nama Jenis Sampah"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </Col>
        <Col span={3}>
          <Button type="primary" style={{fontWeight: "bold", letterSpacing: "1px"}} onClick={() => navigate('/tambah-jenis-sampah')}><FileAddOutlined /> Tambah Jenis</Button>
        </Col>
          </>
        ) : (
         <>
           <Col span={24}>
          <Input
            prefix={<SearchOutlined className="site-form-item-icon" />}
            placeholder="Cari Nama Jenis Sampah"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </Col>
         </>
        )}
      </Col>

      <Table
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredData.length,
          onChange: (current) => {
            setPagination({ ...pagination, current });
          },
        }}
        columns={allColumns}
        dataSource={filteredData.slice(
          (pagination.current - 1) * pagination.pageSize,
          pagination.current * pagination.pageSize
        )}
        scroll={{ x: windowWidth <= 800 ? "100vw" : undefined }}
      />

      <Modal
        title="Konfirmasi Hapus"
        visible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Anda yakin ingin menghapus item ini?</p>
      </Modal>
    </div>
  );
};

export default DataTable;
