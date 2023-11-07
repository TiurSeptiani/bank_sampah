import React, { useEffect } from 'react'
import Anggota from '../../modules/anggota/anggota'
import { useDispatch } from 'react-redux'
import { listDataPengguna } from '../../../store/reducers/registrasiUsers/registrasiUsersThunk'

function Index() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listDataPengguna())
  }, [dispatch])

  return (
    <div>
      <Anggota />
    </div>
  )
}

export default Index
