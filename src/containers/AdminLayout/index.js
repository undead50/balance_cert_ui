import React, { useState } from "react";
import { Layout, Breadcrumb, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import LoginPage from "../../pages/Auth/Login";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store";
import { setUser,FlushUserData } from '../../store';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    // Handle logout logic here
    dispatch(setUser({
      userName: null,
      solId:null,
      email:null,
      departmentName:null,
      token:null
  }))
    dispatch(FlushUserData())

    
    alert('removed from localstorage')
    navigate('/login')
    
  };


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          backgroundColor:'white',
          top: 0,
          left: 0
        }}
      >
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + '/images/citizens-logo.png'}
            style={{
              height: "40px",
              width: "160px",
              marginTop: "-8px",
            }}
          />
        </div>
        <SideBar />
      </Sider>
      <Content>
        <Layout className="site-layout">
          <Header
            style={{
              background: "linear-gradient(to right, #468CC1, #3EAB94)",
              padding: 0,
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ marginTop: "0px", marginRight: "20px" }}
            >
              Logout
            </Button>
          </Header>
          <Content
            className="site-layout-background"
            style={{ margin: "12px", padding: "10px", height: "100%" }}
          >
            <div>
              <Outlet />
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center', height:'50px', display:'flex', justifyContent:'center', alignContent:'center' }}>
          <h3>Citizens Bank International ©2023</h3> 
        </Footer> */}
        </Layout>
      </Content>
    </Layout>
  );
};

export default AdminLayout;
