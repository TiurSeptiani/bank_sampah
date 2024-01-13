import React, { useEffect, useState } from "react";
import {
  CalculatorOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Col, Image, message, Empty } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Beranda from "./privateLayout/pages/beranda/data.jsx";
import Inventaris from "./privateLayout/pages/inventaris/index.jsx";
import JenisSampah from "./privateLayout/pages/tambahJenisSampah/index.jsx";
import Registrasi from "./privateLayout/pages/registrasi/index.jsx";
import Anggota from "./privateLayout/pages/anggota/index.jsx";
import DataSampah from "./privateLayout/pages/dataSampah/index.jsx";
import Transaksi from "./privateLayout/pages/transaksi/index.jsx";
import Profile from "./privateLayout/pages/profile/index.jsx";
import GantiPassword from "./privateLayout/pages/gantiPassword/index.jsx";
import Informasi from "./privateLayout/pages/informasi/index.jsx";

import Logo from "./assets/logo.png";
import Login from "./publicLayout/pages/loginPage.jsx";
import LupaPassword from "./publicLayout/pages/lupaPasswordPages.jsx";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../src/firebase.js";
import { getCurrentUser, logoutUser } from "./store/reducers/auth/authThunk.js";
import { onAuthStateChanged } from "firebase/auth";
import { listDataPengguna } from "./store/reducers/registrasiUsers/registrasiUsersThunk.js";
import Message from "./EmptyMessage.jsx";

const { Header, Sider, Content } = Layout;

const App = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const { data } = useSelector((state) => state.dataNasabah);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const isNasabah =
    currentUser &&
    data &&
    Object.values(data).some(
      (user) => user.status === "Nasabah" && user.uid === currentUser.uid
    );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(getCurrentUser(user));
      dispatch(listDataPengguna());
    });
  }, [dispatch]);

  const logout = () => {
    dispatch(logoutUser())
      .then((res) => {
        if (res) {
          navigate("/");
          message.success("Berhasil Logout");
        } else {
          message.error("Gagal Logout");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return isAuth ? (
    <Layout style={{ height: "100vh" }}>
      <Sider className="sidebar-app" trigger={null} collapsible collapsed={collapsed} style={{ overflow: "scroll" }}>
        <Col>
          <Image src={Logo} preview={false} />
        </Col>
        <Menu

          onClick={({ key }) => {
            navigate(key);
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            { key: "/", icon: <HomeOutlined />, label: "Beranda" },
            { key: "/profile", icon: <UserOutlined />, label: "Profile" },
            { key: "/data-anggota", icon: <TeamOutlined />, label: "Anggota", hidden: isNasabah },
            { key: "/data-sampah", icon: <CalculatorOutlined />, label: "Data Sampah", hidden: isNasabah },
            { key: "/transaksi", icon: <SwapOutlined />, label: "Transaksi", hidden: isNasabah},
            { key: "/inventaris", icon: <FormOutlined />, label: "Inventaris", hidden: isNasabah },
            { key: "/registrasi", icon: <UserAddOutlined />, label: "Registrasi", hidden: isNasabah},
            { key: "/informasi", icon: <ExclamationCircleOutlined />, label: "Informasi" },
          ].filter(item => !item.hidden)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={logout}
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
            <Route path="/" element={<Beranda />} />
            <Route
              path="/data-anggota"
              element={isNasabah ? <Message /> : <Anggota />}
            />
            <Route path="/registrasi" element={isNasabah ? <Message /> : <Registrasi />} />
            <Route path="/inventaris" element={isNasabah ? <Message /> : <Inventaris />} />
            <Route path="/tambah-jenis-sampah" element={<JenisSampah />} />
            <Route path="/data-sampah" element={isNasabah ? <Message /> : <DataSampah />} />
            <Route path="/transaksi" element={isNasabah ? <Message /> :<Transaksi />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ganti-password" element={<GantiPassword />} />
            <Route path="/informasi" element={<Informasi />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Layout style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<LupaPassword />} />
      </Routes>
    </Layout>
  );
};

export default App;
