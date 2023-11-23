import React, { useEffect, useState } from 'react'
import Anggota from '../../modules/anggota/anggota'
import { useDispatch } from 'react-redux'
import { handleDeleteOnePengguna, listDataPengguna } from '../../../store/reducers/registrasiUsers/registrasiUsersThunk'
import { message } from 'antd'
import "../../../styles/anggota/style.css"

function Index() {
  const dispatch = useDispatch()
  const [loadingOnSubmit, setLoadingOnSubmit] = useState(false);

  useEffect(() => {
    dispatch(listDataPengguna())
  }, [dispatch])

  const handleDeletePengguna = (id) => {
    setLoadingOnSubmit(true)
    dispatch(handleDeleteOnePengguna(id))
    .unwrap()
    .then((res) => {
      message.success("Berhasil menghapus pengguna")
      dispatch(listDataPengguna())
    })
  }

  return (
    <div>
      <Anggota {...{handleDeletePengguna, loadingOnSubmit}} />
    </div>
  )
}

export default Index
