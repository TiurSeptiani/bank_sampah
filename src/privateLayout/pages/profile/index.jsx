import React, { useEffect } from 'react'
import Tabungan from '../../modules/profile'
import { Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { listDataPengguna } from '../../../store/reducers/registrasiUsers/registrasiUsersThunk'
import { handleGetListDataTransaksi } from '../../../store/reducers/dataTransaksi/dataTransaksiThunk'

function Index() {
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(listDataPengguna())
    dispatch(handleGetListDataTransaksi());
  }, [dispatch])

  return (
    <Row>
      <Col span={24} style={{height: "76vh", display: "flex", justifyContent: "center"}}>
        <Tabungan />
      </Col>
    </Row>
  )
}

export default Index
