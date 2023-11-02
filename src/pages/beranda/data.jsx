import React, { useEffect } from "react";
import Beranda from "../../modules/beranda";
import { Col } from "antd";
import "../../styles/beranda/beranda.css"
import { useDispatch } from "react-redux";
import { datatableHargaSampah } from "../../store/reducers/hargaSampah/hargaSampahThunk";

function Index() {
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(datatableHargaSampah())
	}, [dispatch])
	
	const actions = [
		{
			title: "Habis",
			onClick: (id, record) => {
				console.log();
			},
		},
	];
	

	return (
		<Col>
			<Beranda {...{actions}} />
		</Col>
	);
}

export default Index;
