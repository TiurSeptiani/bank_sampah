import React, { useEffect, useState } from 'react'
import DataSampah from '../../modules/dataSampah/dataSampah'
import { useDispatch } from 'react-redux';
import { handleDeleteOneDataInventaris, listDataInventaris } from '../../../store/reducers/dataInventaris/dataInventarisThunk';
import { listDataPengguna } from '../../../store/reducers/registrasiUsers/registrasiUsersThunk';
import { message } from 'antd';
import "../../../styles/dataSampah/dataSampah.css"

function Index() {
  const dispatch = useDispatch()
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false)


// Fungsi ini dijalankan pada fungsi 'handleConfirmDelete' yang ada di dalam modules
  const handleDeleteDataSampah = (id) => {
		setLoadingOnSubmit(true);

		// Ambil parameter "id" di atas dan kirim kedalam fungsi API di bawha ini :
		dispatch(handleDeleteOneDataInventaris(id))
			.unwrap()
			.then((res) => {
				setLoadingOnSubmit(false);
				message.success("Data Sampah berhasil di hapus");

				// Jika berhasil di hapus maka jalankan kembali fungsi API "listDataInventaris" agar menampilkan data terupdate setelah terjadi penghapusan
				dispatch(listDataInventaris());
			});
	};


	// Jalankan fungsi API dibawah ini untuk mendapatkan "Data Inventaris" dan "Data Pengguna"
  useEffect(() => {
		dispatch(listDataInventaris());
    	dispatch(listDataPengguna());
	}, [dispatch]);

  return (
    <div>
      <DataSampah {...{handleDeleteDataSampah, loadingOnSubmit}} />
    </div>
  )
}

export default Index
