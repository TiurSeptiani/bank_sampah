import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Layout, Menu, Button, theme, Col, Image, message, Switch } from "antd";
import {
    CalculatorOutlined,
    DiffOutlined,
    ExclamationCircleOutlined,
    FormOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SwapOutlined,
    TeamOutlined,
    UserAddOutlined,
    WalletOutlined,
  } from "@ant-design/icons";

function Index() {
	const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
		token: { colorBgContainer },
	} = theme.useToken();
	const navigate = useNavigate();

	return (
		<div>
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
								key: "/data-anggota",
								icon: <TeamOutlined />,
								label: "Anggota",
							},
							{
								key: "/data-sampah",
								icon: <CalculatorOutlined />,
								label: "Data Sampah",
							},
							{
								key: "/tabungan",
								icon: <WalletOutlined />,
								label: "Tabungan",
							},
							{
								key: "/transaksi",
								icon: <SwapOutlined />,
								label: "Transaksi",
							},
							{
								key: "/inventaris",
								icon: <FormOutlined />,
								label: "Inventaris",
							},
							{
								key: "/registrasi",
								icon: <UserAddOutlined />,
								label: "Registrasi",
							},
							{
								key: "/tambah-jenis-sampah",
								icon: <DiffOutlined />,
								label: "Tambah Jenis",
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

						<Button
							type='text'
							icon={<LogoutOutlined />}
							// onClick={handleOneLogoutUser}
							style={{
								fontSize: "16px",
								width: 64,
								height: 64,
							}}
						/>
					</Header>
					<Content
						className='content'
						style={{
							margin: "24px 16px",
							padding: 24,
							minHeight: 280,
							background: colorBgContainer,
							overflow: "scroll",
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}

export default Index;
