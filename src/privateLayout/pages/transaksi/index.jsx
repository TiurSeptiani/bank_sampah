import React, { useEffect } from 'react'
import Transaksi from "../../modules/transaksi/index"
import { useDispatch } from 'react-redux';
import { listDataPengguna } from '../../../store/reducers/registrasiUsers/registrasiUsersThunk';

function Index() {
  const dispatch = useDispatch()

  useEffect(() => {
		dispatch(listDataPengguna());
	}, [dispatch]);
  return (
    <div>
      <Transaksi />
    </div>
  )
}

export default Index
