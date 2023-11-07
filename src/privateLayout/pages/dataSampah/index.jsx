import React, { useEffect } from 'react'
import DataSampah from '../../modules/dataSampah/dataSampah'
import { useDispatch } from 'react-redux';
import { listDataInventaris } from '../../../store/reducers/dataInventaris/dataInventarisThunk';

function Index() {
  const dispatch = useDispatch()

  useEffect(() => {
		dispatch(listDataInventaris());
	}, [dispatch]);

  return (
    <div>
      <DataSampah />
    </div>
  )
}

export default Index
