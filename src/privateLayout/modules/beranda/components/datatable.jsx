import React, { useState } from "react";
import { Button, Space, Table, Input, Col, Empty, Modal } from "antd";
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
	const [searchText, setSearchText] = useState("");
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	});

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const showDeleteModal = (id) => {
		setDeleteId(id);
		setIsModalVisible(true);
	};

	const handleDeleteClick = (e, namaJenisSampah) => {
		e.preventDefault();
		const id = Object.keys(jenisSampah.data).find(
			(key) => jenisSampah.data[key].namaJenisSampah === namaJenisSampah
		);
		if (id) {
			showDeleteModal(id);
		}
	};

	const handleConfirmDelete = () => {
		handleDeleteJenisSampah(deleteId);
		setIsModalVisible(false);
	};

	const handleCancelDelete = () => {
		setIsModalVisible(false);
	};

	const columns = [
		{
			title: "No",
			width: 100,
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
			width: 200,
		},
		{
			title: "Satuan",
			dataIndex: "satuan",
			width: 100,
		},
		{
			title: "Aksi",
			dataIndex: rowKey,
			fixed: "right",
			width: 70,
			render: (key, record) => {
				return (
					<div>
						<Button
							type='primary'
							className='more'
							ghost
							onClick={(e) =>
								handleDeleteClick(e, record.namaJenisSampah)
							}
						>
							<DeleteOutlined /> Hapus
						</Button>
					</div>
				);
			},
		},
	];

	const filteredData = jenisSampah.data
		? Object.values(jenisSampah.data).filter((item) =>
				item.namaJenisSampah
					.toLowerCase()
					.startsWith(searchText.toLowerCase())
		  )
		: [];

	const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

	return (
		<div>
			<Col span={5} style={{ marginBottom: "20px" }}>
				<Input
					prefix={<SearchOutlined className='site-form-item-icon' />}
					placeholder='Cari Nama Jenis Sampah'
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

			<Modal
				title='Konfirmasi Hapus'
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
