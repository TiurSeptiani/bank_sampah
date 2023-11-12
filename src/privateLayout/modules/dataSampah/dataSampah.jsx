import React, { useState } from "react";
import {
	Button,
	Card,
	Col,
	Divider,
	Empty,
	List,
	Modal,
	Table,
	Typography,
} from "antd";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

function DataSampah({ handleDeleteDataSampah }) {
	const dataInventaris = useSelector((state) => state.dataInventaris);
	const { data } = useSelector((state) => state.dataNasabah)
	const { currentUser } = useSelector(state => state.auth)
	const rowKey = "idBahanSampah";
	const [deleteId, setDeleteId] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { Title, Text } = Typography;
	const groupedData = {};
	if (dataInventaris.data) {
		Object.values(dataInventaris.data).forEach((item) => {
			const {
				bahanSampah,
				beratSampah,
				harga,
				jenisSampah,
				namaNasabah,
				satuan,
				tglSetor,
			} = item;

			if (!groupedData[bahanSampah]) {
				groupedData[bahanSampah] = [];
			}

			groupedData[bahanSampah].push({
				bahanSampah,
				beratSampah,
				harga,
				jenisSampah,
				namaNasabah,
				satuan,
				tglSetor,
			});
		});
	}

	const handleDelete = (e, namaNasabah) => {
		e.preventDefault();
		const id = Object.keys(dataInventaris.data).find(
			(key) => dataInventaris.data[key].namaNasabah === namaNasabah
		);
		if (id) {
			showDeleteModal(id);
		}
	};

	const showDeleteModal = (id) => {
		setDeleteId(id);
		setIsModalVisible(true);
	};

	const handleConfirmDelete = () => {
		handleDeleteDataSampah(deleteId);
		setIsModalVisible(false);
	};

	const handleCancelDelete = () => {
		setIsModalVisible(false);
	};

	const columns = [
		{
			title: "Jenis Sampah",
			dataIndex: "jenisSampah",
			key: "jenisSampah",
		},
		{
			title: "Nama Nasabah",
			dataIndex: "namaNasabah",
			key: "namaNasabah",
		},
		{
			title: "Satuan",
			dataIndex: "satuan",
			key: "satuan",
		},
		{
			title: "Berat",
			dataIndex: "beratSampah",
			key: "beratSampah",
		},
		{
			title: "Harga",
			dataIndex: "harga",
			key: "harga",
		},
		{
			title: "Tanggal Setor",
			dataIndex: "tglSetor",
			key: "tglSetor",
		},
		
	];

	const allColumns =
  currentUser &&
  data &&
  Object.values(data).some(user => user.status === "Petugas" && user.uid === currentUser.uid)
    ? [
        ...columns,
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
							onClick={(e) => handleDelete(e, record.namaNasabah)}
						>
							<DeleteOutlined />
						</Button>
					</div>
				);
			},
		},
      ]
    : columns;

	return (
		<div>
			{dataInventaris.data ? (
				Object.keys(groupedData).map((bahanSampah) => (
					<div key={bahanSampah}>
						<Divider orientation='left'>{bahanSampah}</Divider>
						<Table
							columns={allColumns}
							dataSource={groupedData[bahanSampah]}
							footer={() => (
								<Col>
									<Title level={5}>
										Total Harga:{" "}
										<Text keyboard>
											Rp.
											{groupedData[bahanSampah]
												.reduce(
													(acc, item) =>
														acc +
														parseInt(item.harga),
													0
												)
												.toFixed(2)}
										</Text>
									</Title>
									<Title level={5}>
										Total Berat:{" "}
										<Text keyboard>
											{" "}
											{groupedData[bahanSampah]
												.reduce(
													(acc, item) =>
														acc +
														parseFloat(
															item.beratSampah
														),
													0
												)
												.toFixed(2)}{" "}
											Kilogram
										</Text>
									</Title>
								</Col>
							)}
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
				))
			) : (
				<div
					style={{
						height: "75vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Empty />
				</div>
			)}
		</div>
	);
}

export default DataSampah;
