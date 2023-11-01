import React, { useState } from "react";
import {
	ExclamationCircleOutlined,
	FormOutlined,
	HomeOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SwapOutlined,
	TeamOutlined,
	UploadOutlined,
	UserAddOutlined,
	UserOutlined,
	VideoCameraOutlined,
	WalletOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Col, Image } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Beranda from "./pages/beranda/index";
import Inventaris from "./pages/inventaris/index";

import Logo from "./assets/logo.png";

const { Header, Sider, Content } = Layout;
const App = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const navigate = useNavigate();

	return (
		<Layout style={{ height: "100vh" }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Col>
					<Image src={Logo} preview={false} />
				</Col>
				<Menu
					onClick={({ key }) => {
						navigate(key);
					}}
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[location.pathname]}
					items={[
						{
							key: "/",
							icon: <HomeOutlined />,
							label: "Beranda",
						},
						{
							key: "/inventaris",
							icon: <FormOutlined />,
							label: "Inventaris",
						},
						{
							key: "/data-nasabah",
							icon: <TeamOutlined />,
							label: "Data Nasabah",
						},
						{
							key: "/transaksi",
							icon: <SwapOutlined />,
							label: "Transaksi",
						},
						{
							key: "/registrasi",
							icon: <UserAddOutlined />,
							label: "Registrasi",
						},
						{
							key: "/tabungan",
							icon: <WalletOutlined />,
							label: "Tabungan",
						},
						{
							key: "/informasi",
							icon: <ExclamationCircleOutlined />,
							label: "Informasi",
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Button
						type='text'
						icon={
							collapsed ? (
								<MenuUnfoldOutlined />
							) : (
								<MenuFoldOutlined />
							)
						}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
				className="content"
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						overflow: "scroll",
					}}
				>
					<Routes>
						<Route path='/' element={<Beranda />} />
						<Route path='/inventaris' element={<Inventaris />} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
};
export default App;
