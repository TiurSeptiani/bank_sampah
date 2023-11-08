import React, { useState } from "react";
import { Button, Space, Table, Input, Col, Empty } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { datatableHargaSampah } from "../../../../store/reducers/hargaSampah/hargaSampahThunk";

const DataTable = ({
	jenisSampah,
	handleDeleteJenisSampah,
	loadingOnSubmit,
  }) => {
	const rowKey = "idJenisSampah";
	const [loadingHapus, setLoadingHapus] = useState(false);
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState(""); // State untuk menyimpan teks pencarian
	const [pagination, setPagination] = useState({
	  current: 1, // Halaman saat ini
	  pageSize: 10, // Jumlah item per halaman
	});
  
	const handleDeleteClick = (e, namaJenisSampah) => {
	  e.preventDefault();
	  const id = Object.keys(hargaSampah.data).find(
		(key) => hargaSampah.data[key].namaJenisSampah === namaJenisSampah
	  );
	  if (id) {
		handleDeleteJenisSampah(id);
		setLoadingHapus(true);
	  }
	};
  
	const columns = [
	  {
		title: "No",
		width: 100,
		render: (text, record, index) =>
		  (pagination.current - 1) * pagination.pageSize + index + 1, // Menghitung nomor urut yang tepat
	  },
	  {
		title: "Nama Jenis Sampah",
		dataIndex: "namaJenisSampah",
	  },
	  {
		title: "Harga",
		dataIndex: "hargaJenisSampah",
	  },
	  {
		title: "Satuan",
		dataIndex: "satuan",
	  },
	  {
		title: "Aksi",
		dataIndex: rowKey,
		fixed: "right",
		render: (key, record) => {
		  return (
			<Button
			  type="primary"
			  className="more"
			  ghost
			  onClick={(e) => handleDeleteClick(e, record.namaJenisSampah)}
			>
			  <DeleteOutlined /> Hapus
			</Button>
		  );
		},
	  },
	];
  
	const filteredData = jenisSampah.data
	  ? Object.values(jenisSampah.data).filter((item) =>
		  item.namaJenisSampah.toLowerCase().startsWith(searchText.toLowerCase())
		)
	  : [];
  
	// Menghitung total halaman berdasarkan data yang difilter
	const totalPages = Math.ceil(filteredData.length / pagination.pageSize);
  
	return (
	  <div>
		<Col span={5} style={{ marginBottom: "20px" }}>
		  <Input
			prefix={<SearchOutlined className="site-form-item-icon" />}
			placeholder="Cari Nama Jenis Sampah"
			onChange={(e) => setSearchText(e.target.value)}
			value={searchText}
		  />
		</Col>
  
		<Table
		  pagination={{
			current: pagination.current,
			pageSize: pagination.pageSize,
			total: filteredData.length,
			onChange: (current) => {
			  // Mengganti halaman saat ini
			  setPagination({ ...pagination, current });
			},
		  }}
		  columns={columns}
		  dataSource={filteredData.slice(
			(pagination.current - 1) * pagination.pageSize,
			pagination.current * pagination.pageSize
		  )}
		  scroll={{ x: 100 }}
		/>
	  </div>
	);
  };
  
  export default DataTable;
  
