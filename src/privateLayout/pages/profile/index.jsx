import React, { useEffect } from 'react'
import Tabungan from '../../modules/profile'
import { Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { listDataPengguna } from '../../../store/reducers/registrasiUsers/registrasiUsersThunk'

function Index() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listDataPengguna());
  }, [dispatch])

  return (
    <Row>
      <Col span={24} style={{height: "80vh", display: "flex", justifyContent: "center"}}>
        <Tabungan />
      </Col>
    </Row>
  )
}

export default Index
