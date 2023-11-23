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

  const handleDeleteDataSampah = (id) => {
		setLoadingOnSubmit(true);
		dispatch(handleDeleteOneDataInventaris(id))
			.unwrap()
			.then((res) => {
				setLoadingOnSubmit(false);
				message.success("Data Sampah berhasil di hapus");
				dispatch(listDataInventaris());
			});
	};

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
