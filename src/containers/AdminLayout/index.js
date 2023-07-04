import React, { useState } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBard from '../../components/Sidebar';
import { useDispatch } from 'react-redux';
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
    navigate('/login')
    
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse} style={{background: 'white'}}>
        <div className="logo">

        <img src={process.env.PUBLIC_URL + '/images/citizens-logo.png'} alt="Company Logo"
        style={{
          height:'40px',
          width:'180px',
          
        }}
        />
        </div>
        <SideBard/>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: 'linear-gradient(to right, #468CC1, #3EAB94)',padding: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{ color: 'white', padding: '0 16px', fontSize: '18px' }}
            >
            </div>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ marginTop:'10px',marginRight:'20px'}}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <h3>Citizens Bank International ©2023</h3> 
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
