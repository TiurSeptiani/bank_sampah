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
    // Menjalankan API "listDataPengguna" agar kita dapat menampilkan dan mengambil data SELURUH PENGGUNA 
    dispatch(listDataPengguna())
  }, [dispatch])


  // Fungsi dibawah ini bekerja ketika tombol "Hapus" yang ada di dalam folder modules ditekan
  // Fungsi ini akan di jalankan di dalam fungsi "handleDeleteConfirm" yang ada di dalam MODULES
  const handleDeletePengguna = (id) => {
    setLoadingOnSubmit(true)

    // parameter "id" akan di kirim kedalam API, dibawah ini :
    dispatch(handleDeleteOnePengguna(id))
    .unwrap()
    .then((res) => {

      // Jika sukses, tampilkan pesan dibawah ini :
      message.success("Berhasil menghapus pengguna")

      // dan jalankan kembali API "listDataPengguna", tujuannya agar tampilan terupdate setelah terjadi penghapusan
      // Dengan kata lain, pengguna yang di hapus akan lansung hilang dari tampilan, tampa harus refresh browser
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
