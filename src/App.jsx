// App.jsx
import React, { useEffect, useState } from "react";
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
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Col, Image, message } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Beranda from "./privateLayout/pages/beranda/data.jsx";
import Inventaris from "./privateLayout/pages/inventaris/index.jsx";
import JenisSampah from "./privateLayout/pages/tambahJenisSampah/index.jsx";
import Registrasi from "./privateLayout/pages/registrasi/index.jsx";
import Anggota from "./privateLayout/pages/anggota/index.jsx";
import DataSampah from "./privateLayout/pages/dataSampah/index.jsx";
import Transaksi from "./privateLayout/pages/transaksi/index.jsx";
import Profile from "./privateLayout/pages/profile/index.jsx";

import Logo from "./assets/logo.png";
import Login from "./publicLayout/pages/loginPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../src/firebase.js";
import { getCurrentUser, logoutUser } from "./store/reducers/auth/authThunk.js";
import { onAuthStateChanged } from "firebase/auth";
import { listDataPengguna } from "./store/reducers/registrasiUsers/registrasiUsersThunk.js";

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
    console.log("isNasabah ?", isNasabah);

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
      <Sider trigger={null} collapsible collapsed={collapsed}>
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
            { key: "/data-anggota", icon: <TeamOutlined />, label: "Anggota" },
            {
              key: "/data-sampah",
              icon: <CalculatorOutlined />,
              label: "Data Sampah",
            },
            { key: "/transaksi", icon: <SwapOutlined />, label: "Transaksi" },
            { key: "/inventaris", icon: <FormOutlined />, label: "Inventaris" },
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
            <Route path="/data-anggota" element={<Anggota />} />
            <Route path="/registrasi" element={<Registrasi />} />
            <Route path="/inventaris" element={<Inventaris />} />
            <Route path="/tambah-jenis-sampah" element={<JenisSampah />} />
            <Route path="/data-sampah" element={<DataSampah />} />
            <Route path="/transaksi" element={<Transaksi />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Layout style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Layout>
  );
};

export default App;
