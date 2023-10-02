import React, { useState } from 'react';
import {
  Layout,
  Breadcrumb,
  Button,
  Menu,
  Avatar,
  Row,
  Popover,
  Typography,
  Image
} from 'antd';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import SideBar from '../../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store';
import { setUser, FlushUserData } from '../../store';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const base64Image = `data:image/png;base64,${userInfo.image}`;

  const content = (
    <div style={{ width: 'auto', paddingLeft: '2px', paddingRight: '2px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: '0px',
          }}
        >
          <Image src={base64Image} alt="Base64 Image" /> 
          <Text style={{ marginTop: '0px', fontSize: 18, fontWeight: '500' }}>
            {userInfo?.userName}
          </Text>
          <Text style={{ marginTop: '1px', fontSize: 13, color: '#606060' }}>
            {userInfo?.solDesc}
          </Text>
          {/* <Text   style={{marginTop:'-1px', fontSize:12, color:"#6D6D6D"}}>Employee Id: 1923</Text> */}
          <Text style={{ fontSize: 13, color: '#606060' }}>
            {userInfo?.email}
          </Text>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'right',
        }}
      >
        <Button
          onClick={() => handleLogout()}
          type="primary"
          style={{ marginTop: '12px', width: 'auto' }}
        >
          Log out
        </Button>
      </div>
    </div>
  );

  const handleLogout = () => {
    // Handle logout logic here
    dispatch(
      setUser({
        userName: null,
        solId: null,
        email: null,
        departmentName: null,
        token: null,
      })
    );
    dispatch(FlushUserData());

    // alert('removed from localstorage')
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
        style={{
          overflow: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#f1f1f1',
          height: '100vh',
          position: 'sticky',
          backgroundColor: 'white',
          top: 0,
          left: 0,
        }}
      >
        <div
          className="logo"
          style={{
            display: 'flex',
            width: '100%',
            marginLeft: '0px',
            marginRight: '0px',
            justifyContent: 'center',
          }}
        >
          { collapsed ? (
            <img
              src={process.env.PUBLIC_URL + '/images/colo.png'}
              style={{
                marginTop: '0px',
                width: '50px'
              }}
            />): <img
            src={process.env.PUBLIC_URL + '/images/citizens-logo.png'}
            style={{
              height: '45px',
              width: '90%',
            }}
          /> }
          {/*  */}
        </div>
        <SideBar />
      </Sider>
      <Content>
        <Layout className="site-layout">
          <Header
            style={{
              background: 'linear-gradient(to right, #468CC1, #3EAB94)',
              padding: 0,
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                marginLeft: '0px',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Button
                type="text"
                icon={
                  collapsed ? (
                    <MenuUnfoldOutlined style={{ fontSize: '20px' }} />
                  ) : (
                    <MenuFoldOutlined style={{ fontSize: '20px' }} />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  width: 56,
                  height: 56,
                  color: 'white',
                  marginTop: '5px',
                  alignSelf: 'center',
                }}
              />

              <h1
                style={{ color: '#fff', fontSize: '19px', fontWeight: '600' }}
              >
                 Balance Certificate Issuance
              </h1>
            </div>
            <div
              style={{ flex: '50%', textAlign: 'right', marginRight: '18px' }}
            >
              <Popover
                overlayStyle={{ position: 'fixed' }}
                content={content}
                title=""
                trigger="click"
                placement="topRight"
              >
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                  style={{ cursor: 'pointer', marginTop: -3 }}
                />
              </Popover>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '12px',
              padding: '10px',
              height: '100%',
              boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            <div>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default AdminLayout;
